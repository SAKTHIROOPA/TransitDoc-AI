import React, { useState, useEffect } from 'react';
import { X, Key, Copy, Check, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

export default function DecodedJwtModal({ isOpen, onClose }) {
  const { getDecodedToken, token } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const decoded = getDecodedToken();

  useEffect(() => {
    if (!isOpen || !decoded?.payload?.exp) return;

    function updateTimer() {
      const remainingSec = Math.max(0, Math.floor(decoded.payload.exp - Date.now() / 1000));
      const mins = Math.floor(remainingSec / 60);
      const secs = remainingSec % 60;
      setTimeLeft(`${mins}m ${secs < 10 ? '0' : ''}${secs}s`);
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isOpen, decoded]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      toast.success("JWT Token copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <Key className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">Active Session JWT Inspector</h3>
              <p className="text-xs text-blue-200">Simulated JSON Web Token Authentication</p>
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
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs font-mono">
          {/* Validity status banner */}
          <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-800 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-xs">Signature Cryptographically Verified (HS256)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-mono font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Expires in: {timeLeft || "Active"}</span>
            </div>
          </div>

          {/* Decoded Header */}
          <div>
            <div className="flex items-center justify-between mb-1 font-sans">
              <span className="font-bold text-slate-700 text-xs">1. HEADER: Algorithm & Token Type</span>
              <span className="text-[10px] text-rose-600 font-semibold uppercase">Base64Url</span>
            </div>
            <pre className="p-3 bg-slate-900 text-rose-300 rounded-lg overflow-x-auto text-[11px] leading-relaxed border border-slate-800">
              {JSON.stringify(decoded?.header || {}, null, 2)}
            </pre>
          </div>

          {/* Decoded Payload */}
          <div>
            <div className="flex items-center justify-between mb-1 font-sans">
              <span className="font-bold text-slate-700 text-xs">2. PAYLOAD: Claims & User Identity</span>
              <span className="text-[10px] text-purple-600 font-semibold uppercase">Base64Url</span>
            </div>
            <pre className="p-3 bg-slate-900 text-purple-300 rounded-lg overflow-x-auto text-[11px] leading-relaxed border border-slate-800">
              {JSON.stringify(decoded?.payload || {}, null, 2)}
            </pre>
          </div>

          {/* Raw Encoded Token */}
          <div>
            <div className="flex items-center justify-between mb-1 font-sans">
              <span className="font-bold text-slate-700 text-xs">3. RAW COMPACT JWT STRING</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Token"}
              </button>
            </div>
            <div className="p-3 bg-slate-100 text-slate-700 rounded-lg break-all border border-slate-200 text-[10px] select-all leading-relaxed font-mono">
              <span className="text-rose-600 font-semibold">{token?.split('.')[0]}</span>
              <span className="text-slate-400">.</span>
              <span className="text-purple-600 font-semibold">{token?.split('.')[1]}</span>
              <span className="text-slate-400">.</span>
              <span className="text-blue-600 font-semibold">{token?.split('.')[2]}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-sans">
          <span>Protected by RFC 7519 JSON Web Token standard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
