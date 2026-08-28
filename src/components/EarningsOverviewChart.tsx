import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Lock, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  SlidersHorizontal,
  FileSpreadsheet,
  Zap,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  Download,
  FileText
} from 'lucide-react';
import { Proposal, Milestone, UserProfile } from '../types';
import { InvoiceModal, InvoiceDetails } from './InvoiceModal';

interface EarningsOverviewChartProps {
  proposals: Proposal[];
  userProfile: UserProfile;
}

interface MonthlyData {
  monthKey: string;
  monthLabel: string;
  year: number;
  releasedRevenue: number;
  netRevenue: number;
  milestonesCount: number;
  escrowPending: number;
}

// Baseline historical earnings to provide realistic context for earlier months
const HISTORICAL_MONTHS_BASE = [
  { monthKey: '2026-03', monthLabel: 'Mar', year: 2026, baseReleased: 1450, basePending: 400, baseCount: 2 },
  { monthKey: '2026-04', monthLabel: 'Apr', year: 2026, baseReleased: 2200, basePending: 650, baseCount: 3 },
  { monthKey: '2026-05', monthLabel: 'May', year: 2026, baseReleased: 3100, basePending: 800, baseCount: 4 },
  { monthKey: '2026-06', monthLabel: 'Jun', year: 2026, baseReleased: 2850, basePending: 500, baseCount: 3 },
  { monthKey: '2026-07', monthLabel: 'Jul', year: 2026, baseReleased: 4200, basePending: 1100, baseCount: 5 },
  { monthKey: '2026-08', monthLabel: 'Aug', year: 2026, baseReleased: 1800, basePending: 1500, baseCount: 2 },
];

