import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CheckSquare,
  Square,
  RefreshCw,
  X,
  Printer,
  ShieldCheck,
  Calendar,
  Building,
  UserCheck,
  Coins
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useDocumentStore } from '../store/documentStore';
import { TRANSIT_DEPOTS, DOCUMENT_CATEGORIES } from '../data/documents';
import { formatDate, formatCurrency, getCategoryBadgeColor, getRiskBadgeColor } from '../utils/formatters';
import { downloadTextFile } from '../utils/exportUtils';

export default function RepositoryPage() {
  const { documents } = useDocumentStore();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [depotFilter, setDepotFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sorting
  const [sortField, setSortField] = useState('uploadDate');
  const [sortAsc, setSortAsc] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Row selection
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Preview Drawer Modal
  const [previewDoc, setPreviewDoc] = useState(null);

  // Filtered & Sorted documents
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        !searchTerm ||
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.engineer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.ocrText && doc.ocrText.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = categoryFilter === 'All' || doc.category === categoryFilter;
      const matchesDepot = depotFilter === 'All' || doc.depot === depotFilter;
      const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;

      return matchesSearch && matchesCat && matchesDepot && matchesStatus;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [documents, searchTerm, categoryFilter, depotFilter, statusFilter, sortField, sortAsc]);

  // Paginated records
  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / pageSize));
  const paginatedDocs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDocs.slice(start, start + pageSize);
  }, [filteredDocs, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === paginatedDocs.length && paginatedDocs.length > 0) {
      setSelectedIds(new Set());
    } else {
      const newSet = new Set(paginatedDocs.map((d) => d.id));
      setSelectedIds(newSet);
    }
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleDownloadSingle = (doc) => {
    const textContent = `=====================================================
TAMIL NADU STATE TRANSIT OPERATIONS ARCHIVES
=====================================================
Document Name: ${doc.name}
Reference ID: ${doc.id}
Category: ${doc.category}
Vehicle Registration: ${doc.vehicleNumber}
Depot Base: ${doc.depot}
Supervising Engineer: ${doc.engineer}
Upload Date: ${doc.uploadDate}
Overhaul Cost: ₹${(doc.cost || 0).toLocaleString('en-IN')}
Incident Classification: ${doc.incidentType || 'None'}
Mean OCR Extraction Confidence: ${doc.confidence}%
-----------------------------------------------------
EXTRACTED OCR PAYLOAD:
${doc.ocrText || 'No text extracted.'}
=====================================================`;

    downloadTextFile(doc.name, textContent);
    toast.success(`Downloaded "${doc.name}"!`);
  };

  const handleBulkDownload = () => {
    if (selectedIds.size === 0) {
      toast.error("Please select at least one document for bulk download.");
      return;
    }

    const selectedDocs = documents.filter((d) => selectedIds.has(d.id));
    selectedDocs.forEach((doc) => handleDownloadSingle(doc));
    toast.success(`Exporting ${selectedDocs.length} document(s)...`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Stats */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
              Centralized S3 Registry
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {filteredDocs.length} Matching of {documents.length} Records
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Transit Document Repository
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full-text indexed transport dockets, RTO compliance certificates, and workshop invoices.
          </p>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">
              {selectedIds.size} selected
            </span>
            <button
              onClick={handleBulkDownload}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Selected
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Text Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by file, vehicle plate, engineer, or OCR text..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            >
              <option value="All">All Categories</option>
              {DOCUMENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Depot Dropdown */}
          <div>
            <select
              value={depotFilter}
              onChange={(e) => {
                setDepotFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 bg-slate-50 text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            >
              <option value="All">All Depots</option>
              {TRANSIT_DEPOTS.map((depot) => (
                <option key={depot} value={depot}>{depot} Depot</option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setDepotFilter('All');
                setStatusFilter('All');
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold select-none">
                <th className="py-3.5 px-4 w-10">
                  <button
                    onClick={handleSelectAll}
                    className="text-slate-400 hover:text-slate-600 flex items-center"
                  >
                    {paginatedDocs.length > 0 && selectedIds.size === paginatedDocs.length ? (
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>

                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-700"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Document Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                <th
                  onClick={() => handleSort('category')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-700"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                <th
                  onClick={() => handleSort('vehicleNumber')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-700"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Vehicle Plate</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                <th
                  onClick={() => handleSort('engineer')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-700 hidden md:table-cell"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Engineer & Depot</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                <th
                  onClick={() => handleSort('uploadDate')}
                  className="py-3.5 px-4 cursor-pointer hover:text-blue-700 hidden sm:table-cell"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Upload Date</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>

                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                    No transit documents found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedDocs.map((doc) => {
                  const isSelected = selectedIds.has(doc.id);
                  return (
                    <tr
                      key={doc.id}
                      className={`hover:bg-blue-50/40 transition-colors ${
                        isSelected ? 'bg-blue-50/60' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleSelectRow(doc.id)}
                          className="text-slate-400 hover:text-slate-600 flex items-center"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <div className="min-w-0">
                            <p
                              onClick={() => setPreviewDoc(doc)}
                              className="font-bold text-slate-900 truncate hover:text-blue-700 cursor-pointer max-w-xs"
                            >
                              {doc.name}
                            </p>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {doc.id} &bull; {doc.fileSize || '2.2 MB'}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border whitespace-nowrap ${getCategoryBadgeColor(doc.category)}`}>
                          {doc.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                        {doc.vehicleNumber}
                      </td>

                      <td className="py-3 px-4 hidden md:table-cell">
                        <p className="font-semibold text-slate-800">{doc.engineer}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{doc.depot} Depot</p>
                      </td>

                      <td className="py-3 px-4 text-slate-600 font-medium hidden sm:table-cell whitespace-nowrap">
                        {formatDate(doc.uploadDate)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                          {doc.status || "Completed"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Preview Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadSingle(doc)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Download OCR Text"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Showing <span className="font-bold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(currentPage * pageSize, filteredDocs.length)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{filteredDocs.length}</span> documents
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 bg-white border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-semibold text-slate-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 bg-white border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Preview Drawer / Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-200" />
                </div>
                <div>
                  <h3 className="font-bold text-base truncate max-w-lg">{previewDoc.name}</h3>
                  <p className="text-xs text-blue-200 font-mono">Ref: {previewDoc.id} &bull; Depot: {previewDoc.depot}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
              {/* Properties Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Vehicle Plate</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{previewDoc.vehicleNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Category</span>
                  <span className={`inline-block mt-0.5 px-2 py-0.5 font-bold rounded-full text-[10px] border ${getCategoryBadgeColor(previewDoc.category)}`}>
                    {previewDoc.category}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Supervising Engineer</span>
                  <span className="font-semibold text-slate-800">{previewDoc.engineer}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Cost</span>
                  <span className="font-bold text-slate-900 font-mono">{formatCurrency(previewDoc.cost)}</span>
                </div>
              </div>

              {/* Physical Document Simulation Sheet */}
              <div className="border border-slate-300 rounded-xl bg-amber-50/20 p-5 shadow-inner space-y-3 font-mono relative">
                {/* Simulated Official Depot Stamp */}
                <div className="absolute top-4 right-4 border-2 border-dashed border-blue-600/40 text-blue-700/60 rounded-xl p-2 rotate-12 text-[10px] font-bold text-center pointer-events-none select-none uppercase leading-tight">
                  TNSTC WORKSHOP<br />CLEARANCE SEAL
                </div>

                <div className="text-[11px] text-slate-400 font-sans uppercase font-bold tracking-wider">
                  Extracted OCR Document Text (Tesseract / Textract Layout)
                </div>

                <pre className="text-[11px] text-slate-800 whitespace-pre-wrap leading-relaxed font-mono bg-white p-4 rounded-lg border border-slate-200 max-h-64 overflow-y-auto">
                  {previewDoc.ocrText}
                </pre>
              </div>

              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>AWS Textract Mean Extraction Confidence: <strong className="text-emerald-700 font-mono">{previewDoc.confidence}%</strong></span>
                <span>Storage: AWS S3 Encrypted Glacier Deep Archive</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Uploaded: {formatDate(previewDoc.uploadDate)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadSingle(previewDoc)}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Document
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
