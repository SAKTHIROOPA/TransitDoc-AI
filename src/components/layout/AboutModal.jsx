import React from 'react';
import { X, Layers, Cloud, ShieldCheck, Database, Cpu, Network, FileCheck } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <Layers className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">About TransitDoc AI</h2>
              <p className="text-xs text-blue-200 mt-0.5">Academic Mini-Project Prototype</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm text-slate-700">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Academic Project Title
            </span>
            <h3 className="text-base font-semibold text-slate-900 mt-2">
              "Cloud-Native AI Document Classification System with Knowledge Graph-Based Semantic Retrieval for Transit Operations Management"
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Designed as a high-fidelity prototype demonstrating enterprise document digitization, automated pipeline orchestration, OCR entity extraction, and multi-relational knowledge graph queries for state transport undertakings (TNSTC / MTC).
            </p>
          </div>

          {/* Simulated Architecture Highlights */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-blue-600" />
              Simulated Cloud Architecture Stack
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">AWS Textract:</span>
                  <p className="text-slate-500">Document layout analysis & raw OCR text extraction.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <Cpu className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">SageMaker RoBERTa:</span>
                  <p className="text-slate-500">Fine-tuned taxonomy classification (6 transit categories).</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <Network className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Amazon Neptune:</span>
                  <p className="text-slate-500">Property Graph triples linking vehicles, engineers & depots.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                <Database className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Amazon OpenSearch:</span>
                  <p className="text-slate-500">Dense vector similarity (k-NN) for semantic NLP retrieval.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Front-End Implementation Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["React 18", "Vite", "Tailwind CSS", "Zustand (Persisted)", "Recharts", "D3 Force Graph", "Framer Motion", "Lucide React", "React Router v6", "React Hot Toast"].map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Team Placeholders */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Project Team & Evaluator Details
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-800">Lead Candidate:</p>
                <p className="text-slate-600">Department of Computer Science & Engineering</p>
                <p className="text-slate-400 mt-0.5">Academic Session 2026</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-800">Project Guide / Evaluator:</p>
                <p className="text-slate-600">Faculty Review Board</p>
                <p className="text-slate-400 mt-0.5">Mini-Project Capstone Evaluation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-sm"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