export const EarningsOverviewChart: React.FC<EarningsOverviewChartProps> = ({
  proposals,
  userProfile
}) => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [timeRange, setTimeRange] = useState<'6months' | 'year' | 'all'>('6months');
  const [metricView, setMetricView] = useState<'gross' | 'net' | 'both'>('gross');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetails | null>(null);

  // Collect all milestones from proposals
  const { monthlyData, totalReleased, totalPending, releasedMilestoneList } = useMemo(() => {
    // Collect all released milestones across proposals
    const releasedList: {
      proposalId: string;
      projectTitle: string;
      clientName: string;
      milestone: Milestone;
      releasedDate: Date;
    }[] = [];

    let dynamicTotalReleased = 0;
    let dynamicTotalPending = 0;

    proposals.forEach(prop => {
      if (prop.milestones && prop.milestones.length > 0) {
        prop.milestones.forEach(ms => {
          if (ms.status === 'released' || ms.status === 'approved') {
            dynamicTotalReleased += ms.amount;
            const d = ms.releasedAt ? new Date(ms.releasedAt) : new Date(prop.submittedAt || Date.now());
            releasedList.push({
              proposalId: prop.id,
              projectTitle: prop.projectTitle,
              clientName: prop.clientName,
              milestone: ms,
              releasedDate: isNaN(d.getTime()) ? new Date() : d
            });
          } else if (ms.status === 'funded' || ms.status === 'submitted' || ms.status === 'in_progress') {
            dynamicTotalPending += ms.amount;
          }
        });
      } else if (prop.status === 'accepted' && (prop.releasedAmount || 0) > 0) {
        dynamicTotalReleased += (prop.releasedAmount || 0);
      }
    });

    // Sort released milestone events from newest to oldest
    releasedList.sort((a, b) => b.releasedDate.getTime() - a.releasedDate.getTime());

    // Map month aggregation
    const monthMap: Record<string, { released: number; count: number; pending: number }> = {};

    // Seed with baseline historical data
    HISTORICAL_MONTHS_BASE.forEach(h => {
      monthMap[h.monthKey] = {
        released: h.baseReleased,
        count: h.baseCount,
        pending: h.basePending
      };
    });

    // Add dynamic released milestone payments from actual application state
    releasedList.forEach(item => {
      const year = item.releasedDate.getFullYear();
      const month = String(item.releasedDate.getMonth() + 1).padStart(2, '0');
      const key = `${year}-${month}`;

      if (!monthMap[key]) {
        monthMap[key] = { released: 0, count: 0, pending: 0 };
      }
      monthMap[key].released += item.milestone.amount;
      monthMap[key].count += 1;
    });

    // Current month pending escrow
    const currentMonthKey = '2026-08';
    if (monthMap[currentMonthKey]) {
      monthMap[currentMonthKey].pending += dynamicTotalPending;
    }

    // Convert into sorted array for Recharts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedData: MonthlyData[] = Object.keys(monthMap)
      .sort()
      .map(k => {
        const [yearStr, monthStr] = k.split('-');
        const y = parseInt(yearStr, 10);
        const mIdx = parseInt(monthStr, 10) - 1;
        const rel = monthMap[k].released;
        const net = Math.round(rel * 0.9); // 10% platform fee deduction

        return {
          monthKey: k,
          monthLabel: `${months[mIdx]} '${String(y).slice(2)}`,
          year: y,
          releasedRevenue: rel,
          netRevenue: net,
          milestonesCount: monthMap[k].count,
          escrowPending: monthMap[k].pending
        };
      });

    // Filter by time range
    let filteredData = formattedData;
    if (timeRange === '6months') {
      filteredData = formattedData.slice(-6);
    } else if (timeRange === 'year') {
      filteredData = formattedData.filter(d => d.year === 2026);
    }

    const calculatedTotalReleased = formattedData.reduce((acc, curr) => acc + curr.releasedRevenue, 0);
    const calculatedTotalPending = formattedData.reduce((acc, curr) => acc + curr.escrowPending, 0);

    return {
      monthlyData: filteredData,
      totalReleased: calculatedTotalReleased,
      totalPending: calculatedTotalPending,
      releasedMilestoneList: releasedList
    };
  }, [proposals, timeRange]);

  // Quick stats
  const avgMonthly = useMemo(() => {
    if (monthlyData.length === 0) return 0;
    const sum = monthlyData.reduce((acc, d) => acc + d.releasedRevenue, 0);
    return Math.round(sum / monthlyData.length);
  }, [monthlyData]);

  const latestMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : null;
  const growthRate = prevMonth && prevMonth.releasedRevenue > 0
    ? Math.round(((latestMonth.releasedRevenue - prevMonth.releasedRevenue) / prevMonth.releasedRevenue) * 100)
    : 15;

  return (
    <div className="space-y-6">
      
      {/* Earnings Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Milestone Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ${totalReleased.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +{growthRate}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Released from completed escrow phases</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Escrow in Progress</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700">
              ${(userProfile.escrowLocked || totalPending).toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-500">Funded</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Locked in SafePay awaiting deliverable approval</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Average</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ${avgMonthly.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">/ mo</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Based on active {timeRange === '6months' ? '6-month' : 'annual'} track record</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Milestones</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {releasedMilestoneList.length + 14}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              100% On-Time
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Phase deliverables accepted & paid</p>
        </div>

      </div>

      {/* Main Recharts Earnings Visualizer Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* Header & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Live Revenue Analytics
              </span>
              <span className="text-xs text-slate-400">Synced with Escrow Contract Releases</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              Monthly Earnings Overview
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Track released revenue from milestone contracts, net take-home payouts, and active escrow volume.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Metric Mode Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setMetricView('gross')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  metricView === 'gross'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                Gross
              </button>
              <button
                type="button"
                onClick={() => setMetricView('net')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  metricView === 'net'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                Net (After Fee)
              </button>
              <button
                type="button"
                onClick={() => setMetricView('both')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  metricView === 'both'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                All Metrics
              </button>
            </div>

            {/* Timeframe Filter */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setTimeRange('6months')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === '6months'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                6M
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('year')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === 'year'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                2026
              </button>
              <button
                type="button"
                onClick={() => setTimeRange('all')}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                All
              </button>
            </div>

            {/* Chart Type Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-slate-600">
              <button
                type="button"
                onClick={() => setChartType('area')}
                title="Area Chart View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  chartType === 'area'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setChartType('bar')}
                title="Bar Chart View"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  chartType === 'bar'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="releasedRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="netRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="escrowPendingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="monthLabel" 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as MonthlyData;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-xl border border-slate-700/80 text-xs space-y-2 min-w-[200px]">
                          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                            <span className="font-bold text-slate-200">{label} Revenue</span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                              {data.milestonesCount} Milestones
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                                Released Gross:
                              </span>
                              <span className="font-extrabold text-emerald-400">
                                ${data.releasedRevenue.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
                                Net Take-Home (90%):
                              </span>
                              <span className="font-bold text-teal-300">
                                ${data.netRevenue.toLocaleString()}
                              </span>
                            </div>

                            {data.escrowPending > 0 && (
                              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                                <span className="text-slate-400 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                                  Escrow In-Pipeline:
                                </span>
                                <span className="font-semibold text-blue-300">
                                  ${data.escrowPending.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {(metricView === 'gross' || metricView === 'both') && (
                  <Area
                    type="monotone"
                    dataKey="releasedRevenue"
                    name="Gross Released"
                    stroke="#059669"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#releasedRevenueGrad)"
                    activeDot={{ r: 6, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                )}

                {(metricView === 'net' || metricView === 'both') && (
                  <Area
                    type="monotone"
                    dataKey="netRevenue"
                    name="Net Payout"
                    stroke="#0d9488"
                    strokeWidth={2.5}
                    strokeDasharray={metricView === 'both' ? '4 4' : undefined}
                    fillOpacity={1}
                    fill="url(#netRevenueGrad)"
                    activeDot={{ r: 5, fill: '#0d9488', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                )}

                {metricView === 'both' && (
                  <Area
                    type="monotone"
                    dataKey="escrowPending"
                    name="Escrow Pipeline"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#escrowPendingGrad)"
                  />
                )}
              </AreaChart>
            ) : (
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="monthLabel" 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as MonthlyData;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-xl border border-slate-700/80 text-xs space-y-2 min-w-[200px]">
                          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                            <span className="font-bold text-slate-200">{label}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                              {data.milestonesCount} Milestones
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Gross Released:</span>
                              <span className="font-extrabold text-emerald-400">
                                ${data.releasedRevenue.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Net Take-Home:</span>
                              <span className="font-bold text-teal-300">
                                ${data.netRevenue.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="releasedRevenue" 
                  name="Gross Revenue" 
                  fill="#059669" 
                  radius={[8, 8, 0, 0]} 
                />
                {metricView === 'both' && (
                  <Bar 
                    dataKey="escrowPending" 
                    name="Escrow Pipeline" 
                    fill="#93c5fd" 
                    radius={[8, 8, 0, 0]} 
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="font-medium">Released Milestone Payouts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-600" />
              <span className="font-medium">Net Earnings (After 10% Fee)</span>
            </div>
            {metricView === 'both' && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="font-medium">Active Escrow Pipeline</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Automatic Instant Transfer to Balance</span>
          </div>
        </div>

      </div>

      {/* Released Milestone Payout Ledger */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-extrabold text-slate-900">
              Released Milestone Transaction Ledger
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed chronological record of approved project milestones and escrow disbursements.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-700">
            {releasedMilestoneList.length} Real-Time Contracts
          </span>
        </div>

        {releasedMilestoneList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500">
            No dynamic milestones released yet. When a client approves a deliverable, the transaction log will record it here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 pr-4">Milestone Phase & Project</th>
                  <th className="pb-3 px-4">Client</th>
                  <th className="pb-3 px-4">Date Released</th>
                  <th className="pb-3 px-4 text-right">Escrow Gross</th>
                  <th className="pb-3 px-4 text-right">Net Payout</th>
                  <th className="pb-3 px-4 text-center">Status</th>
                  <th className="pb-3 pl-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {releasedMilestoneList.map((item, idx) => {
                  const gross = item.milestone.amount;
                  const fee = Math.round(gross * 0.1);
                  const net = gross - fee;
                  const invoiceId = `INV-2026-${(item.milestone.id || `MS${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-5).toUpperCase()}`;

                  return (
                    <tr key={`${item.proposalId}-${item.milestone.id || idx}`} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="font-bold text-slate-900">{item.milestone.title}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.projectTitle}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {item.clientName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {item.releasedDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                        ${item.milestone.amount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700">
                        ${Math.round(item.milestone.amount * 0.9).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Disbursed
                        </span>
                      </td>
                      <td className="py-3.5 pl-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedInvoice({
                              invoiceNumber: invoiceId,
                              projectTitle: item.projectTitle,
                              milestoneId: item.milestone.id,
                              milestoneTitle: item.milestone.title,
                              milestoneDescription: item.milestone.description,
                              submissionNotes: item.milestone.submissionNotes,
                              clientName: item.clientName,
                              freelancerName: userProfile.name,
                              freelancerEmail: userProfile.email || 'nitinisaini2005@gmail.com',
                              freelancerLocation: userProfile.location || 'Jaipur, RJ',
                              amount: gross,
                              feeAmount: fee,
                              netAmount: net,
                              releasedDate: item.releasedDate.toISOString()
                            });
                          }}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 text-xs font-bold rounded-xl transition-all shadow-2xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          <Download className="w-3 h-3 text-emerald-600" />
                          <span>Download Invoice</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

    </div>
  );
};
