import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  Flame,
  FileText,
  ChevronRight,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Building2,
  User,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Minus,
  X,
  Send,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MineRiskRecord {
  id: string;
  name: string;
  zone: string;
  type: string;
  riskScore: number;
  openViolations: number;
  lastInspection: string;
  status: 'Critical' | 'High' | 'Moderate' | 'Compliant';
}

interface InspectionItem {
  id: string;
  mine: string;
  type: string;
  scheduledDate: string;
  inspector: string;
  priority: 'Urgent' | 'High' | 'Routine';
  daysUntil: number;
}

interface ComplianceFinding {
  id: string;
  mine: string;
  regulation: string;
  description: string;
  severity: 'Critical' | 'Major' | 'Minor';
  raisedOn: string;
  dueDate: string;
  status: 'Open' | 'Pending Review' | 'Closed';
}

interface AccidentRecord {
  id: string;
  mine: string;
  type: string;
  date: string;
  casualties: number;
  injuries: number;
  status: 'Under Investigation' | 'Closed' | 'Pending Report';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mineRiskData: MineRiskRecord[] = [
  { id: 'M-01', name: 'Jharia Block IV', zone: 'Zone 2 – Jharkhand', type: 'Underground', riskScore: 87, openViolations: 14, lastInspection: '22 Sep 2026', status: 'Critical' },
  { id: 'M-02', name: 'Korba Opencast', zone: 'Zone 5 – Chhattisgarh', type: 'Opencast', riskScore: 73, openViolations: 9, lastInspection: '18 Sep 2026', status: 'High' },
  { id: 'M-03', name: 'Talcher Pit 3', zone: 'Zone 8 – Odisha', type: 'Opencast', riskScore: 61, openViolations: 6, lastInspection: '14 Sep 2026', status: 'Moderate' },
  { id: 'M-04', name: 'Singrauli East', zone: 'Zone 6 – MP', type: 'Underground', riskScore: 44, openViolations: 2, lastInspection: '10 Sep 2026', status: 'Compliant' },
  { id: 'M-05', name: 'Raniganj Deep Level', zone: 'Zone 1 – West Bengal', type: 'Underground', riskScore: 79, openViolations: 11, lastInspection: '05 Sep 2026', status: 'High' },
];

const inspectionSchedule: InspectionItem[] = [
  { id: 'INS-2024', mine: 'Jharia Block IV', type: 'Annual Safety Inspection (CMR-2017)', scheduledDate: '02 Oct 2026', inspector: 'Shri R. Verma (Sr. DGMS)', priority: 'Urgent', daysUntil: 3 },
  { id: 'INS-2025', mine: 'Raniganj Deep Level', type: 'Repeat Violation Follow-up', scheduledDate: '06 Oct 2026', inspector: 'Smt. P. Nair (DGMS)', priority: 'High', daysUntil: 7 },
  { id: 'INS-2026', mine: 'Korba Opencast', type: 'Explosive Permit Review', scheduledDate: '10 Oct 2026', inspector: 'Shri A. Mehta (DGMS)', priority: 'High', daysUntil: 11 },
  { id: 'INS-2027', mine: 'Talcher Pit 3', type: 'Environmental Compliance Check', scheduledDate: '18 Oct 2026', inspector: 'Shri S. Chakraborty (Jr. DGMS)', priority: 'Routine', daysUntil: 19 },
];

const complianceFindings: ComplianceFinding[] = [
  { id: 'CF-418', mine: 'Jharia Block IV', regulation: 'CMR 2017 – Reg. 106 (Ventilation)', description: 'Inadequate air velocity in incline #3; measured 0.3 m/s vs. 0.6 m/s minimum.', severity: 'Critical', raisedOn: '22 Sep 2026', dueDate: '29 Sep 2026', status: 'Open' },
  { id: 'CF-417', mine: 'Raniganj Deep Level', regulation: 'Mines Act 1952 – Sec. 22 (Supports)', description: 'Missing systematic timbering in roadway heading #7-B.', severity: 'Major', raisedOn: '18 Sep 2026', dueDate: '02 Oct 2026', status: 'Pending Review' },
  { id: 'CF-415', mine: 'Korba Opencast', regulation: 'MMDR Act – Rule 56 (Bench Height)', description: 'Bench height of 18m observed exceeds 15m statutory limit in Section C.', severity: 'Major', raisedOn: '14 Sep 2026', dueDate: '05 Oct 2026', status: 'Open' },
  { id: 'CF-410', mine: 'Talcher Pit 3', regulation: 'CMR 2017 – Reg. 37 (Fire Precautions)', description: 'Fire extinguisher inspection records unavailable for Q2 2026.', severity: 'Minor', raisedOn: '05 Sep 2026', dueDate: '30 Sep 2026', status: 'Closed' },
];

const accidentLog: AccidentRecord[] = [
  { id: 'ACC-089', mine: 'Jharia Block IV', type: 'Roof Fall (Stoping)', date: '20 Sep 2026', casualties: 1, injuries: 2, status: 'Under Investigation' },
  { id: 'ACC-088', mine: 'Raniganj Deep Level', type: 'Dumper Collision', date: '12 Sep 2026', casualties: 0, injuries: 1, status: 'Pending Report' },
  { id: 'ACC-086', mine: 'Korba Opencast', type: 'Slope Failure (OB Dump)', date: '02 Aug 2026', casualties: 0, injuries: 0, status: 'Closed' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const RiskBadge: React.FC<{ status: MineRiskRecord['status'] }> = ({ status }) => {
  const map = { Critical: 'bg-red-500/15 text-red-600 border-red-400/30', High: 'bg-amber-500/15 text-amber-700 border-amber-400/30', Moderate: 'bg-yellow-400/15 text-yellow-700 border-yellow-400/30', Compliant: 'bg-emerald-500/15 text-emerald-700 border-emerald-400/30' };
  const dot = { Critical: 'bg-red-500', High: 'bg-amber-500', Moderate: 'bg-yellow-500', Compliant: 'bg-emerald-500' };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 border rounded-full font-mono ${map[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />{status}
    </span>
  );
};

const SeverityBadge: React.FC<{ severity: ComplianceFinding['severity'] }> = ({ severity }) => {
  const map = { Critical: 'bg-red-500/15 text-red-600 border-red-400/30', Major: 'bg-amber-500/15 text-amber-700 border-amber-400/30', Minor: 'bg-slate-200 text-slate-600 border-slate-300' };
  return <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 border rounded font-mono ${map[severity]}`}>{severity}</span>;
};

const StatusBadge: React.FC<{ status: ComplianceFinding['status'] }> = ({ status }) => {
  const map = { Open: 'bg-red-100 text-red-700', 'Pending Review': 'bg-amber-100 text-amber-800', Closed: 'bg-emerald-100 text-emerald-700' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${map[status]}`}>{status}</span>;
};

const PriorityBadge: React.FC<{ priority: InspectionItem['priority'] }> = ({ priority }) => {
  const map = { Urgent: 'bg-red-500/15 text-red-600 border-red-400/30', High: 'bg-amber-500/15 text-amber-700 border-amber-400/30', Routine: 'bg-blue-500/10 text-blue-700 border-blue-400/20' };
  return <span className={`text-[10px] font-bold px-2 py-0.5 border rounded font-mono ${map[priority]}`}>{priority}</span>;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const DGMSInspectorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'findings' | 'accidents'>('overview');
  const [selectedMine, setSelectedMine] = useState<MineRiskRecord | null>(null);

  const criticalCount = mineRiskData.filter((m) => m.status === 'Critical').length;
  const openFindingsCount = complianceFindings.filter((f) => f.status === 'Open').length;
  const underInvestigation = accidentLog.filter((a) => a.status === 'Under Investigation').length;

  return (
    <div className="space-y-5">
      {/* ── KPI Row ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">Critical Mines</span>
            <AlertOctagon className="h-4 w-4 text-red-500" />
          </div>
          <div className="text-3xl font-black text-red-600 font-mono">{criticalCount}</div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-red-500" /> +1 since last week
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">Open Findings</span>
            <FileText className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-700 font-mono">{openFindingsCount}</div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <Minus className="h-3 w-3 text-slate-400" /> Same as last month
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">Inspections (Oct)</span>
            <CalendarDays className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-blue-700 font-mono">{inspectionSchedule.length}</div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <Clock className="h-3 w-3 text-blue-400" /> Next in {inspectionSchedule[0].daysUntil} days
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">Investigations</span>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-3xl font-black text-orange-600 font-mono">{underInvestigation}</div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
            <TrendingDown className="h-3 w-3 text-emerald-500" /> -1 resolved this month
          </div>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1 w-fit">
        {(['overview', 'findings', 'accidents'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-[#1E293B] text-[#F59E0B] shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}`}
          >
            {tab === 'overview' ? 'High-Risk Mines & Inspections' : tab === 'findings' ? 'Compliance Findings' : 'Accidents & Incidents'}
          </button>
        ))}
      </div>

      {/* ── Overview Tab ─────────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* High-Risk Mine List (3/5) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-[#1E293B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">High-Risk Mines Registry</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{mineRiskData.length} MINES</span>
            </div>
            <div className="divide-y divide-slate-100">
              {mineRiskData.map((mine) => (
                <div
                  key={mine.id}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between gap-3"
                  onClick={() => setSelectedMine(selectedMine?.id === mine.id ? null : mine)}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${mine.status === 'Critical' ? 'bg-red-100' : mine.status === 'High' ? 'bg-amber-100' : mine.status === 'Moderate' ? 'bg-yellow-100' : 'bg-emerald-100'}`}>
                      <Building2 className={`h-4 w-4 ${mine.status === 'Critical' ? 'text-red-600' : mine.status === 'High' ? 'text-amber-700' : mine.status === 'Moderate' ? 'text-yellow-700' : 'text-emerald-700'}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 truncate">{mine.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{mine.zone} · {mine.type}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Last Inspection: {mine.lastInspection}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <RiskBadge status={mine.status} />
                    <div className="text-[10px] font-mono text-slate-500">
                      <span className="font-bold text-slate-700">{mine.openViolations}</span> open violations
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-20 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div className={`h-full rounded-full ${mine.riskScore >= 80 ? 'bg-red-500' : mine.riskScore >= 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${mine.riskScore}%` }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-600">{mine.riskScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Inline detail panel */}
            {selectedMine && (
              <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">{selectedMine.name} — Detail View</h4>
                  <button onClick={() => setSelectedMine(null)} className="text-slate-400 hover:text-slate-700"><X className="h-4 w-4" /></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-slate-200 rounded-lg p-3">
                    <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Risk Score</div>
                    <div className="text-2xl font-black font-mono text-slate-800">{selectedMine.riskScore}<span className="text-sm font-normal text-slate-400">/100</span></div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-3">
                    <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Open Violations</div>
                    <div className="text-2xl font-black font-mono text-red-600">{selectedMine.openViolations}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded-lg text-xs font-bold transition-colors">
                    <Send className="h-3.5 w-3.5" /> Issue Notice
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] rounded-lg text-xs font-bold transition-colors">
                    <CalendarDays className="h-3.5 w-3.5" /> Schedule Inspection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Inspection Schedule (2/5) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-[#1E293B] text-white flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#F59E0B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">Upcoming Inspections</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {inspectionSchedule.map((insp) => (
                <div key={insp.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 leading-tight">{insp.mine}</span>
                    <PriorityBadge priority={insp.priority} />
                  </div>
                  <div className="text-[11px] text-slate-600 mb-1.5">{insp.type}</div>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {insp.scheduledDate}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {insp.inspector.split('(')[0].trim()}</span>
                  </div>
                  <div className={`mt-1.5 text-[10px] font-mono font-bold ${insp.daysUntil <= 5 ? 'text-red-600' : insp.daysUntil <= 10 ? 'text-amber-700' : 'text-slate-500'}`}>
                    {insp.daysUntil <= 5 ? '⚠ ' : ''}{insp.daysUntil} days away
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
              <button className="text-xs font-bold text-[#1E293B] hover:text-[#F59E0B] flex items-center justify-center gap-1 mx-auto transition-colors">
                View Full Schedule <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Compliance Findings Tab ──────────────────────────────────────────── */}
      {activeTab === 'findings' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-[#1E293B] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#F59E0B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">Statutory Compliance Findings</span>
            </div>
            <span className="text-[10px] bg-red-500 text-white font-mono font-bold px-2 py-0.5 rounded">{openFindingsCount} OPEN</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['ID', 'Mine', 'Regulation', 'Description', 'Severity', 'Due', 'Status', 'Action'].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-mono font-bold text-[10px] uppercase text-slate-500 tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {complianceFindings.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#1E293B]">{f.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{f.mine}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{f.regulation}</td>
                    <td className="px-4 py-3 text-slate-500 max-w-xs">{f.description}</td>
                    <td className="px-4 py-3"><SeverityBadge severity={f.severity} /></td>
                    <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">{f.dueDate}</td>
                    <td className="px-4 py-3"><StatusBadge status={f.status} /></td>
                    <td className="px-4 py-3">
                      {f.status !== 'Closed' ? (
                        <button className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded text-[11px] font-semibold transition-colors whitespace-nowrap">Issue Notice</button>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]"><CheckCircle2 className="h-3.5 w-3.5" /> Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Accidents Tab ─────────────────────────────────────────────────────── */}
      {activeTab === 'accidents' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col items-center text-center">
              <Flame className="h-6 w-6 text-red-500 mb-1" />
              <div className="text-2xl font-black text-red-700 font-mono">{accidentLog.reduce((s, a) => s + a.casualties, 0)}</div>
              <div className="text-[11px] font-mono text-red-600">Total Fatalities (YTD)</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center text-center">
              <AlertTriangle className="h-6 w-6 text-amber-500 mb-1" />
              <div className="text-2xl font-black text-amber-700 font-mono">{accidentLog.reduce((s, a) => s + a.injuries, 0)}</div>
              <div className="text-[11px] font-mono text-amber-700">Total Injuries (YTD)</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center text-center">
              <ClipboardCheck className="h-6 w-6 text-blue-500 mb-1" />
              <div className="text-2xl font-black text-blue-700 font-mono">{underInvestigation}</div>
              <div className="text-[11px] font-mono text-blue-700">Active Investigations</div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-[#1E293B] text-white flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-orange-300">Accident & Incident Register (Statutory)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['ACC ID', 'Mine', 'Incident Type', 'Date', 'Fatalities', 'Injuries', 'Status', 'Action'].map((h) => (
                      <th key={h} className="text-left px-4 py-2.5 font-mono font-bold text-[10px] uppercase text-slate-500 tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {accidentLog.map((acc) => (
                    <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-[#1E293B]">{acc.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{acc.mine}</td>
                      <td className="px-4 py-3 text-slate-600">{acc.type}</td>
                      <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">{acc.date}</td>
                      <td className="px-4 py-3 font-mono font-bold text-sm"><span className={acc.casualties > 0 ? 'text-red-600' : 'text-slate-400'}>{acc.casualties > 0 ? acc.casualties : '—'}</span></td>
                      <td className="px-4 py-3 font-mono font-bold text-sm"><span className={acc.injuries > 0 ? 'text-amber-600' : 'text-slate-400'}>{acc.injuries > 0 ? acc.injuries : '—'}</span></td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${acc.status === 'Under Investigation' ? 'bg-red-100 text-red-700' : acc.status === 'Pending Report' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'}`}>{acc.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {acc.status !== 'Closed' ? (
                          <button className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded text-[11px] font-semibold transition-colors whitespace-nowrap flex items-center gap-1">
                            <FileText className="h-3 w-3" /> File Report
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]"><CheckCircle2 className="h-3.5 w-3.5" /> Closed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-300 rounded-xl">
            <AlertOctagon className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-800">Statutory Reporting Obligation</p>
              <p className="text-[11px] text-amber-700 mt-0.5">Under <strong>Section 23 of the Mines Act, 1952</strong>, all fatal accidents must be reported to the Chief Inspector within 2 hours. Serious bodily injuries within 24 hours. Failure to report is a prosecutable offence.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DGMSInspectorView;
