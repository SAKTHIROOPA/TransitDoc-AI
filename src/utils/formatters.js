/**
 * Formatting Utilities for Indian Transit Context
 */

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatRelativeTime(dateString) {
  if (!dateString) return "";
  try {
    const now = new Date();
    const past = new Date(dateString);
    const diffDays = Math.floor((now - past) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch {
    return dateString;
  }
}

export function getCategoryBadgeColor(category) {
  switch (category) {
    case "Maintenance Report":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Inspection Report":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Accident Report":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "Invoice":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Permit":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Service Log":
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

export function getRiskBadgeColor(risk) {
  switch (risk) {
    case "Critical":
      return "bg-red-100 text-red-900 border-red-300 font-semibold";
    case "High":
      return "bg-rose-100 text-rose-800 border-rose-200";
    case "Medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Low":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}
