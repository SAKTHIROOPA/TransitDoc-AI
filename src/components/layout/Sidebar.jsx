import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FolderArchive,
  Search,
  Network,
  FileText,
  BarChart3,
  Info,
  ChevronLeft,
  ChevronRight,
  Shield,
  Bus
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: 'Upload Document', icon: UploadCloud, badge: 'Pipeline' },
  { path: '/repository', label: 'Document Repository', icon: FolderArchive },
  { path: '/search', label: 'Semantic Search', icon: Search },
  { path: '/knowledge-graph', label: 'Knowledge Graph', icon: Network },
  { path: '/summary', label: 'AI Summary', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  onOpenAbout
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Logo Section */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Branded Logo SVG */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center shrink-0 shadow-md shadow-blue-900/40 border border-blue-400/20">
              <div className="relative">
                <Bus className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-blue-700" />
              </div>
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-base tracking-tight text-white leading-none truncate">
                  TransitDoc <span className="text-blue-400">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1 truncate">
                  Transit Operations Cloud
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  } ${collapsed ? 'justify-center px-0' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                    {!collapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-blue-500/20 text-blue-300 rounded border border-blue-400/30">
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-950 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-slate-800">
                        {item.label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info & About Project */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/30 space-y-2">
          <button
            onClick={onOpenAbout}
            className={`w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors ${
              collapsed ? 'justify-center px-0' : ''
            }`}
            title="About Project & Academic Architecture"
          >
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            {!collapsed && <span className="truncate">About Project (Viva)</span>}
          </button>

          {!collapsed && (
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Cloud-Native AI
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                AWS Textract &bull; Neptune &bull; RoBERTa
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
