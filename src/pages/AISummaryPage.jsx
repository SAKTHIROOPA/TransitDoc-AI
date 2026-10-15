import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Copy,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  FileText,
  Download,
  CheckSquare,
  Square
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useDocumentStore } from '../store/documentStore';
import { generateDocumentSummary } from '../services/summaryService';
import { exportSummaryAsText } from '../utils/exportUtils';
import { getRiskBadgeColor, formatCurrency } from '../utils/formatters';

export default function AISummaryPage() {
  const { documents } = useDocumentStore();

  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  // Typewriter streaming effect
  const [streamedText, setStreamedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Recommendations checklist state
  const [recommendations, setRecommendations] = useState([]);

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleGenerateSummary = async () => {
    if (!selectedDoc) return;

    setIsGenerating(true);
    setSummaryData(null);
    setStreamedText('');

    try {
      const summary = await generateDocumentSummary(selectedDoc);
      setSummaryData(summary);
      setRecommendations(summary.recommendations || []);

      // Start typewriter streaming for concise summary
      setIsStreaming(true);
      const fullText = summary.conciseSummary;
      let currentIdx = 0;

      const timer = setInterval(() => {
        if (currentIdx < fullText.length) {
          setStreamedText(fullText.slice(0, currentIdx + 4));
          currentIdx += 4;
        } else {
          setStreamedText(fullText);
          setIsStreaming(false);
          clearInterval(timer);
        }
      }, 25);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate AI summary.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySummary = () => {
    if (!summaryData) return;
    const textToCopy = `TRANSITDOC AI SUMMARY - ${summaryData.docName}
Risk Level: ${summaryData.riskLevel} (${summaryData.riskScore}/100)
${summaryData.conciseSummary}

Key Findings:
${summaryData.keyFindings.join('\n')}

Recommendations:
${recommendations.map((r) => `- [${r.completed ? 'X' : ' '}] ${r.text}`).join('\n')}`;

    navigator.clipboard.writeText(textToCopy);
    toast.success("Executive summary copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleRecommendation = (index) => {
    setRecommendations((prev) =>
      prev.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (hidden on print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-blue-600" />
              Generative AI Operational Synthesis
            </span>
            <span className="text-xs text-slate-500 font-mono">Amazon Bedrock (Claude 3 Sonnet)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            AI Operations & Risk Summary Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Produces synthesized risk evaluations, critical component checklists, and regulatory recommendations.
          </p>
        </div>

        {/* Document Selector & Run Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <select
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 max-w-xs truncate cursor-pointer"
          >
            {documents.map((d) => (
              <option key={d.id} value={d.id}>
                {d.vehicleNumber} — {d.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerateSummary}
            disabled={isGenerating || isStreaming}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Generate Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Summary Output Panel */}
      {summaryData ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
          {/* Header & Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-700 uppercase font-mono">
                  {summaryData.docId}
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-xs font-semibold text-slate-600 font-mono">
                  Vehicle {summaryData.vehicleNumber}
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-xs text-slate-500">{summaryData.depot} Depot</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                {summaryData.docName}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated by {summaryData.modelUsed} &bull; Generated {summaryData.generatedAt}
              </p>
            </div>

            {/* Quick Actions (hidden in print) */}
            <div className="no-print flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopySummary}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy Summary"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
              <button
                onClick={() => exportSummaryAsText(summaryData)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Export as Text"
              >
                <Download className="w-3.5 h-3.5" />
                Export Text
              </button>
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Print Preview / Export PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                Print (PDF)
              </button>
            </div>
          </div>

          {/* Risk Level Gauge Section */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Circular Gauge */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      summaryData.riskLevel === 'Critical'
                        ? 'text-red-700'
                        : summaryData.riskLevel === 'High'
                        ? 'text-rose-600'
                        : summaryData.riskLevel === 'Medium'
                        ? 'text-amber-500'
                        : 'text-emerald-500'
                    }
                    strokeDasharray={`${summaryData.riskScore}, 100`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-black text-slate-900">{summaryData.riskScore}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">/ 100</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${getRiskBadgeColor(summaryData.riskLevel)}`}>
                    {summaryData.riskLevel.toUpperCase()} RISK LEVEL
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Operational Hazard Index</span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-xl">
                  {summaryData.justification}
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shrink-0 space-y-1 font-mono">
              <div className="text-slate-500">Evaluation Pipeline:</div>
              <div className="font-bold text-slate-900">Bedrock Anthropic v3</div>
            </div>
          </div>

          {/* Section 1: Concise Executive Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              1. Executive Operational Summary
            </h4>
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-slate-800 text-xs sm:text-sm leading-relaxed">
              {streamedText}
              {isStreaming && <span className="inline-block w-2 h-4 bg-blue-600 ml-1 animate-pulse" />}
            </div>
          </div>

          {/* Section 2: Key Findings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Key Audit & Mechanical Findings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {summaryData.keyFindings?.map((finding, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Detected Issues & Severity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              3. Detected Subsystem Vulnerabilities
            </h4>
            <div className="space-y-2">
              {summaryData.detectedIssues?.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="font-semibold text-slate-800">{issue.issue}</span>
                  <span className={`px-2.5 py-0.5 font-bold rounded-full border text-[10px] ${getRiskBadgeColor(issue.severity)}`}>
                    {issue.severity} Severity
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Operational Recommendations Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              4. Recommended Operational Actions Checklist
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleRecommendation(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center gap-3 text-xs ${
                    rec.completed
                      ? 'bg-emerald-50/40 border-emerald-200 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {rec.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className={rec.completed ? 'line-through text-slate-500' : 'font-medium'}>
                    {rec.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-16 rounded-2xl border border-slate-200 shadow-soft text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Bot className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Ready for Generative AI Synthesis</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Select a document from the dropdown above and click "Generate Summary" to produce an automated LLM technical analysis with risk scoring.
          </p>
        </div>
      )}
    </div>
  );
}
