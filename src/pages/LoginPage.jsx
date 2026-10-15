import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bus,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { login, loginLoading, loginError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleAutofill = () => {
    setEmail('admin@transitdoc.ai');
    setPassword('admin123');
    toast.success('Demo credentials loaded!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast.success('Authenticated successfully! Welcome, Administrator.');
      navigate(from, { replace: true });
    } else {
      toast.error('Authentication failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F1F5F9]">
      {/* Left Branding Panel */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & Title */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-900/50 border border-blue-300/30">
              <Bus className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">
                TransitDoc <span className="text-blue-400">AI</span>
              </span>
              <p className="text-xs text-blue-200 font-medium">State Transport Operations Cloud</p>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Academic Mini-Project Prototype
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white tracking-tight">
              Cloud-Native AI Document Classification & Semantic Knowledge Graph
            </h2>

            <p className="text-sm text-blue-200/90 leading-relaxed max-w-lg">
              Empowering state transit engineering divisions with automated document ingestion, multi-page OCR extraction, RoBERTa fine-tuned categorization, and interactive entity graph exploration.
            </p>
          </div>
        </div>

        {/* Middle: Feature Highlights */}
        <div className="relative z-10 my-8 space-y-3">
          {[
            { title: "Simulated AWS Pipeline", desc: "Textract OCR, SageMaker RoBERTa, Amazon Neptune & OpenSearch", icon: Cloud },
            { title: "Deterministic Vector Search", desc: "Intent extraction and k-NN cosine ranking across transit archives", icon: Database },
            { title: "Knowledge Graph Traversal", desc: "Graph topology connecting 40+ vehicles, engineers, and incident dockets", icon: Cpu },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="p-2 bg-blue-500/20 rounded-lg shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-blue-200/80">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom footer note */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-blue-200/70">
          <span>Tamil Nadu Transit Undertakings (TNSTC / MTC)</span>
          <span className="font-mono text-[10px]">Session 2026</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-left">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Sign in to Operations Console
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Authenticate using simulated JWT credentials to access the fleet repository.
            </p>
          </div>

          {/* Demo Credentials Box */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                Demo Credentials
              </span>
              <button
                type="button"
                onClick={handleAutofill}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-white px-2.5 py-1 rounded-md border border-blue-200 shadow-2xs hover:bg-blue-50 transition-colors"
              >
                Autofill Credentials
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-white/80 p-2 rounded border border-blue-100">
                <span className="text-[10px] text-slate-500 block uppercase font-sans">Email</span>
                <span className="text-slate-800 font-semibold truncate block">admin@transitdoc.ai</span>
              </div>
              <div className="bg-white/80 p-2 rounded border border-blue-100">
                <span className="text-[10px] text-slate-500 block uppercase font-sans">Password</span>
                <span className="text-slate-800 font-semibold block">admin123</span>
              </div>
            </div>
          </div>

          {/* Inline Error Message */}
          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@transitdoc.ai"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Remember this terminal</span>
              </label>

              <span className="text-blue-600 font-medium cursor-not-allowed hover:underline">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loginLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying JWT Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick info */}
          <div className="pt-4 text-center">
            <p className="text-[11px] text-slate-400">
              Session tokens are cryptographically generated client-side and saved in localStorage for 1 hour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
