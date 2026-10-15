import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
  RotateCcw,
  Sparkles,
  Save,
  ArrowRight,
  Database,
  Terminal,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { runOcrEngine } from '../services/ocrService';
import { classifyDocument } from '../services/classifierService';
import { extractMetadata } from '../services/metadataService';
import { generateDocumentSummary } from '../services/summaryService';
import { useDocumentStore } from '../store/documentStore';
import { TRANSIT_DEPOTS, TRANSIT_ENGINEERS, DOCUMENT_CATEGORIES, INCIDENT_TYPES } from '../data/documents';
import { formatCurrency, getCategoryBadgeColor } from '../utils/formatters';

const PIPELINE_STAGES = [
  { id: 1, name: "S3 Upload", description: "Secure cloud ingestion" },
  { id: 2, name: "AWS Textract", description: "OCR layout & text extraction" },
  { id: 3, name: "RoBERTa AI", description: "Taxonomy classification" },
  { id: 4, name: "Metadata NER", description: "Entity & cost extraction" },
  { id: 5, name: "Neptune Graph", description: "Knowledge graph linking" },
  { id: 6, name: "OpenSearch", description: "Dense vector indexing" },
  { id: 7, name: "Bedrock LLM", description: "AI synthesis generation" },
  { id: 8, name: "Completed", description: "Ready for operations" },
];

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg'
];
const ALLOWED_EXTS = ['.pdf', '.docx', '.png', '.jpg', '.jpeg'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function UploadPage() {
  const navigate = useNavigate();
  const { addDocument } = useDocumentStore();

  const [filesQueue, setFilesQueue] = useState([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // 0 = idle, 1..8
  const [liveLogs, setLiveLogs] = useState([]);
  const [pipelineResults, setPipelineResults] = useState(null);
  const [activeResultTab, setActiveResultTab] = useState('ocr'); // 'ocr', 'metadata', 'classification'

  // Editable state for result
  const [editedOcrText, setEditedOcrText] = useState('');
  const [originalOcrText, setOriginalOcrText] = useState('');
  const [editedMetadata, setEditedMetadata] = useState(null);

  const fileInputRef = useRef(null);
  const logContainerRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [liveLogs]);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLiveLogs((prev) => [...prev, { timestamp, message, type }]);
  };

  const handleFiles = (incomingFiles) => {
    const valid = [];
    for (const file of incomingFiles) {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!ALLOWED_EXTS.includes(ext)) {
        toast.error(`"${file.name}" rejected. Only PDF, DOCX, PNG, JPG allowed.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 10 MB maximum limit.`);
        continue;
      }
      valid.push({
        id: `FILE-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        status: "queued"
      });
    }

    if (valid.length > 0) {
      setFilesQueue((prev) => [...prev, ...valid]);
      toast.success(`Added ${valid.length} file(s) to processing queue.`);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const removeFileFromQueue = (index) => {
    if (isProcessing && index === activeFileIndex) {
      toast.error("Cannot remove file while pipeline is running.");
      return;
    }
    setFilesQueue((prev) => prev.filter((_, i) => i !== index));
    if (activeFileIndex >= index && activeFileIndex > 0) {
      setActiveFileIndex((prev) => prev - 1);
    }
  };

  // Run the 8-stage pipeline
  const startPipeline = async () => {
    if (filesQueue.length === 0) {
      toast.error("Please add at least one document to the queue.");
      return;
    }

    setIsProcessing(true);
    setLiveLogs([]);
    setCurrentStage(1);
    setPipelineResults(null);

    const targetFile = filesQueue[activeFileIndex];
    addLog(`Initiating cloud ingest for payload: ${targetFile.name}`);

    try {
      // Stage 1: S3 Upload
      setCurrentStage(1);
      addLog(`[Stage 1/8] Encrypting & transmitting payload to Amazon S3 bucket "tnstc-transit-raw-docs"...`);
      await new Promise((r) => setTimeout(r, 1100 + Math.random() * 600));
      addLog(`Payload SHA-256 verified. S3 ETag: "3a9f81bc92e44" generated.`, "success");

      // Extract metadata preliminary for OCR template
      const prelimMeta = await extractMetadata(targetFile.name);

      // Stage 2: OCR
      setCurrentStage(2);
      addLog(`[Stage 2/8] Invoking AWS Textract Layout & Forms Engine v3.2...`);
      const ocrRes = await runOcrEngine(targetFile.file, prelimMeta, "Maintenance Report");
      addLog(`Textract extracted ${ocrRes.rawText.length} characters across ${ocrRes.pageCount} page(s). Mean OCR confidence: ${ocrRes.confidence}%.`, "success");

      // Stage 3: RoBERTa Classification
      setCurrentStage(3);
      addLog(`[Stage 3/8] Running SageMaker RoBERTa-Large fine-tuned classification model...`);
      const classifyRes = await classifyDocument(targetFile.name, ocrRes.rawText);
      addLog(`Taxonomy predicted as "${classifyRes.category}" with ${classifyRes.confidence}% confidence (F1: ${classifyRes.f1Score}).`, "success");

      // Stage 4: Metadata NER
      setCurrentStage(4);
      addLog(`[Stage 4/8] Running Named Entity Recognition (NER) for Transit Properties...`);
      const metaRes = await extractMetadata(targetFile.name, classifyRes.category);
      addLog(`Extracted Vehicle Plate: ${metaRes.vehicleNumber}, Depot: ${metaRes.depot}, Cost: ₹${metaRes.cost.toLocaleString('en-IN')}`, "success");

      // Stage 5: Neptune Graph
      setCurrentStage(5);
      addLog(`[Stage 5/8] Formulating RDF Triples and ingesting into Amazon Neptune Property Graph...`);
      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500));
      addLog(`Created 5 new graph vertices and 4 relational edges (INSPECTED_BY, BELONGS_TO_DEPOT).`, "success");

      // Stage 6: OpenSearch Indexing
      setCurrentStage(6);
      addLog(`[Stage 6/8] Generating 768-dimensional dense vector embeddings with HuggingFace Sentence-Transformers...`);
      await new Promise((r) => setTimeout(r, 1100 + Math.random() * 500));
      addLog(`Vector stored in OpenSearch k-NN index "transit-dockets-2026" with HNSW cosine metric.`, "success");

      // Stage 7: Bedrock Summary
      setCurrentStage(7);
      addLog(`[Stage 7/8] Triggering Amazon Bedrock (Anthropic Claude 3 Sonnet) for executive risk analysis...`);
      const summaryRes = await generateDocumentSummary({
        id: `DOC-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: targetFile.name,
        category: classifyRes.category,
        vehicleNumber: metaRes.vehicleNumber,
        engineer: metaRes.engineer,
        depot: metaRes.depot,
        cost: metaRes.cost,
        incidentType: metaRes.incidentType,
        confidence: ocrRes.confidence
      });
      addLog(`AI Summary synthesized. Risk classified as "${summaryRes.riskLevel}" (Severity Index: ${summaryRes.riskScore}/100).`, "success");

      // Stage 8: Completed
      setCurrentStage(8);
      addLog(`[Stage 8/8] Pipeline execution completed successfully. Pipeline duration: 8.8s.`, "success");

      const finalDocument = {
        id: `DOC-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: targetFile.name,
        category: classifyRes.category,
        vehicleNumber: metaRes.vehicleNumber,
        engineer: metaRes.engineer,
        depot: metaRes.depot,
        uploadDate: new Date().toISOString().split('T')[0],
        status: "Completed",
        cost: metaRes.cost,
        incidentType: metaRes.incidentType,
        confidence: ocrRes.confidence,
        riskLevel: summaryRes.riskLevel,
        fileSize: targetFile.size,
        ocrText: ocrRes.rawText,
        classification: classifyRes,
        summary: summaryRes
      };

      setPipelineResults(finalDocument);
      setEditedOcrText(finalDocument.ocrText);
      setOriginalOcrText(finalDocument.ocrText);
      setEditedMetadata({
        vehicleNumber: finalDocument.vehicleNumber,
        engineer: finalDocument.engineer,
        depot: finalDocument.depot,
        inspectionDate: finalDocument.uploadDate,
        cost: finalDocument.cost,
        incidentType: finalDocument.incidentType,
        category: finalDocument.category
      });

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast.success("AI pipeline execution completed!");
    } catch (err) {
      console.error(err);
      addLog(`Pipeline halted with error: ${err.message}`, "error");
      toast.error("Pipeline encountered an unexpected error.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveOcrChanges = () => {
    if (pipelineResults) {
      setPipelineResults({
        ...pipelineResults,
        ocrText: editedOcrText
      });
      toast.success("OCR text modifications saved!");
    }
  };

  const handleResetOcrText = () => {
    setEditedOcrText(originalOcrText);
    toast("Restored initial extracted OCR text.");
  };

  const handleSaveMetadataChanges = (e) => {
    e.preventDefault();
    if (pipelineResults) {
      setPipelineResults({
        ...pipelineResults,
        ...editedMetadata,
        cost: Number(editedMetadata.cost)
      });
      toast.success("Document metadata updated!");
    }
  };

  const handleAddToRepository = () => {
    if (!pipelineResults) return;

    const docToAdd = {
      ...pipelineResults,
      ocrText: editedOcrText,
      ...editedMetadata,
      cost: Number(editedMetadata.cost)
    };

    addDocument(docToAdd);
    toast.success(`"${docToAdd.name}" added to centralized Document Repository!`);
    navigate('/repository');
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
              Autonomous Ingestion Stream
            </span>
            <span className="text-xs text-slate-500 font-mono">AWS Pipeline Simulation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Ingest Transit Operational Documents
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Accepts PDF, DOCX, PNG, and JPG. Automatically executes 8 stages of cloud AI inference.
          </p>
        </div>

        {filesQueue.length > 0 && (
          <button
            onClick={startPipeline}
            disabled={isProcessing}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-700/20 flex items-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Stage {currentStage} / 8...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run Ingestion Pipeline</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Grid: Left Upload Dropzone & Queue, Right Pipeline Stepper & Live Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Dropzone & File Queue */}
        <div className="space-y-4">
          {/* Dropzone */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/40 hover:bg-blue-50/70 rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFiles(Array.from(e.target.files || []))}
              multiple
              accept=".pdf,.docx,.png,.jpg,.jpeg"
              className="hidden"
            />
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100/80 group-hover:bg-blue-200/80 flex items-center justify-center text-blue-700 transition-colors">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-4">
              Click to browse or drag and drop files here
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports PDF, DOCX, PNG, JPG (Max 10 MB per file)
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Maintenance Reports', 'Accident Inquiries', 'RTO Permits', 'Invoices'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[10px] font-medium bg-white text-slate-600 rounded-md border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Upload Queue */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Ingestion Queue ({filesQueue.length})
              </h4>
              {filesQueue.length > 0 && !isProcessing && (
                <button
                  onClick={() => setFilesQueue([])}
                  className="text-xs text-slate-400 hover:text-rose-600"
                >
                  Clear all
                </button>
              )}
            </div>

            {filesQueue.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No files queued. Drag files above or click to select.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto">
                {filesQueue.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`py-2.5 px-2 flex items-center justify-between gap-3 rounded-lg transition-colors ${
                      idx === activeFileIndex ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-blue-100/60 text-blue-700 rounded-lg shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {idx === activeFileIndex && isProcessing ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full animate-pulse">
                          Processing
                        </span>
                      ) : (
                        <button
                          onClick={() => removeFileFromQueue(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Remove file"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 8-Stage Pipeline Stepper & Live Cloud Logs */}
        <div className="space-y-4">
          {/* 8-Stage Stepper */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                8-Stage AI Pipeline Execution
              </h4>
              <span className="text-xs font-mono font-bold text-blue-700">
                {currentStage === 0 ? "IDLE" : currentStage === 8 ? "100% COMPLETE" : `${Math.round((currentStage / 8) * 100)}%`}
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStage / 8) * 100}%` }}
              />
            </div>

            {/* Stepper items grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PIPELINE_STAGES.map((stage) => {
                const isCompleted = currentStage > stage.id || currentStage === 8;
                const isCurrent = currentStage === stage.id && isProcessing;
                return (
                  <div
                    key={stage.id}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isCompleted
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                        : isCurrent
                        ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-500/20'
                        : 'bg-slate-50/60 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold">0{stage.id}</span>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : isCurrent ? (
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>
                    <p className="text-xs font-bold mt-1 truncate">{stage.name}</p>
                    <p className="text-[9px] text-slate-500 truncate mt-0.5">{stage.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Cloud Worker Console Log */}
          <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl border border-slate-800 shadow-soft font-mono text-xs flex flex-col h-60">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Live Cloud Worker Log Stream
              </span>
              <span className="text-[10px] uppercase text-emerald-400 font-semibold">
                {isProcessing ? "EXEC RUNNING" : "STANDBY"}
              </span>
            </div>

            <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-1.5 pt-2 text-[11px]">
              {liveLogs.length === 0 ? (
                <div className="text-slate-500 italic pt-6 text-center">
                  Press "Run Ingestion Pipeline" to stream live AWS worker logs...
                </div>
              ) : (
                liveLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500 select-none text-[10px]">{log.timestamp}</span>
                    <span
                      className={
                        log.type === "success"
                          ? "text-emerald-400 font-semibold"
                          : log.type === "error"
                          ? "text-rose-400 font-semibold"
                          : "text-slate-300"
                      }
                    >
                      {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post-Completion Result Tabbed Panel */}
      {pipelineResults && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Top result banner */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase">
                  AI Pipeline Completed
                </span>
                <span className="text-xs text-blue-200 font-mono">Ref ID: {pipelineResults.id}</span>
              </div>
              <h3 className="text-lg font-bold mt-1 text-white truncate max-w-xl">
                {pipelineResults.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/summary')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                View AI Summary
              </button>
              <button
                onClick={handleAddToRepository}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                Add to Repository
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 px-6 bg-slate-50/50">
            {[
              { id: 'ocr', label: 'Extracted OCR Text' },
              { id: 'metadata', label: 'Document Metadata' },
              { id: 'classification', label: 'AI Classification Breakdown' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveResultTab(tab.id)}
                className={`py-3.5 px-4 font-bold text-xs border-b-2 transition-colors cursor-pointer ${
                  activeResultTab === tab.id
                    ? 'border-blue-600 text-blue-700 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: OCR Text */}
          {activeResultTab === 'ocr' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-700">AWS Textract Confidence:</span>
                  <span className="px-2 py-0.5 font-bold rounded bg-emerald-100 text-emerald-800">
                    {pipelineResults.confidence}%
                  </span>
                  <span className="text-slate-400 text-[11px]">(Layout analysis verified)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetOcrText}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                  <button
                    onClick={handleSaveOcrChanges}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save changes
                  </button>
                </div>
              </div>

              <textarea
                value={editedOcrText}
                onChange={(e) => setEditedOcrText(e.target.value)}
                rows={12}
                className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
              />
            </div>
          )}

          {/* Tab 2: Metadata */}
          {activeResultTab === 'metadata' && (
            <form onSubmit={handleSaveMetadataChanges} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vehicle Registration Number</label>
                  <input
                    type="text"
                    value={editedMetadata.vehicleNumber}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, vehicleNumber: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supervising Lead Engineer</label>
                  <select
                    value={editedMetadata.engineer}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, engineer: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {TRANSIT_ENGINEERS.map((eng) => (
                      <option key={eng} value={eng}>{eng}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Depot Jurisdiction</label>
                  <select
                    value={editedMetadata.depot}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, depot: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {TRANSIT_DEPOTS.map((depot) => (
                      <option key={depot} value={depot}>{depot}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inspection / Document Date</label>
                  <input
                    type="date"
                    value={editedMetadata.inspectionDate}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, inspectionDate: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Overhaul / Service Cost (₹)</label>
                  <input
                    type="number"
                    value={editedMetadata.cost}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, cost: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Incident Type</label>
                  <select
                    value={editedMetadata.incidentType}
                    onChange={(e) => setEditedMetadata({ ...editedMetadata, incidentType: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {INCIDENT_TYPES.map((inc) => (
                      <option key={inc} value={inc}>{inc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Metadata Changes
                </button>
              </div>
            </form>
          )}

          {/* Tab 3: Classification */}
          {activeResultTab === 'classification' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Confidence Gauge */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-600"
                        strokeDasharray={`${pipelineResults.classification?.confidence || 95}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-slate-900">
                        {pipelineResults.classification?.confidence || 95}%
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Confidence</span>
                    </div>
                  </div>
                  <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeColor(pipelineResults.category)}`}>
                    {pipelineResults.category}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 font-mono">
                    Model: RoBERTa-Large-Transit
                  </span>
                </div>

                {/* Top-3 Predictions Horizontal List */}
                <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Top-3 Predicted Class Probabilities
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Softmax distribution across transit operations ontology
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {pipelineResults.classification?.top3Predictions?.map((pred, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-800">{pred.category}</span>
                          <span className="text-slate-900 font-bold font-mono">{pred.confidence}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              i === 0 ? 'bg-blue-600' : i === 1 ? 'bg-blue-400' : 'bg-slate-400'
                            }`}
                            style={{ width: `${pred.confidence}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                    <span>Validation Macro F1-Score:</span>
                    <span className="font-bold text-emerald-700 font-mono">0.948</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
