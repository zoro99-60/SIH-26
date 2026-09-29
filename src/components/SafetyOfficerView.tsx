import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Radio,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Send,
  X,
  Check,
  Bell,
  Activity,
  ChevronRight
} from 'lucide-react';

export interface SafetyAlert {
  id: string;
  time: string;
  title: string;
  location: string;
  severity: 'critical' | 'warning' | 'advisory';
  details: string;
  actionRequired: boolean;
  status: 'Pending Action' | 'Dispatched' | 'Resolved';
  assignedPersonnel?: string;
  deadline?: string;
}

export const SafetyOfficerView: React.FC = () => {
  // Filter state: 'All Alerts' | 'Critical' | 'Pending Action' | 'Resolved'
  const [filter, setFilter] = useState<'All Alerts' | 'Critical' | 'Pending Action' | 'Resolved'>('All Alerts');

  // Dispatch modal state
  const [dispatchAlert, setDispatchAlert] = useState<SafetyAlert | null>(null);
  const [assignedPersonnel, setAssignedPersonnel] = useState('Marshal Inspector R. Sharma');
  const [deadline, setDeadline] = useState('Immediate (15 mins)');
  const [dispatchNotes, setDispatchNotes] = useState('');

  // Toast alert feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial AI Hazard Feed alerts
  const [alerts, setAlerts] = useState<SafetyAlert[]>([
    {
      id: 'ALT-1092',
      time: '10:42:15',
      title: 'CH₄ Methane Spike in Seam IV',
      location: 'Underground Incline #3 / Face 2B',
      severity: 'critical',
      details: 'Sensor S-24 detected 0.88% CH₄ (statutory ceiling: 0.75%). Automatic exhaust booster activated.',
      actionRequired: true,
      status: 'Pending Action',
    },
    {
      id: 'ALT-1091',
      time: '10:35:02',
      title: 'Haul Road Speed Violation',
      location: 'Haul Ramp #4 - South Bench',
      severity: 'warning',
      details: 'Dumper CAT-777D #14 tracked at 41 km/h in restricted 20 km/h loaded haul zone.',
      actionRequired: true,
      status: 'Pending Action',
    },
    {
      id: 'ALT-1089',
      time: '10:14:50',
      title: 'Slope Radar Micro-Displacement',
      location: 'Overburden Dump #2 (North Flank)',
      severity: 'warning',
      details: 'Piezometer P-09 detected 14mm heave post heavy precipitation. Factor of Safety dropped to 1.18.',
      actionRequired: false,
      status: 'Pending Action',
    },
    {
      id: 'ALT-1085',
      time: '09:48:33',
      title: 'Permit Expiring: High-Wall Blasting',
      location: 'Section 4 West Pit',
      severity: 'advisory',
      details: 'DGMS Explosives clearance window expires at 12:30 IST. Evacuation perimeter check required.',
      actionRequired: false,
      status: 'Pending Action',
    },
    {
      id: 'ALT-1078',
      time: '08:15:00',
      title: 'Conveyor Belt Overheating - Zone 2B',
      location: 'Coal Handling Plant #1',
      severity: 'critical',
      details: 'Thermal IR camera registered 84°C on drive pulley bearing. Lubrication failure suspected.',
      actionRequired: true,
      status: 'Dispatched',
      assignedPersonnel: 'Rescue Unit Alpha',
      deadline: 'Within 30 mins',
    },
    {
      id: 'ALT-1065',
      time: '07:30:12',
      title: 'Dust Suppression Sprinkler Malfunction',
      location: 'Crusher Node 3 - West Pit',
      severity: 'warning',
      details: 'Pressure sensor dropped below 1.2 bar. Dust PM10 telemetry spiking to 120 µg/m³.',
      actionRequired: false,
      status: 'Resolved',
      assignedPersonnel: 'Tech Team B',
      deadline: 'Resolved 08:45 IST',
    },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handle Dispatch submit
  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchAlert) return;

    setAlerts(prev =>
      prev.map(item => {
        if (item.id === dispatchAlert.id) {
          return {
            ...item,
            status: 'Dispatched',
            assignedPersonnel,
            deadline,
          };
        }
        return item;
      })
    );

    triggerToast(`Marshal dispatched for ${dispatchAlert.id} → ${assignedPersonnel}`);
    setDispatchAlert(null);
    setDispatchNotes('');
  };

  // Handle Acknowledge -> Move to Resolved
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: 'Resolved',
          };
        }
        return item;
      })
    );
    triggerToast(`Alert ${id} marked as RESOLVED`);
  };

  // Filter logic
  const filteredAlerts = alerts.filter(item => {
    if (filter === 'All Alerts') return true;
    if (filter === 'Critical') return item.severity === 'critical';
    if (filter === 'Pending Action') return item.status === 'Pending Action' || item.status === 'Dispatched';
    if (filter === 'Resolved') return item.status === 'Resolved';
    return true;
  });

  const activePendingAlerts = alerts.filter(a => a.status !== 'Resolved');
  const resolvedAlerts = alerts.filter(a => a.status === 'Resolved');
  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* --------------------------------------------------------------------- */}
      {/* TOP HEADER: SAFETY OFFICER COMMAND BANNER */}
      {/* --------------------------------------------------------------------- */}
      <div className="bg-[#1E293B] text-white rounded-xl p-5 border border-slate-700 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#EF4444]/20 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444]">
            <Radio className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
              Safety Officer Command Center
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#EF4444] text-white font-bold">
                REAL-TIME HAZARD PROTOCOL
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Automated AI Computer Vision & IoT Sensor Telemetry Dispatch System
            </p>
          </div>
        </div>

        {/* Quick Metric Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-md">
            <span className="text-slate-400 block text-[10px]">CRITICAL RISKS</span>
            <span className="text-base font-extrabold text-[#EF4444]">{criticalCount} Active</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-md">
            <span className="text-slate-400 block text-[10px]">DISPATCHED MARSHALS</span>
            <span className="text-base font-extrabold text-[#F59E0B]">
              {alerts.filter(a => a.status === 'Dispatched').length} Units
            </span>
          </div>
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-md">
            <span className="text-slate-400 block text-[10px]">RESOLVED TODAY</span>
            <span className="text-base font-extrabold text-[#10B981]">{resolvedAlerts.length} Alerts</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-[#10B981] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* MAIN LAYOUT: 2/3 AI FEED + 1/3 WORKFLOW SUMMARY */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* =================================================================== */}
        {/* LEFT 2/3: AI HAZARD DETECTION FEED & FILTER BAR */}
        {/* =================================================================== */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Status Filter Bar Above Feed */}
          <div className="bg-white rounded-lg border border-slate-200 p-2 shadow-sm flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['All Alerts', 'Critical', 'Pending Action', 'Resolved'] as const).map(tab => {
                const count =
                  tab === 'All Alerts'
                    ? alerts.length
                    : tab === 'Critical'
                    ? alerts.filter(a => a.severity === 'critical').length
                    : tab === 'Pending Action'
                    ? activePendingAlerts.length
                    : resolvedAlerts.length;

                const isActive = filter === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#1E293B] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-[#F59E0B] text-[#0F172A]'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-[10px] font-mono text-slate-400 px-2 hidden sm:inline">
              LIVE TELEMETRY STREAM
            </span>
          </div>

          {/* AI Hazard Detection Feed */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-[#1E293B] text-white border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
                <h2 className="font-extrabold text-sm uppercase tracking-wider">
                  AI Hazard Detection Feed & Telemetry Logs
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Showing {filteredAlerts.length} incident entries
              </span>
            </div>

            <div className="p-4 space-y-4 divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
              {filteredAlerts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-mono text-xs">
                  No alerts match the selected filter criteria.
                </div>
              ) : (
                filteredAlerts.map(alert => {
                  const isResolved = alert.status === 'Resolved';
                  const isDispatched = alert.status === 'Dispatched';

                  return (
                    <div key={alert.id} className="pt-4 first:pt-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          {/* Severity Pill */}
                          <span
                            className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                              alert.severity === 'critical'
                                ? 'bg-red-100 text-red-700 border-red-300'
                                : alert.severity === 'warning'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-slate-100 text-slate-600 border-slate-300'
                            }`}
                          >
                            {alert.severity}
                          </span>

                          {/* Status Pill */}
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              isResolved
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : isDispatched
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-slate-100 text-slate-700 border border-slate-300'
                            }`}
                          >
                            {isResolved ? '✅ RESOLVED' : isDispatched ? '🚀 DISPATCHED' : '⏳ PENDING ACTION'}
                          </span>

                          <span className="text-[11px] font-mono text-slate-400">
                            {alert.time} IST
                          </span>
                        </div>

                        <span className="text-xs font-mono font-bold text-slate-400">
                          {alert.id}
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-[#0F172A]">
                        {alert.title}
                      </h3>

                      <p className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {alert.location}
                      </p>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                        {alert.details}
                      </p>

                      {/* Dispatched Info Banner if applicable */}
                      {isDispatched && alert.assignedPersonnel && (
                        <div className="mt-2.5 p-2 bg-amber-50 border border-amber-200 rounded text-xs font-mono text-amber-900 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Users className="h-3.5 w-3.5 text-amber-700" />
                            Assigned: {alert.assignedPersonnel}
                          </span>
                          <span className="flex items-center gap-1 text-amber-800 font-semibold">
                            <Clock className="h-3.5 w-3.5" /> Deadline: {alert.deadline}
                          </span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {!isResolved && (
                          <>
                            <button
                              onClick={() => setDispatchAlert(alert)}
                              className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <Send className="h-3.5 w-3.5 text-[#F59E0B]" />
                              {isDispatched ? 'Re-dispatch Marshal' : 'Dispatch Marshal'}
                            </button>

                            <button
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Acknowledge & Mark Resolved
                            </button>
                          </>
                        )}

                        {isResolved && (
                          <div className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1 py-1">
                            <Check className="h-4 w-4 stroke-[3]" /> Incident archived in statutory safety log
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT 1/3: WORKFLOW AUTOMATION & RESOLVED ALERTS SECTION */}
        {/* =================================================================== */}
        <div className="space-y-4">
          
          {/* Quick Workflow Automation Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="h-5 w-5 text-[#10B981]" />
              <h3 className="font-extrabold text-sm uppercase text-slate-800">
                Safety Protocol Automation
              </h3>
            </div>

            <div className="space-y-2 text-xs font-sans">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-800">Auto-Ventilation Booster</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Triggers automatically if CH4 &gt; 0.75%. Currently STABLE.
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="font-bold text-slate-800">Marshal Broadcast Channel</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Direct Push Alerts sent to DGMS Marshal radios on channel #4.
                </div>
              </div>
            </div>
          </div>

          {/* Resolved Alerts Archive Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-emerald-950 text-emerald-300 border-b border-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-white">
                  Resolved Alerts ({resolvedAlerts.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded">
                ARCHIVED
              </span>
            </div>

            <div className="p-3 space-y-2.5 max-h-[380px] overflow-y-auto">
              {resolvedAlerts.length === 0 ? (
                <div className="text-center text-slate-400 text-xs font-mono py-6">
                  No resolved alerts in this session yet.
                </div>
              ) : (
                resolvedAlerts.map(item => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950">{item.title}</span>
                      <span className="font-mono text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        {item.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-mono">📍 {item.location}</div>
                    <div className="text-[10px] text-emerald-800 font-mono font-bold flex items-center gap-1 pt-1 border-t border-emerald-200">
                      <Check className="h-3 w-3" /> Resolved & Cleared from Active Watch
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* DISPATCH MARSHAL DIALOG (MODAL) */}
      {/* --------------------------------------------------------------------- */}
      {dispatchAlert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#1E293B] text-white px-5 py-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <Send className="h-5 w-5 text-[#F59E0B]" />
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wide">
                    Dispatch Marshal Protocol
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Incident ID: {dispatchAlert.id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDispatchAlert(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Target Alert Summary */}
            <div className="bg-slate-900 text-slate-200 p-3.5 border-b border-slate-800 text-xs font-mono space-y-1">
              <div className="font-bold text-[#F59E0B] text-sm">{dispatchAlert.title}</div>
              <div className="text-slate-400 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {dispatchAlert.location}
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleConfirmDispatch} className="p-5 space-y-4">
              {/* Assigned Personnel */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                  Assigned Personnel / Response Unit
                </label>
                <select
                  value={assignedPersonnel}
                  onChange={e => setAssignedPersonnel(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="Marshal Inspector R. Sharma">Marshal Inspector R. Sharma (Zone 2)</option>
                  <option value="Quick Response Team Alpha">Quick Response Team Alpha (Underground)</option>
                  <option value="Safety Officer K. Singh">Safety Officer K. Singh (Open Cast)</option>
                  <option value="Ventilation Engineering Team">Ventilation Engineering Team (Seam 4)</option>
                  <option value="HEMM Fleet Marshal Team">HEMM Fleet Marshal Team (Haul Roads)</option>
                </select>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                  Target Resolution Deadline
                </label>
                <select
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                >
                  <option value="Immediate (15 mins)">Immediate (Within 15 mins)</option>
                  <option value="Within 30 mins">Within 30 mins</option>
                  <option value="Within 1 Hour">Within 1 Hour</option>
                  <option value="End of Shift (16:00 IST)">End of Shift (16:00 IST)</option>
                </select>
              </div>

              {/* Dispatch Instructions */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                  Dispatch Instructions / Emergency Directives
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter specific instructions for field marshal..."
                  value={dispatchNotes}
                  onChange={e => setDispatchNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDispatchAlert(null)}
                  className="w-1/3 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#1E293B] hover:bg-[#0F172A] text-white font-extrabold text-xs rounded-lg transition-colors shadow flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5 text-[#F59E0B]" />
                  Confirm & Dispatch Marshal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyOfficerView;
