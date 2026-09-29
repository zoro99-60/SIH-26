import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockComplianceData, type MineComplianceRecord } from '@/mockData';
import { HardHat, Eye, AlertTriangle, MapPin, Calendar, Search, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ComplianceTableProps {
  data?: MineComplianceRecord[];
  onDispatchInspector?: (record: MineComplianceRecord) => void;
  onViewDetails?: (record: MineComplianceRecord) => void;
  className?: string;
}

export const ComplianceTable: React.FC<ComplianceTableProps> = ({
  data = mockComplianceData,
  onDispatchInspector,
  onViewDetails,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(
    (item) =>
      item.mineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subsidiary ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * AI Risk Score badge:
   *   < 50  → Green  (Low Risk)
   *   50–80 → Amber  (Medium Risk)
   *   > 80  → Red    (High Risk)
   */
  const renderRiskBadge = (score: number) => {
    if (score < 50) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#10B981]/10 text-[#059669] border border-[#10B981]/25">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          {score} — Low Risk
        </span>
      );
    } else if (score <= 80) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#F59E0B]/10 text-[#D97706] border border-[#F59E0B]/25">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
          {score} — Medium Risk
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#EF4444]/10 text-[#DC2626] border border-[#EF4444]/25">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-pulse" />
          {score} — High Risk
        </span>
      );
    }
  };

  const handleDispatch = (record: MineComplianceRecord) => {
    if (onDispatchInspector) {
      onDispatchInspector(record);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Dispatching DGMS Inspector to:\n${record.mineName}\n${record.location}`);
    }
  };

  const handleView = (record: MineComplianceRecord) => {
    if (onViewDetails) {
      onViewDetails(record);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Viewing details for: ${record.mineName} (${record.id})`);
    }
  };

  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden font-sans", className)}>
      {/* ------------------------------------------------------------------ */}
      {/* TABLE HEADER — Clean white/charcoal to match KPI cards             */}
      {/* ------------------------------------------------------------------ */}
      <div className="px-5 py-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#D97706] shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm tracking-tight text-slate-900">
              Mine Safety &amp; Compliance Register
            </h3>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              AI risk assessment · Mines Act 1952 · CMR 2017 · DGMS Live
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mine, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-60 pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B]/30 transition-all"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TABLE                                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="overflow-x-auto">
        <Table>
          {/* Light grey header row (#F1F5F9) with bold dark text */}
          <TableHeader>
            <TableRow className="bg-[#F1F5F9] border-b border-slate-200 hover:bg-[#F1F5F9]">
              {[
                { label: 'Mine Name', align: '' },
                { label: 'Location', align: '' },
                { label: 'Last Inspection', align: '' },
                { label: 'Active Violations', align: 'text-center' },
                { label: 'AI Risk Score', align: '' },
                { label: 'Actions', align: 'text-right pr-6' },
              ].map((col) => (
                <TableHead
                  key={col.label}
                  className={cn(
                    "text-slate-700 font-bold text-[11px] uppercase tracking-wider py-3 bg-[#F1F5F9]",
                    col.align
                  )}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-slate-100">
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-slate-400 font-mono text-xs">
                  No mine records match your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                >
                  {/* Mine Name */}
                  <TableCell className="py-4 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <span className={cn(
                        "h-2 w-2 rounded-full shrink-0",
                        row.aiRiskScore > 80 ? "bg-[#EF4444] animate-pulse" :
                        row.aiRiskScore > 50 ? "bg-[#F59E0B]" : "bg-[#10B981]"
                      )} />
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-[#1E293B] leading-tight text-xs">
                          {row.mineName}
                        </div>
                        {row.subsidiary && (
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {row.subsidiary}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Location */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                      <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                      {row.location}
                    </div>
                  </TableCell>

                  {/* Last Inspection */}
                  <TableCell className="py-4 font-mono text-slate-500 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-slate-400 shrink-0" />
                      {row.lastInspectionDate}
                    </div>
                  </TableCell>

                  {/* Active Violations */}
                  <TableCell className="py-4 text-center">
                    {row.activeViolations > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EF4444]/10 text-[#DC2626] border border-[#EF4444]/20">
                        <AlertTriangle className="h-3 w-3" />
                        {row.activeViolations}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#10B981]/10 text-[#059669] border border-[#10B981]/20">
                        0 Clean
                      </span>
                    )}
                  </TableCell>

                  {/* AI Risk Score Badge */}
                  <TableCell className="py-4">
                    {renderRiskBadge(row.aiRiskScore)}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-4 text-right pr-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDispatch(row); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-bold text-[11px] rounded-md transition-colors shadow-sm"
                      >
                        <HardHat className="h-3.5 w-3.5" />
                        Dispatch Inspector
                      </button>

                      <button
                        onClick={(e) => { e.stopPropagation(); handleView(row); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-[11px] rounded-md transition-colors shadow-sm"
                      >
                        <Eye className="h-3.5 w-3.5 text-slate-500" />
                        View Details
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TABLE FOOTER                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-700">{filteredData.length}</span> of {data.length} colliery sites
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />Low (&lt;50)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />Medium (50–80)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#EF4444]" />High (&gt;80)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTable;
