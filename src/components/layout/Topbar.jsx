import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Key,
  LogOut,
  User,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import NotificationsDropdown from './NotificationsDropdown';

const PAGE_TITLES = {
  '/dashboard': { title: 'Executive Operations Dashboard', subtitle: 'State Transport Fleet Telemetry & Document Stream' },
  '/upload': { title: 'AI Document Ingestion Pipeline', subtitle: 'Automated OCR, RoBERTa Classification & Vector Indexing' },
  '/repository': { title: 'Transit Document Repository', subtitle: 'Centralized Searchable Records & Regulatory Filings' },
  '/search': { title: 'Semantic & Natural Language Search', subtitle: 'Amazon OpenSearch 768-dim Vector Intent Retrieval' },
  '/knowledge-graph': { title: 'Transit Operations Knowledge Graph', subtitle: 'Amazon Neptune Triples: Vehicles, Engineers, Depots & Incidents' },
  '/summary': { title: 'Generative AI Operations Summary', subtitle: 'Amazon Bedrock Technical Synthesis & Risk Evaluation' },
  '/analytics': { title: 'AI Operations & Accuracy Analytics', subtitle: 'Classification F1 Benchmark & OCR Performance KPIs' },
};

export default function Topbar({ onToggleMobile, onOpenJwtModal, onOpenAbout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentMeta = PAGE_TITLES[location.pathname] || {
    title: 'TransitDoc AI',
    subtitle: 'Transit Operations Management Platform'
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {currentMeta.title}
          </h1>
          <p className="hidden md:block text-[11px] text-slate-500 truncate">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Global Quick Search Input */}
        <form onSubmit={handleGlobalSearch} className="hidden sm:block relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents or TN plate..."
            className="w-48 md:w-64 pl-9 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </form>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Operational Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>

          <NotificationsDropdown
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>

        {/* User Avatar Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 sm:px-2 py-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {user?.name || "Administrator"}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight">
                {user?.role || "Admin"}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="font-semibold text-slate-900">{user?.name || "Administrator"}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200 uppercase tracking-wide">
                  {user?.role || "Administrator"}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenJwtModal();
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Key className="w-4 h-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium">Inspect JWT Session</p>
                    <p className="text-[10px] text-slate-400">View decoded token & claims</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAbout();
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>About Project & Architecture</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
