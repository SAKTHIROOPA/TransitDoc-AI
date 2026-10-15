import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Cpu,
  Clock,
  ArrowRight,
  FileText,
  CheckCircle2,
  AlertCircle,
  Tag,
  History,
  Trash2,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';
import { performSemanticSearch } from '../services/searchService';
import { useDocumentStore } from '../store/documentStore';
import { useSearchStore } from '../store/searchStore';
import { formatCurrency, formatDate, getCategoryBadgeColor } from '../utils/formatters';

const EXAMPLE_QUERIES = [
  "Find maintenance reports for TN38AB4567",
  "Show accident reports from Erode depot",
  "Invoices above ₹50,000",
  "Brake issues in last 3 months",
  "Tyre burst incidents in Madurai",
  "Overheating repairs by S. Priya Nair"
];

export default function SemanticSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { documents } = useDocumentStore();
  const { recentSearches, addSearch, clearRecentSearches } = useSearchStore();

  const [queryInput, setQueryInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [detectedIntent, setDetectedIntent] = useState(null);
  const [searchLatency, setSearchLatency] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Read query from URL param if available
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQueryInput(q);
      executeSearch(q);
    }
  }, [searchParams]);

  const executeSearch = async (queryText) => {
    if (!queryText || !queryText.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      addSearch(queryText.trim());
      const res = await performSemanticSearch(queryText.trim(), documents);
      setSearchResults(res.results);
      setDetectedIntent(res.intent);
      setSearchLatency(res.latencyMs);
    } catch (err) {
      console.error(err);
      toast.error("Failed to execute vector search.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryInput.trim()) {
      setSearchParams({ q: queryInput.trim() });
      executeSearch(queryInput.trim());
    }
  };

  const handleChipClick = (example) => {
    setQueryInput(example);
    setSearchParams({ q: example });
    executeSearch(example);
  };

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-blue-200 border border-white/20 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Dense Vector Indexing
            </span>
            <span className="text-xs text-blue-200 font-mono">OpenSearch k-NN &bull; 768 Dimensions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Semantic & Intent-Based Document Search
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed">
            Search beyond keywords using natural language understanding. TransitDoc AI identifies bus registration plates, depot jurisdictions, parts failure patterns, and budgetary limits automatically.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask anything (e.g., 'Find maintenance reports for TN38AB4567' or 'Invoices above ₹50,000')..."
                className="w-full pl-12 pr-28 py-3.5 text-xs sm:text-sm bg-white text-slate-900 rounded-2xl shadow-xl border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-blue-400/40 placeholder-slate-400 transition-all"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors disabled:opacity-60 flex items-center gap-1.5 cursor-pointer"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Example query chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-blue-200 text-[11px] font-semibold">Examples:</span>
            {EXAMPLE_QUERIES.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] rounded-lg border border-white/20 transition-colors backdrop-blur-xs cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Search Results on Left, Intent and Recent on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Results or Empty / Loading State */}
        <div className="lg:col-span-2 space-y-4">
          {/* Searching Loader Animation */}
          {isSearching && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-soft text-center space-y-4 animate-in fade-in">
              <div className="relative w-12 h-12 mx-auto">
                <div className="w-12 h-12 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                <Sparkles className="w-5 h-5 text-blue-600 absolute inset-0 m-auto" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Searching Vector Index...</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Executing dense k-NN search across 768-dimensional document embeddings in Amazon OpenSearch.
                </p>
              </div>
            </div>
          )}

          {/* Results List */}
          {!isSearching && hasSearched && (
            <div className="space-y-4">
              {/* Results stats header */}
              <div className="flex items-center justify-between px-1 text-xs text-slate-500">
                <span>
                  Found <strong className="text-slate-900">{searchResults.length}</strong> semantic match(es) in{' '}
                  <strong className="text-slate-900 font-mono">{searchLatency}ms</strong>
                </span>
                <span className="text-[11px]">Ranked by Cosine Vector Proximity</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-soft text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">No Semantic Matches Found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No documents met the 60% similarity threshold. Try adjusting your query or click on one of the example chips above.
                  </p>
                </div>
              ) : (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft hover:shadow-card hover:border-blue-300 transition-all space-y-3"
                  >
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <h3 className="font-bold text-slate-900 text-sm hover:text-blue-700 cursor-pointer">
                          {result.name}
                        </h3>
                      </div>
                      <span className={`self-start px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${getCategoryBadgeColor(result.category)}`}>
                        {result.category}
                      </span>
                    </div>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                      <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                        {result.vehicleNumber}
                      </span>
                      <span>&bull;</span>
                      <span>Depot: <strong className="text-slate-800">{result.depot}</strong></span>
                      <span>&bull;</span>
                      <span>Engineer: <strong className="text-slate-800">{result.engineer}</strong></span>
                      <span>&bull;</span>
                      <span>Cost: <strong className="text-slate-800">{formatCurrency(result.cost)}</strong></span>
                      <span>&bull;</span>
                      <span>{formatDate(result.uploadDate)}</span>
                    </div>

                    {/* Snippet */}
                    {result.snippet && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-mono">
                        "{result.snippet}"
                      </div>
                    )}

                    {/* Semantic Similarity Gauge Bar */}
                    <div className="pt-1 flex items-center justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-medium">Vector Semantic Similarity</span>
                          <span className="font-bold text-blue-700 font-mono">
                            {Math.round(result.similarity * 100)}% Match
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${result.similarity * 100}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('/repository')}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <span>View Docket</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {!hasSearched && (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-soft text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Natural Language Vector Search</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Type an inquiry above or click any suggested prompt to run live vector semantic matching against Tamil Nadu transit archives.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Detected Query Intent & Recent Searches */}
        <div className="space-y-6">
          {/* Detected Query Intent */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-600" />
                Detected Query Intent
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">NER Engine</span>
            </div>

            {detectedIntent && Object.keys(detectedIntent).length > 0 ? (
              <div className="space-y-2 pt-1 text-xs">
                {detectedIntent.category && (
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Category:</span>
                    <span className="font-bold text-blue-700">{detectedIntent.category}</span>
                  </div>
                )}
                {detectedIntent.vehicleNumber && (
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Vehicle:</span>
                    <span className="font-mono font-bold text-slate-900">{detectedIntent.vehicleNumber}</span>
                  </div>
                )}
                {detectedIntent.depot && (
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Depot:</span>
                    <span className="font-bold text-slate-900">{detectedIntent.depot}</span>
                  </div>
                )}
                {detectedIntent.incidentType && (
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Incident:</span>
                    <span className="font-bold text-rose-700">{detectedIntent.incidentType}</span>
                  </div>
                )}
                {detectedIntent.minCost && (
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500">Cost Filter:</span>
                    <span className="font-mono font-bold text-amber-700">&ge; {formatCurrency(detectedIntent.minCost)}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400 italic">
                Intent attributes (vehicle, depot, cost threshold) will display here when detected in your query.
              </div>
            )}
          </div>

          {/* Recent Searches */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-4 h-4 text-slate-600" />
                Recent Search Queries
              </h4>
              {recentSearches.length > 0 && (
                <button
                  onClick={clearRecentSearches}
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No recent searches yet.
              </div>
            ) : (
              <div className="space-y-1.5">
                {recentSearches.map((term, i) => (
                  <div
                    key={i}
                    onClick={() => handleChipClick(term)}
                    className="p-2 hover:bg-slate-50 rounded-lg text-xs text-slate-700 flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <span className="truncate pr-2 group-hover:text-blue-700 font-medium">{term}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
