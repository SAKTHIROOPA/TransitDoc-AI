import React, { useState } from 'react';
import { Bell, Check, Trash2, AlertTriangle, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Critical Defect Logged",
    message: "Brake pressure drop below 4.5 bar recorded for TN38AB4567 at Erode Depot.",
    time: "10 mins ago",
    type: "danger",
    unread: true,
    link: "/repository"
  },
  {
    id: 2,
    title: "OCR Pipeline Completed",
    message: "RoBERTa classified Salem accident docket (DOC-2026-003) with 97.2% confidence.",
    time: "45 mins ago",
    type: "info",
    unread: true,
    link: "/repository"
  },
  {
    id: 3,
    title: "Permit Clearance Granted",
    message: "Fitness Certificate renewed for TN30GH5543 by RTO Tiruppur North.",
    time: "3 hours ago",
    type: "success",
    unread: false,
    link: "/repository"
  },
  {
    id: 4,
    title: "Knowledge Graph Synchronized",
    message: "12 new entity relationships mapped across Coimbatore South workshop.",
    time: "5 hours ago",
    type: "neutral",
    unread: false,
    link: "/knowledge-graph"
  }
];

export default function NotificationsDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleItemClick = (notif) => {
    setNotifications(notifications.map((n) => n.id === notif.id ? { ...n, unread: false } : n));
    onClose();
    if (notif.link) navigate(notif.link);
  };

  const getIcon = (type) => {
    switch (type) {
      case "danger":
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "info":
        return <FileText className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Mark read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-slate-400 hover:text-rose-600"
              title="Clear all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No notifications available
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleItemClick(n)}
              className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                n.unread ? "bg-blue-50/40" : ""
              }`}
            >
              <div className="p-2 bg-slate-100 rounded-lg shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-semibold text-slate-900 truncate">{n.title}</p>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <span className="text-[11px] text-slate-500 font-medium">
          Live Transit Telemetry Stream Connected
        </span>
      </div>
    </div>
  );
}
