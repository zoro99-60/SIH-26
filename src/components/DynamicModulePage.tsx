import React, { useState } from 'react';
import {
  ShieldCheck, Users, ClipboardCheck, ShieldAlert, Leaf, Map as MapIcon,
  FileText, CheckSquare, AlertTriangle, Download, CheckCircle2, Clock,
  XCircle, TrendingUp, TrendingDown, BarChart2, RefreshCw, Filter,
  ExternalLink, AlertOctagon, Activity,
} from 'lucide-react';
import { MineMap } from '@/components/MineMap';
import { mockComplianceData } from '@/mockData';

// ─── Shared helpers ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: { label: string; color: string };
  actions?: React.ReactNode;
}> = ({ icon, title, subtitle, badge, actions }) => (
  <div className="flex items-center justify-between gap-4 mb-5">
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg bg-[#1E293B] flex items-center justify-center text-[#F59E0B] shadow-sm shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          {title}
          {badge && (
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${badge.color}`}>
              {badge.label}
            </span>
          )}
        </h2>
        {subtitle && <p className="text-[11px] text-slate-500 font-mono mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </div>
);

const TableCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    {children}
  </div>
);

const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <th className={`text-left px-4 py-2.5 font-mono font-bold text-[10px] uppercase text-slate-500 tracking-wider whitespace-nowrap bg-slate-50 border-b border-slate-200 ${className}`}>
    {children}
  </th>
);

const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <td className={`px-4 py-3 text-xs ${className}`}>{children}</td>
);

// ─── MODULE: Compliance ───────────────────────────────────────────────────────

const ComplianceModule: React.FC = () => {
  const getRiskBadge = (score: number) => {
    if (score >= 80) return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-red-500/10 text-red-600 border-red-400/30 font-mono"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />High ({score})</span>;
    if (score >= 50) return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-amber-500/10 text-amber-700 border-amber-400/30 font-mono"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Medium ({score})</span>;
    return <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-700 border-emerald-400/30 font-mono"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Low ({score})</span>;
  };

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Mines Monitored', value: mockComplianceData.length, icon: <MapIcon className="h-4 w-4" />, color: 'text-blue-600' },
          { label: 'High Risk Mines', value: mockComplianceData.filter(m => m.aiRiskScore >= 80).length, icon: <AlertOctagon className="h-4 w-4" />, color: 'text-red-600' },
          { label: 'Active Violations', value: mockComplianceData.reduce((s, m) => s + m.activeViolations, 0), icon: <AlertTriangle className="h-4 w-4" />, color: 'text-amber-600' },
          { label: 'Compliant Mines', value: mockComplianceData.filter(m => m.activeViolations === 0).length, icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-emerald-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">{k.label}</span>
              <span className={k.color}>{k.icon}</span>
            </div>
            <div className={`text-3xl font-black font-mono ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <SectionHeader
        icon={<ShieldCheck className="h-4 w-4" />}
        title="Compliance Register"
        subtitle="CMR 2017 · Mines Act 1952 · DGMS Statutory Framework"
        badge={{ label: `${mockComplianceData.length} MINES`, color: 'bg-blue-100 text-blue-700' }}
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-bold rounded text-xs transition-colors">
            <Download className="h-3.5 w-3.5" /> Export PDF
          </button>
        }
      />
      <TableCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              {['Mine ID', 'Mine Name', 'Location', 'Subsidiary', 'Last Inspected', 'Violations', 'AI Risk Score', 'Status'].map(h => <Th key={h}>{h}</Th>)}
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {mockComplianceData.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <Td><span className="font-mono font-bold text-[#1E293B]">{m.id}</span></Td>
                  <Td><span className="font-semibold text-slate-800">{m.mineName}</span></Td>
                  <Td><span className="text-slate-600">{m.location}</span></Td>
                  <Td><span className="text-slate-500">{m.subsidiary}</span></Td>
                  <Td><span className="font-mono text-slate-500">{m.lastInspectionDate}</span></Td>
                  <Td>
                    <span className={`font-mono font-bold text-sm ${m.activeViolations > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {m.activeViolations > 0 ? m.activeViolations : '✓ None'}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div className={`h-full rounded-full ${m.aiRiskScore >= 80 ? 'bg-red-500' : m.aiRiskScore >= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${m.aiRiskScore}%` }} />
                      </div>
                      {getRiskBadge(m.aiRiskScore)}
                    </div>
                  </Td>
                  <Td>
                    {m.activeViolations === 0
                      ? <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]"><CheckCircle2 className="h-3.5 w-3.5" /> Compliant</span>
                      : <button className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded text-[11px] font-semibold transition-colors">View Findings</button>
                    }
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableCard>
    </div>
  );
};

// ─── MODULE: Contractors ──────────────────────────────────────────────────────

const contractorData = [
  { id: 'CTR-041', name: 'Ramky Infrastructure Ltd.', work: 'Overburden Removal', site: 'Pit 07 North Bench', workers: 142, complianceScore: 94, status: 'Active', expiry: '2027-03-31' },
  { id: 'CTR-038', name: 'Simplex Infrastructures', work: 'Haul Road Construction', site: 'Ramp 4 Extension', workers: 87, complianceScore: 78, status: 'Active', expiry: '2026-12-15' },
  { id: 'CTR-035', name: 'Thriveni Earthmovers', work: 'HEMM Operations', site: 'South Bench', workers: 220, complianceScore: 88, status: 'Active', expiry: '2027-06-30' },
  { id: 'CTR-030', name: 'MEIL Mining Division', work: 'Blasting Services', site: 'Section 4 West', workers: 34, complianceScore: 62, status: 'Review', expiry: '2026-10-20' },
  { id: 'CTR-027', name: 'Garuda Constructions', work: 'Drainage & Dewatering', site: 'Sump Area B', workers: 58, complianceScore: 91, status: 'Active', expiry: '2027-01-18' },
  { id: 'CTR-022', name: 'Nalwa Sons Investments', work: 'Electrical Maintenance', site: 'Pump House 2', workers: 23, complianceScore: 55, status: 'Suspended', expiry: '2026-08-01' },
];

const ContractorsModule: React.FC = () => (
  <div className="space-y-5">
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Total Contractors', value: contractorData.length, color: 'text-blue-600' },
        { label: 'Active', value: contractorData.filter(c => c.status === 'Active').length, color: 'text-emerald-600' },
        { label: 'Suspended / Review', value: contractorData.filter(c => c.status !== 'Active').length, color: 'text-red-600' },
      ].map(k => (
        <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-1">{k.label}</div>
          <div className={`text-3xl font-black font-mono ${k.color}`}>{k.value}</div>
        </div>
      ))}
    </div>
    <SectionHeader icon={<Users className="h-4 w-4" />} title="Contractor Registry" subtitle="Jharia Colliery · Active contractual workforce" />
    <TableCard>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr>
            {['ID', 'Contractor Name', 'Work Type', 'Site', 'Workers', 'Compliance Score', 'Expiry', 'Status'].map(h => <Th key={h}>{h}</Th>)}
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {contractorData.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <Td><span className="font-mono font-bold text-[#1E293B]">{c.id}</span></Td>
                <Td><span className="font-semibold text-slate-800">{c.name}</span></Td>
                <Td><span className="text-slate-600">{c.work}</span></Td>
                <Td><span className="text-slate-500 font-mono text-[11px]">{c.site}</span></Td>
                <Td><span className="font-mono font-bold text-slate-700">{c.workers}</span></Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div className={`h-full rounded-full ${c.complianceScore >= 85 ? 'bg-emerald-500' : c.complianceScore >= 65 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${c.complianceScore}%` }} />
                    </div>
                    <span className={`font-mono font-bold text-xs ${c.complianceScore >= 85 ? 'text-emerald-700' : c.complianceScore >= 65 ? 'text-amber-700' : 'text-red-600'}`}>{c.complianceScore}%</span>
                  </div>
                </Td>
                <Td><span className="font-mono text-slate-500">{c.expiry}</span></Td>
                <Td>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : c.status === 'Review' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-700'}`}>
                    {c.status}
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableCard>
  </div>
);

// ─── MODULE: Inspections ──────────────────────────────────────────────────────

const inspectionData = [
  { id: 'INS-1084', mine: 'Jharia Block IV', type: 'Annual Safety Inspection', inspector: 'Shri R. Verma (DGMS)', date: '2026-10-02', status: 'Upcoming', priority: 'Urgent' },
  { id: 'INS-1083', mine: 'Korba Opencast', type: 'Explosives Permit Review', inspector: 'Shri A. Mehta (DGMS)', date: '2026-10-10', status: 'Upcoming', priority: 'High' },
  { id: 'INS-1082', mine: 'Jharia Block IV', type: 'Ventilation Compliance Check', inspector: 'Smt. P. Nair', date: '2026-09-24', status: 'Completed', priority: 'Routine' },
  { id: 'INS-1081', mine: 'Singrauli Jayant', type: 'Environmental Audit', inspector: 'Shri S. Kumar', date: '2026-09-20', status: 'Completed', priority: 'Routine' },
  { id: 'INS-1080', mine: 'Raniganj Underground', type: 'Repeat Violation Follow-up', inspector: 'Shri D. Ghosh', date: '2026-09-15', status: 'Completed', priority: 'High' },
  { id: 'INS-1079', mine: 'Talcher Deep Pit', type: 'Structural Stability Survey', inspector: 'Shri M. Patel', date: '2026-10-18', status: 'Upcoming', priority: 'Routine' },
];

const InspectionsModule: React.FC = () => {
  const upcoming = inspectionData.filter(i => i.status === 'Upcoming');
  const completed = inspectionData.filter(i => i.status === 'Completed');
  const priColor = (p: string) => p === 'Urgent' ? 'bg-red-100 text-red-700 border-red-200' : p === 'High' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-100';

  const InspCard = ({ insp }: { insp: typeof inspectionData[0] }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-mono font-bold text-[11px] text-slate-400">{insp.id}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${priColor(insp.priority)}`}>{insp.priority}</span>
      </div>
      <div className="font-bold text-sm text-slate-900 mb-0.5">{insp.mine}</div>
      <div className="text-xs text-slate-600 mb-2">{insp.type}</div>
      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1"><ClipboardCheck className="h-3 w-3" />{insp.inspector}</span>
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{insp.date}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Inspections', value: inspectionData.length, color: 'text-slate-700' },
          { label: 'Upcoming', value: upcoming.length, color: 'text-amber-600' },
          { label: 'Completed', value: completed.length, color: 'text-emerald-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-1">{k.label}</div>
            <div className={`text-3xl font-black font-mono ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div>
        <SectionHeader icon={<Clock className="h-4 w-4" />} title="Upcoming Inspections" badge={{ label: `${upcoming.length}`, color: 'bg-amber-100 text-amber-700' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcoming.map(i => <InspCard key={i.id} insp={i} />)}
        </div>
      </div>

      <div>
        <SectionHeader icon={<CheckCircle2 className="h-4 w-4" />} title="Completed Inspections" badge={{ label: `${completed.length}`, color: 'bg-emerald-100 text-emerald-700' }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completed.map(i => (
            <div key={i.id} className="bg-white border border-slate-200 rounded-xl p-4 opacity-80">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono font-bold text-[11px] text-slate-400">{i.id}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 font-mono"><CheckCircle2 className="h-3 w-3" /> Done</span>
              </div>
              <div className="font-bold text-sm text-slate-900 mb-0.5">{i.mine}</div>
              <div className="text-xs text-slate-600 mb-2">{i.type}</div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                <span>{i.inspector}</span>
                <span>{i.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MODULE: Safety ───────────────────────────────────────────────────────────

const safetyObservations = [
  { id: 'SO-341', observer: 'Shift Manager (Shift B)', location: 'Underground Incline #3', observation: 'Worker observed without self-rescuer during travel to face.', severity: 'Major', date: '2026-09-29', action: 'Immediate verbal warning; refresher training scheduled.' },
  { id: 'SO-340', observer: 'Safety Officer', location: 'Haul Ramp #4', observation: 'Dumper reversing without banksman present.', severity: 'Critical', date: '2026-09-28', action: 'Operation halted; system-of-work notice issued.' },
  { id: 'SO-339', observer: 'HEMM Operator', location: 'Overburden Dump #2', observation: 'Edge berms below 1m height near slope crest.', severity: 'Critical', date: '2026-09-27', action: 'Dump closed pending berm restoration inspection.' },
  { id: 'SO-338', observer: 'Field Inspector', location: 'Pump House 2', observation: 'Temporary electrical connection with bare wires.', severity: 'Major', date: '2026-09-26', action: 'Electrical supervisor notified; isolation tag applied.' },
  { id: 'SO-337', observer: 'Mine Foreman', location: 'Store Room B', observation: 'MSDS sheets not available for new chemical batch.', severity: 'Minor', date: '2026-09-25', action: 'Purchase dept. instructed to procure documentation.' },
];

const SafetyModule: React.FC = () => {
  const sevColor = (s: string) => s === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' : s === 'Major' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200';
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Critical Observations', value: safetyObservations.filter(o => o.severity === 'Critical').length, color: 'text-red-600' },
          { label: 'Major Observations', value: safetyObservations.filter(o => o.severity === 'Major').length, color: 'text-amber-600' },
          { label: 'Minor Observations', value: safetyObservations.filter(o => o.severity === 'Minor').length, color: 'text-slate-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-1">{k.label}</div>
            <div className={`text-3xl font-black font-mono ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>
      <SectionHeader icon={<ShieldAlert className="h-4 w-4" />} title="Safety Observation Log" subtitle="CMR 2017 · Daily safety observations register" />
      <div className="space-y-3">
        {safetyObservations.map(o => (
          <div key={o.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="font-mono text-[11px] text-slate-400 mr-2">{o.id}</span>
                <span className="font-bold text-xs text-slate-800">{o.location}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${sevColor(o.severity)}`}>{o.severity}</span>
                <span className="font-mono text-[10px] text-slate-400">{o.date}</span>
              </div>
            </div>
            <p className="text-xs text-slate-700 mb-2 leading-relaxed">{o.observation}</p>
            <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
              <CheckSquare className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span><strong>Action:</strong> {o.action}</span>
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-400">Reported by: {o.observer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MODULE: Environment ──────────────────────────────────────────────────────

const envMetrics = [
  { label: 'PM10', value: 45, unit: 'µg/m³', limit: 100, status: 'Safe', trend: 'down' },
  { label: 'PM2.5', value: 28, unit: 'µg/m³', limit: 60, status: 'Safe', trend: 'down' },
  { label: 'SO₂', value: 52, unit: 'µg/m³', limit: 80, status: 'Moderate', trend: 'up' },
  { label: 'NO₂', value: 31, unit: 'µg/m³', limit: 80, status: 'Safe', trend: 'stable' },
  { label: 'Noise Level', value: 82, unit: 'dB(A)', limit: 75, status: 'Warning', trend: 'up' },
  { label: 'Water pH', value: 7.2, unit: 'pH', limit: 8.5, status: 'Normal', trend: 'stable' },
  { label: 'Suspended Solids', value: 38, unit: 'mg/L', limit: 100, status: 'Safe', trend: 'down' },
  { label: 'Mine Discharge BOD', value: 19, unit: 'mg/L', limit: 30, status: 'Safe', trend: 'stable' },
];

const waterReadings = [
  { id: 'WP-01', source: 'Open Sump A (Pit 07)', pH: 7.1, TSS: 38, BOD: 17, status: 'Compliant' },
  { id: 'WP-02', source: 'Discharge Channel North', pH: 6.9, TSS: 45, BOD: 22, status: 'Compliant' },
  { id: 'WP-03', source: 'Dewatering Pump Outlet', pH: 7.4, TSS: 88, BOD: 29, status: 'Near Limit' },
];

const EnvironmentModule: React.FC = () => {
  const statusColor = (s: string) =>
    s === 'Warning' || s === 'Near Limit' ? 'text-amber-700 bg-amber-50 border-amber-200' :
    s === 'Safe' || s === 'Normal' || s === 'Compliant' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
    'text-blue-700 bg-blue-50 border-blue-200';
  const barColor = (v: number, lim: number) => {
    const pct = v / lim;
    return pct >= 1 ? 'bg-red-500' : pct >= 0.8 ? 'bg-amber-500' : 'bg-emerald-500';
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        icon={<Leaf className="h-4 w-4" />}
        title="Environmental Monitoring"
        subtitle="Real-time sensors · CPCB / MoEFCC Limits · CMR 2017 Reg. 150"
        badge={{ label: 'LIVE', color: 'bg-emerald-100 text-emerald-700' }}
        actions={<button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-xs transition-colors"><RefreshCw className="h-3.5 w-3.5" /> Refresh</button>}
      />

      {/* Air Quality Grid */}
      <div>
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 font-mono">Air Quality Parameters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {envMetrics.map(m => (
            <div key={m.label} className={`bg-white border rounded-xl p-4 ${m.status === 'Warning' ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">{m.label}</span>
                {m.trend === 'up' ? <TrendingUp className="h-3.5 w-3.5 text-red-400" /> : m.trend === 'down' ? <TrendingDown className="h-3.5 w-3.5 text-emerald-400" /> : <Activity className="h-3.5 w-3.5 text-slate-300" />}
              </div>
              <div className="text-xl font-black text-slate-800 font-mono">{m.value} <span className="text-xs font-normal text-slate-400">{m.unit}</span></div>
              <div className="mt-2 w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className={`h-full rounded-full ${barColor(m.value, m.limit)}`} style={{ width: `${Math.min((m.value / m.limit) * 100, 100)}%` }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className={`text-[10px] font-bold border rounded px-1.5 py-0.5 ${statusColor(m.status)}`}>{m.status}</span>
                <span className="text-[10px] font-mono text-slate-400">Lim: {m.limit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Water Quality Table */}
      <div>
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 font-mono">Water Quality Readings</h3>
        <TableCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr>{['Point ID', 'Source', 'pH', 'TSS (mg/L)', 'BOD (mg/L)', 'Status'].map(h => <Th key={h}>{h}</Th>)}</tr></thead>
              <tbody className="divide-y divide-slate-100">
                {waterReadings.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <Td><span className="font-mono font-bold text-[#1E293B]">{r.id}</span></Td>
                    <Td><span className="text-slate-700 font-medium">{r.source}</span></Td>
                    <Td><span className="font-mono font-bold text-slate-700">{r.pH}</span></Td>
                    <Td><span className="font-mono text-slate-700">{r.TSS}</span></Td>
                    <Td><span className="font-mono text-slate-700">{r.BOD}</span></Td>
                    <Td><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor(r.status)}`}>{r.status}</span></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableCard>
      </div>
    </div>
  );
};

// ─── MODULE: Reports ──────────────────────────────────────────────────────────

const reportsList = [
  { id: 'RPT-2026-09', title: 'Monthly Safety & Compliance Report', type: 'Statutory', date: '2026-09-30', size: '4.2 MB', format: 'PDF' },
  { id: 'RPT-2026-Q3', title: 'Q3 2026 Environmental Audit Report', type: 'Regulatory', date: '2026-09-28', size: '7.8 MB', format: 'PDF' },
  { id: 'RPT-ACC-089', title: 'Accident Investigation Report — ACC-089', type: 'Statutory', date: '2026-09-25', size: '2.1 MB', format: 'PDF' },
  { id: 'RPT-INS-1082', title: 'Inspection Report — Ventilation Check', type: 'Inspection', date: '2026-09-24', size: '1.6 MB', format: 'PDF' },
  { id: 'RPT-DGMS-SEP', title: 'DGMS Quarterly Returns (Sep 2026)', type: 'Regulatory', date: '2026-09-22', size: '3.3 MB', format: 'PDF' },
  { id: 'RPT-HEMM-AUG', title: 'HEMM Fleet Inspection Summary', type: 'Operations', date: '2026-09-10', size: '5.1 MB', format: 'PDF' },
  { id: 'RPT-ENV-AUG', title: 'Air & Water Quality August 2026', type: 'Environmental', date: '2026-09-01', size: '2.9 MB', format: 'PDF' },
];

const typeColor = (t: string) =>
  t === 'Statutory' ? 'bg-red-50 text-red-700 border-red-200' :
  t === 'Regulatory' ? 'bg-amber-50 text-amber-700 border-amber-200' :
  t === 'Inspection' ? 'bg-blue-50 text-blue-700 border-blue-200' :
  t === 'Environmental' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
  'bg-slate-100 text-slate-600 border-slate-200';

const ReportsModule: React.FC = () => (
  <div className="space-y-5">
    <SectionHeader
      icon={<FileText className="h-4 w-4" />}
      title="Reports & Document Archive"
      subtitle="Statutory exports · DGMS filings · Operational summaries"
      actions={
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-bold rounded text-xs transition-colors">
          <FileText className="h-3.5 w-3.5" /> Generate New Report
        </button>
      }
    />
    <div className="grid grid-cols-1 gap-3">
      {reportsList.map(r => (
        <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4 hover:shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-red-400" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm text-slate-800 truncate">{r.title}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono ${typeColor(r.type)}`}>{r.type}</span>
                <span className="text-[10px] font-mono text-slate-400">{r.id} · {r.date} · {r.size}</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded-lg text-xs font-bold transition-colors shrink-0">
            <Download className="h-3.5 w-3.5" /> Download {r.format}
          </button>
        </div>
      ))}
    </div>
  </div>
);

// ─── MODULE: Actions ──────────────────────────────────────────────────────────

const actionItems = [
  { id: 'CA-078', title: 'Restore berm height at OB Dump #2 north crest to statutory 1.5m minimum', mine: 'Jharia Block IV', assignee: 'Shri D. Singh (Mine Manager)', due: '2026-10-01', priority: 'Critical', status: 'Overdue', raised: 'DGMS Notice CF-418' },
  { id: 'CA-077', title: 'Increase air velocity at Incline #3 Face 2B — install supplementary auxiliary fan', mine: 'Jharia Block IV', assignee: 'Ventilation Officer', due: '2026-10-03', priority: 'Critical', status: 'In Progress', raised: 'DGMS Notice CF-417' },
  { id: 'CA-076', title: 'Reinstate systematic timbering in roadway heading #7-B per CMR Reg. 95', mine: 'Raniganj Underground', assignee: 'Undermanager (Shift A)', due: '2026-10-05', priority: 'High', status: 'In Progress', raised: 'Internal Safety Audit' },
  { id: 'CA-075', title: 'Calibrate all HEMM speed limiters — ensure 20 km/h cap on haul ramps', mine: 'Jharia Block IV', assignee: 'HEMM Foreman', due: '2026-09-28', priority: 'High', status: 'Completed', raised: 'AI Alert ALT-1091' },
  { id: 'CA-074', title: 'Procure replacement dust suppression equipment for Haul Road Section C', mine: 'Korba Opencast', assignee: 'Stores Dept.', due: '2026-10-15', priority: 'Routine', status: 'Pending', raised: 'Environmental Check' },
];

const ActionsModule: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const filters = ['All', 'Overdue', 'In Progress', 'Pending', 'Completed'];
  const displayed = filter === 'All' ? actionItems : actionItems.filter(a => a.status === filter);

  const statusIcon = (s: string) => {
    if (s === 'Completed') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (s === 'Overdue') return <XCircle className="h-4 w-4 text-red-500" />;
    if (s === 'In Progress') return <RefreshCw className="h-4 w-4 text-blue-500" />;
    return <Clock className="h-4 w-4 text-amber-500" />;
  };
  const priColor = (p: string) =>
    p === 'Critical' ? 'text-red-700 bg-red-50 border-red-200' :
    p === 'High' ? 'text-amber-700 bg-amber-50 border-amber-200' :
    'text-slate-600 bg-slate-50 border-slate-200';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Overdue', value: actionItems.filter(a => a.status === 'Overdue').length, color: 'text-red-600' },
          { label: 'In Progress', value: actionItems.filter(a => a.status === 'In Progress').length, color: 'text-blue-600' },
          { label: 'Pending', value: actionItems.filter(a => a.status === 'Pending').length, color: 'text-amber-600' },
          { label: 'Completed', value: actionItems.filter(a => a.status === 'Completed').length, color: 'text-emerald-600' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-1">{k.label}</div>
            <div className={`text-3xl font-black font-mono ${k.color}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        <div className="flex gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${filter === f ? 'bg-[#1E293B] text-[#F59E0B] shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {displayed.map(a => (
          <div key={a.id} className={`bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow ${a.status === 'Overdue' ? 'border-red-200 bg-red-50/20' : a.status === 'Completed' ? 'border-slate-200 opacity-70' : 'border-slate-200'}`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">{statusIcon(a.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className={`text-xs font-semibold leading-relaxed ${a.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{a.title}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono shrink-0 ${priColor(a.priority)}`}>{a.priority}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[10px] font-mono text-slate-500">
                  <span>📍 {a.mine}</span>
                  <span>👤 {a.assignee}</span>
                  <span className={a.status === 'Overdue' ? 'text-red-600 font-bold' : ''}>📅 Due: {a.due}</span>
                  <span>🔗 {a.raised}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MODULE: GIS Map ──────────────────────────────────────────────────────────

const GISMapModule: React.FC = () => (
  <div className="space-y-4">
    <SectionHeader icon={<MapIcon className="h-4 w-4" />} title="GIS Mine Map" subtitle="Real-time LiDAR overlay · Risk markers · Sensor positions" badge={{ label: 'LIVE', color: 'bg-emerald-100 text-emerald-700' }} />
    <MineMap className="h-[600px]" />
  </div>
);

// ─── MODULE: Generic Analytics Fallback ──────────────────────────────────────

const AnalyticsFallback: React.FC<{ moduleName: string }> = ({ moduleName }) => {
  const bars = [68, 82, 54, 91, 75, 63, 88, 72, 95, 58, 79, 84];
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  return (
    <div className="space-y-5">
      <SectionHeader icon={<BarChart2 className="h-4 w-4" />} title={`${moduleName} Analytics`} subtitle="Historical trend · 12-month rolling view" />
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-end gap-2 h-48">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm bg-gradient-to-t from-[#1E293B] to-[#334155] hover:from-[#F59E0B] hover:to-[#FBBF24] transition-colors cursor-pointer"
                style={{ height: `${h}%` }}
                title={`${months[i]}: ${h}`}
              />
              <span className="text-[9px] font-mono text-slate-400">{months[i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Avg: {Math.round(bars.reduce((a, b) => a + b, 0) / bars.length)}</span>
          <span>Peak: {Math.max(...bars)}</span>
          <span>Low: {Math.min(...bars)}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'This Month', value: bars[bars.length - 1], icon: <TrendingUp className="h-4 w-4 text-emerald-500" /> },
          { label: '12M Average', value: Math.round(bars.reduce((a, b) => a + b, 0) / bars.length), icon: <BarChart2 className="h-4 w-4 text-blue-500" /> },
          { label: 'Peak (12M)', value: Math.max(...bars), icon: <Activity className="h-4 w-4 text-amber-500" /> },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
            {k.icon}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-slate-500">{k.label}</div>
              <div className="text-xl font-black text-slate-800 font-mono">{k.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────

export interface DynamicModulePageProps {
  moduleName: string;
}

export const DynamicModulePage: React.FC<DynamicModulePageProps> = ({ moduleName }) => {
  // Normalise the name — sidebar items can have prefixes/different capitalisation
  const key = moduleName.toLowerCase().replace(/[^a-z]/g, '');

  switch (key) {
    case 'compliance':
    case 'compliancefindings':
      return <ComplianceModule />;
    case 'contractors':
      return <ContractorsModule />;
    case 'inspections':
      return <InspectionsModule />;
    case 'safety':
    case 'safetyoverview':
      return <SafetyModule />;
    case 'environment':
      return <EnvironmentModule />;
    case 'gismap':
    case 'riskheatmap':
    case 'minecomparison':
    case 'riskmap':
      return <GISMapModule />;
    case 'reports':
    case 'fieldreports':
    case 'safetyreports':
    case 'subsidiaryreports':
      return <ReportsModule />;
    case 'actions':
    case 'correctiveactions':
      return <ActionsModule />;
    default:
      return <AnalyticsFallback moduleName={moduleName} />;
  }
};

export default DynamicModulePage;
