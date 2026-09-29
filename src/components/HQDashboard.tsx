import React, { useState } from 'react';
import {
  Pickaxe,
  ShieldCheck,
  Building2,
  Users,
  BarChart3,
  ExternalLink,
  MapPin,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { KpiCard } from '@/components/KpiCard';
import { MineMap } from '@/components/MineMap';
import { mockSubsidiaryData, type SubsidiaryRecord } from '@/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export const HQDashboard: React.FC = () => {
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<SubsidiaryRecord | null>(null);

  // Risk styling helper
  const getRiskBadge = (score: number) => {
    if (score < 50) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 rounded-full font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" /> Low ({score})
        </span>
      );
    }
    if (score <= 80) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-[#F59E0B]/15 text-[#D97706] border border-[#F59E0B]/30 rounded-full font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" /> Medium ({score})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-[#EF4444]/15 text-[#DC2626] border border-[#EF4444]/30 rounded-full font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-ping" /> High ({score})
      </span>
    );
  };

  return (
    <div className="space-y-5">
      {/* --------------------------------------------------------------------- */}
      {/* ROW 1: KPI CARDS */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Coal Production (MTD)"
          value="57.3 MT"
          trend="up"
          trendValue="+4.8% vs target"
          icon={<Pickaxe />}
        />
        <KpiCard
          title="Overall Compliance %"
          value="94.2%"
          trend="up"
          trendValue="+1.4% MoM"
          icon={<ShieldCheck />}
        />
        <KpiCard
          title="Active Subsidiaries"
          value="7"
          trend="neutral"
          trendValue="Across 254 total mines"
          icon={<Building2 />}
        />
        <KpiCard
          title="Total Active Contractors"
          value="142"
          trend="up"
          trendValue="98.5% Vetted & Compliant"
          icon={<Users />}
        />
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* ROW 2: BAR CHART (Production vs Target) & INDIA GIS MAP */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Production vs Target Recharts Bar Chart */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#F59E0B]/10 rounded border border-[#F59E0B]/30 text-[#D97706]">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A] tracking-tight uppercase">
                  Subsidiary Production vs Target (MTD)
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  Monthly coal output compared against CIL target benchmarks (Million Tonnes)
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
              SEPTEMBER 2026
            </span>
          </div>

          <div className="h-[340px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockSubsidiaryData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="code"
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  unit=" MT"
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as SubsidiaryRecord;
                      return (
                        <div className="bg-[#1E293B] text-white p-3 rounded-md shadow-xl border border-slate-700 text-xs font-sans">
                          <div className="font-bold text-sm text-[#F59E0B] border-b border-slate-700 pb-1 mb-2">
                            {data.name} ({label})
                          </div>
                          <div className="space-y-1 font-mono text-[11px]">
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400">Actual Output:</span>
                              <span className="font-bold text-[#F59E0B]">{data.mtdProduction} MT</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400">Target Output:</span>
                              <span className="font-bold text-[#3B82F6]">{data.mtdTarget} MT</span>
                            </div>
                            <div className="flex justify-between gap-4 pt-1 border-t border-slate-700/60">
                              <span className="text-slate-400">Achieved:</span>
                              <span className={`font-bold ${data.mtdProduction >= data.mtdTarget ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                {((data.mtdProduction / data.mtdTarget) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: '600' }}
                />
                <Bar
                  dataKey="mtdProduction"
                  name="Actual Output (MT)"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="mtdTarget"
                  name="Target Output (MT)"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GIS Map (Centered on India with markers for all subsidiaries) */}
        <MineMap className="h-full min-h-[400px]" />
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* ROW 3: SUBSIDIARIES OVERVIEW TABLE */}
      {/* --------------------------------------------------------------------- */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-[#1E293B] text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Building2 className="h-5 w-5 text-[#F59E0B]" />
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">
                Corporate Subsidiaries Governance Register
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Aggregate mine health, AI risk exposure, and violation telemetry per subsidiary
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
              Total Subsidiaries: <span className="text-[#F59E0B] font-bold">{mockSubsidiaryData.length}</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow>
                <TableHead className="font-extrabold text-xs text-slate-700 uppercase">Subsidiary</TableHead>
                <TableHead className="font-extrabold text-xs text-slate-700 uppercase text-center">Total Mines</TableHead>
                <TableHead className="font-extrabold text-xs text-slate-700 uppercase text-center">Avg Risk Score</TableHead>
                <TableHead className="font-extrabold text-xs text-slate-700 uppercase text-center">Active Violations</TableHead>
                <TableHead className="font-extrabold text-xs text-slate-700 uppercase text-center">Production (MTD)</TableHead>
                <TableHead className="font-extrabold text-xs text-slate-700 uppercase text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100 font-sans">
              {mockSubsidiaryData.map((sub) => (
                <TableRow key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-slate-900 text-[#F59E0B] font-black text-xs flex items-center justify-center border border-slate-700 shrink-0">
                        {sub.code}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#0F172A]">{sub.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {sub.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-xs text-slate-800 font-mono">
                    {sub.totalMines}
                  </TableCell>
                  <TableCell className="text-center">
                    {getRiskBadge(sub.avgRiskScore)}
                  </TableCell>
                  <TableCell className="text-center font-mono">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                      sub.activeViolations > 10
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : sub.activeViolations > 5
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {sub.activeViolations}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs font-bold text-slate-800">
                    {sub.mtdProduction} MT <span className="text-slate-400 font-normal">/ {sub.mtdTarget} MT</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => setSelectedSubsidiary(sub)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded text-xs font-bold transition-all shadow-sm"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-[#F59E0B]" />
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* SUBSIDIARY DETAILS MODAL */}
      {/* --------------------------------------------------------------------- */}
      {selectedSubsidiary && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#1E293B] text-white px-5 py-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-[#F59E0B] text-[#0F172A] font-black text-sm flex items-center justify-center shadow">
                  {selectedSubsidiary.code}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white leading-snug">
                    {selectedSubsidiary.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Subsidiary Governance Record ({selectedSubsidiary.id})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubsidiary(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Total Mines</div>
                  <div className="text-xl font-black text-slate-800 mt-0.5">{selectedSubsidiary.totalMines}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Avg Risk Score</div>
                  <div className="mt-1">{getRiskBadge(selectedSubsidiary.avgRiskScore)}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-500">Active Violations</div>
                  <div className="text-xl font-black text-red-600 mt-0.5">{selectedSubsidiary.activeViolations}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-500">MTD Target Rate</div>
                  <div className="text-xl font-black text-emerald-600 mt-0.5">
                    {((selectedSubsidiary.mtdProduction / selectedSubsidiary.mtdTarget) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900 text-slate-200 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[#F59E0B] font-bold pb-1 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> Regional HQ Co-ordinates
                  </span>
                  <span>{selectedSubsidiary.lat.toFixed(4)}° N, {selectedSubsidiary.lng.toFixed(4)}° E</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Current MTD Production:</span>
                  <span className="text-white font-bold">{selectedSubsidiary.mtdProduction} Million Tonnes</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>CIL Monthly Target:</span>
                  <span className="text-white font-bold">{selectedSubsidiary.mtdTarget} Million Tonnes</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedSubsidiary(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HQDashboard;
