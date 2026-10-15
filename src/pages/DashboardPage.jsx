import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Wrench,
  ClipboardCheck,
  AlertTriangle,
  Receipt,
  FileCheck2,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  Activity
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useDocumentStore } from '../store/documentStore';
import CountUp from '../components/ui/CountUp';
import { formatDate, formatRelativeTime, getCategoryBadgeColor } from '../utils/formatters';

const DONUT_COLORS = ['#1D4ED8', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4'];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { documents } = useDocumentStore();

  // 1. Calculate KPI Metrics dynamically from documents
  const kpiData = useMemo(() => {
    const total = documents.length;
    const maintenance = documents.filter((d) => d.category === 'Maintenance Report').length;
    const inspection = documents.filter((d) => d.category === 'Inspection Report').length;
    const accident = documents.filter((d) => d.category === 'Accident Report').length;
    const invoice = documents.filter((d) => d.category === 'Invoice').length;
    const permit = documents.filter((d) => d.category === 'Permit').length;

    return [
      {
        title: 'Total Documents',
        count: total,
        trend: '+12.5%',
        icon: FileText,
        color: 'from-blue-600 to-blue-700',
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-50',
        link: '/repository'
      },
      {
        title: 'Maintenance Reports',
        count: maintenance,
        trend: '+8.3%',
        icon: Wrench,
        color: 'from-cyan-600 to-cyan-700',
        textColor: 'text-cyan-700',
        bgColor: 'bg-cyan-50',
        link: '/repository'
      },
      {
        title: 'Inspection Reports',
        count: inspection,
        trend: '+15.2%',
        icon: ClipboardCheck,
        color: 'from-emerald-600 to-emerald-700',
        textColor: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        link: '/repository'
      },
      {
        title: 'Accident Reports',
        count: accident,
        trend: '-4.1%',
        icon: AlertTriangle,
        color: 'from-rose-600 to-rose-700',
        textColor: 'text-rose-700',
        bgColor: 'bg-rose-50',
        link: '/repository'
      },
      {
        title: 'Invoices',
        count: invoice,
        trend: '+18.7%',
        icon: Receipt,
        color: 'from-amber-600 to-amber-700',
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-50',
        link: '/repository'
      },
      {
        title: 'Permits & Clearances',
        count: permit,
        trend: '+6.4%',
        icon: FileCheck2,
        color: 'from-purple-600 to-purple-700',
        textColor: 'text-purple-700',
        bgColor: 'bg-purple-50',
        link: '/repository'
      },
    ];
  }, [documents]);

  // 2. Monthly Upload Trend Data
  const monthlyUploadData = useMemo(() => {
    return [
      { month: 'Apr', uploads: 18, ocrProcessed: 18 },
      { month: 'May', uploads: 22, ocrProcessed: 22 },
      { month: 'Jun', uploads: 29, ocrProcessed: 28 },
      { month: 'Jul', uploads: 35, ocrProcessed: 35 },
      { month: 'Aug', uploads: 42, ocrProcessed: 41 },
      { month: 'Sep', uploads: 38, ocrProcessed: 38 },
      { month: 'Oct', uploads: documents.length, ocrProcessed: documents.length },
    ];
  }, [documents]);

  // 3. Category Distribution Data for Donut Chart
  const categoryData = useMemo(() => {
    const counts = {};
    documents.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
  }, [documents]);

  // 4. Processing Pipeline Status
  const processingStatus = useMemo(() => {
    const completed = documents.length;
    return [
      { status: 'Completed', count: completed, percentage: 95.5, color: '#10B981' },
      { status: 'Processing', count: 2, percentage: 3.2, color: '#3B82F6' },
      { status: 'Queued', count: 1, percentage: 1.3, color: '#F59E0B' },
      { status: 'Failed', count: 0, percentage: 0.0, color: '#EF4444' }
    ];
  }, [documents]);

  // 5. Recent Activity Feed (Top 5 latest documents)
  const recentActivities = useMemo(() => {
    return documents.slice(0, 5);
  }, [documents]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-6 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-blue-200 border border-white/20 uppercase tracking-wider">
              Live Fleet AI Stream
            </span>
            <span className="text-xs text-blue-200 font-mono">Tamil Nadu Operations Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
            State Transport Autonomous Telemetry & Classification
          </h2>
          <p className="text-xs text-blue-200/90 mt-1 max-w-2xl">
            Continuous ingestion pipeline running simulated AWS Textract OCR, RoBERTa fine-tuned categorization, and Amazon Neptune knowledge graph links.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/upload')}
            className="px-4 py-2 bg-white text-blue-900 font-bold text-xs rounded-xl hover:bg-blue-50 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            Ingest Document
          </button>
          <button
            onClick={() => navigate('/knowledge-graph')}
            className="px-4 py-2 bg-blue-600/40 hover:bg-blue-600/60 text-white font-medium text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            Explore Graph
          </button>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = !kpi.trend.startsWith('-');
          return (
            <div
              key={index}
              onClick={() => navigate(kpi.link)}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-soft hover:shadow-card hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${kpi.bgColor} ${kpi.textColor} transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center text-[11px] font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  <TrendingUp className={`w-3.5 h-3.5 mr-0.5 ${!isPositive ? 'rotate-180' : ''}`} />
                  {kpi.trend}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  <CountUp end={kpi.count} />
                </div>
                <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">
                  {kpi.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section: Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Uploads Trend (Area Chart) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Document Ingestion Volume</h3>
              <p className="text-xs text-slate-500">Ingested documents vs verified OCR passes</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              Last 7 Months
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyUploadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uploads"
                  stroke="#1D4ED8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#uploadGradient)"
                  name="Documents Ingested"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution (Donut Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">Document Taxonomy</h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {documents.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">RoBERTa model classified categories</p>
          </div>

          <div className="h-52 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px',
                    border: 'none'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 font-medium">Categories</span>
              <span className="text-lg font-black text-slate-800">{categoryData.length}</span>
            </div>
          </div>

          {/* Custom Donut Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {categoryData.slice(0, 4).map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }} />
                <span className="text-slate-600 truncate text-[11px]">{cat.name}:</span>
                <span className="font-bold text-slate-900 text-[11px]">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: AI Pipeline Health & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Processing Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Ingestion Pipeline Health</h3>
            <p className="text-xs text-slate-500">Real-time status of Textract, RoBERTa & Neptune jobs</p>
          </div>

          <div className="space-y-3 pt-1">
            {processingStatus.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-900 font-bold">{item.count}</span>
                    <span className="text-slate-400 font-normal">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-600">
              <span>Average Pipeline Latency:</span>
              <span className="font-bold text-slate-900 font-mono">1.42s / doc</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Vector Dimension:</span>
              <span className="font-bold text-slate-900 font-mono">768 (OpenSearch)</span>
            </div>
          </div>
        </div>

        {/* Recent Activities Timeline */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">Recent Transit Operations Activity</h3>
              <button
                onClick={() => navigate('/repository')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View all in Repository
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">Latest ingested dockets with assigned engineer & depot</p>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivities.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate('/repository')}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-xl shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {doc.name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="font-semibold text-slate-700 font-mono">{doc.vehicleNumber}</span>
                      <span>&bull;</span>
                      <span>Depot: {doc.depot}</span>
                      <span>&bull;</span>
                      <span>{doc.engineer}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${getCategoryBadgeColor(doc.category)}`}>
                    {doc.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:block">
                    {formatRelativeTime(doc.uploadDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All 40+ dockets fully synchronized with Neptune graph
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
