import React, { useState } from 'react';
import {
  HardHat,
  AlertTriangle,
  Map as MapIcon,
  FileText,
  Pickaxe,
  ShieldCheck,
  Bell,
  Activity,
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  AlertOctagon,
  Building2,
  Users,
  Download,
  ChevronRight,
  FileWarning,
  Clock,
  ClipboardCheck,
  Leaf,
  TrendingUp,
  Radio,
  WifiOff,
  Send,
} from 'lucide-react';
import { KpiCard } from '@/components/KpiCard';
import { ComplianceTable } from '@/components/ComplianceTable';
import { MineMap } from '@/components/MineMap';
import { HQDashboard } from '@/components/HQDashboard';
import { FieldInspectorView } from '@/components/FieldInspectorView';
import { SafetyOfficerView } from '@/components/SafetyOfficerView';

// Type definitions for data integrity
interface AlertItem {
  id: string;
  time: string;
  title: string;
  location: string;
  severity: 'critical' | 'warning' | 'advisory';
  details: string;
  actionRequired: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

// Role-based sidebar menu items configuration
const roleNavigationConfig: Record<string, MenuItem[]> = {
  'Mine Official': [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, badge: 'LIVE' },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck, badge: 'CMR 17' },
    { id: 'inspections', label: 'Inspections', icon: HardHat, badge: '2 Pending' },
    { id: 'contractors', label: 'Contractors', icon: Users },
    { id: 'gismap', label: 'GIS Map', icon: MapIcon, badge: 'LiDAR' },
    { id: 'reports', label: 'Reports', icon: FileText },
  ],
  'Corporate HQ': [
    { id: 'hq_dashboard', label: 'HQ Dashboard', icon: Activity, badge: 'HQ' },
    { id: 'production_analytics', label: 'Production Analytics', icon: TrendingUp, badge: 'MTD' },
    { id: 'subsidiary_reports', label: 'Subsidiary Reports', icon: Building2 },
    { id: 'governance', label: 'Governance Register', icon: FileText },
    { id: 'gismap_national', label: 'GIS National Map', icon: MapIcon, badge: 'India' },
  ],
  'Field Inspector': [
    { id: 'assigned_inspections', label: 'Assigned Work', icon: HardHat, badge: '4 Pending' },
    { id: 'inspection_logs', label: 'Inspection Logs', icon: ClipboardCheck },
    { id: 'telemetry_sensors', label: 'Telemetry Sensors', icon: Radio, badge: 'IoT' },
    { id: 'offline_queue', label: 'Offline Queue', icon: WifiOff, badge: 'Sync' },
    { id: 'field_reports', label: 'Field Reports', icon: FileText },
  ],
  'DGMS Inspector': [
    { id: 'assigned_inspections', label: 'Assigned Work', icon: HardHat, badge: '4 Pending' },
    { id: 'inspection_logs', label: 'Inspection Logs', icon: ClipboardCheck },
    { id: 'telemetry_sensors', label: 'Telemetry Sensors', icon: Radio, badge: 'IoT' },
    { id: 'offline_queue', label: 'Offline Queue', icon: WifiOff, badge: 'Sync' },
    { id: 'field_reports', label: 'Field Reports', icon: FileText },
  ],
  'Safety Officer': [
    { id: 'safety_command', label: 'Safety Command', icon: ShieldCheck, badge: 'ALERT' },
    { id: 'ai_hazard_feed', label: 'AI Hazard Feed', icon: AlertTriangle, badge: 'Top 5' },
    { id: 'marshal_dispatch', label: 'Marshal Dispatch', icon: Send },
    { id: 'incidents_archive', label: 'Incidents Archive', icon: CheckCircle2 },
    { id: 'safety_reports', label: 'Safety Reports', icon: FileText },
  ],
};

const App: React.FC = () => {
  // State for interactive command center controls & navigation
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [userRole, setUserRole] = useState<'Mine Official' | 'Corporate HQ' | 'Field Inspector' | 'Safety Officer'>('Mine Official');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);

  // Helper title generator for placeholder modules
  const getPlaceholderTitle = (page: string) => {
    if (page === 'Compliance') return 'Compliance Management';
    if (page === 'Inspections') return 'Inspections Management';
    if (page === 'Contractors') return 'Contractors Management';
    if (page === 'GIS Map' || page === 'GIS National Map') return 'GIS Map Overview';
    if (page === 'Reports' || page === 'Field Reports' || page === 'Safety Reports' || page === 'Subsidiary Reports') return 'Reports & Analytics';
    if (page === 'Production Analytics') return 'Production Analytics Dashboard';
    if (page === 'Governance Register') return 'Governance Register Overview';
    if (page === 'Inspection Logs') return 'Inspection Logs Audit';
    if (page === 'Telemetry Sensors') return 'Telemetry Sensors Real-time Monitor';
    if (page === 'Offline Queue') return 'Offline Sync Queue';
    if (page === 'AI Hazard Feed') return 'AI Hazard Detection Feed Details';
    if (page === 'Marshal Dispatch') return 'Marshal Dispatch Protocol';
    if (page === 'Incidents Archive') return 'Incidents Statutory Archive';
    return `${page} Module`;
  };

  const isDashboardPage =
    activePage === 'Dashboard' ||
    activePage === 'HQ Dashboard' ||
    activePage === 'Assigned Work' ||
    activePage === 'Safety Command';

  // Sample AI Alerts Data
  const alerts: AlertItem[] = [
    {
      id: 'ALT-1092',
      time: '10:42:15',
      title: 'CH₄ Methane Spike in Seam IV',
      location: 'Underground Incline #3 / Face 2B',
      severity: 'critical',
      details: 'Sensor S-24 detected 0.88% CH₄ (statutory ceiling: 0.75%). Automatic exhaust booster activated.',
      actionRequired: true,
    },
    {
      id: 'ALT-1091',
      time: '10:35:02',
      title: 'Haul Road Speed Violation',
      location: 'Haul Ramp #4 - South Bench',
      severity: 'warning',
      details: 'Dumper CAT-777D #14 tracked at 41 km/h in restricted 20 km/h loaded haul zone.',
      actionRequired: true,
    },
    {
      id: 'ALT-1089',
      time: '10:14:50',
      title: 'Slope Radar Micro-Displacement',
      location: 'Overburden Dump #2 (North Flank)',
      severity: 'warning',
      details: 'Piezometer P-09 detected 14mm heave post heavy precipitation. Factor of Safety dropped to 1.18.',
      actionRequired: false,
    },
    {
      id: 'ALT-1085',
      time: '09:48:33',
      title: 'Permit Expiring: High-Wall Blasting',
      location: 'Section 4 West Pit',
      severity: 'advisory',
      details: 'DGMS Explosives clearance window expires at 12:30 IST. Evacuation perimeter check required.',
      actionRequired: false,
    }
  ];

  const handleAcknowledge = (id: string) => {
    if (!acknowledgedAlerts.includes(id)) {
      setAcknowledgedAlerts([...acknowledgedAlerts, id]);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-sans">
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR: FIXED DARK CHARCOAL INDUSTRIAL COMMAND NAV */}
      {/* ========================================================================= */}
      <aside
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } transition-all duration-300 ease-in-out bg-[#1E293B] text-slate-300 flex flex-col shrink-0 border-r border-slate-700/60 z-30 select-none`}
      >
        {/* Brand & Mining Identity */}
        <div className="h-16 px-4 bg-[#0F172A] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded bg-[#F59E0B] text-[#0F172A] flex items-center justify-center font-black shadow-md shrink-0">
              <Pickaxe className="h-5 w-5 stroke-[2.5]" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm tracking-wider text-white uppercase truncate flex items-center gap-1.5">
                  COAL-GOV <span className="text-[#F59E0B] text-[10px] px-1 py-0.2 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40">PRO</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-tight truncate">
                  DGMS / CIL REG-NODE 07
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Mining Location Telemetry Pill */}
        {!isSidebarCollapsed && (
          <div className="p-3 bg-slate-900/60 border-b border-slate-700/40">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>MINE LEASE: ML-8924</span>
              <span className="inline-flex items-center gap-1 text-[#10B981]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">
              Jharia Colliery | Block IV Pit
            </div>
          </div>
        )}

        {/* Primary Industrial Navigation (Dynamic based on userRole) */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {(roleNavigationConfig[userRole] || roleNavigationConfig['Mine Official']).map((item, index) => {
            const Icon = item.icon;
            const menuList = roleNavigationConfig[userRole] || roleNavigationConfig['Mine Official'];
            const isActive = activeNav === item.id || (index === 0 && !menuList.some(m => m.id === activeNav));
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setActivePage(item.label);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#0F172A] text-[#F59E0B] border-l-4 border-[#F59E0B] shadow-inner font-semibold'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isSidebarCollapsed && item.badge && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                        : item.badge === 'ALERT' || item.badge === '4 Pending' || item.badge === '2 Pending'
                        ? 'bg-[#EF4444]/20 text-[#EF4444]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Safety Status Card */}
        <div className="p-3 border-t border-slate-700/80 bg-[#0F172A]">
          {!isSidebarCollapsed ? (
            <div className="bg-[#1E293B] border border-slate-700/60 rounded p-2.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">SHIFT B (Underground)</span>
                <span className="text-[#10B981] font-bold">STABLE</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#10B981] h-full w-[94.8%]" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Safe Man-Hours: 1,840h</span>
                <span className="text-[#F59E0B]">94.8%</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center text-[#10B981]" title="Shift B: Safe (94.8%)">
              <ShieldCheck className="h-5 w-5" />
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN APP SHELL: TOP HEADER & DATA-DENSE GRID */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header: Deep Charcoal (#1E293B) */}
        <header className="h-16 bg-[#1E293B] text-white border-b border-slate-700/80 px-6 flex items-center justify-between z-20 shadow-md">
          {/* Left Context: Mine name & Safety Alert Banner */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#F59E0B]" />
              <div>
                <span className="font-bold text-sm tracking-wide text-white block leading-tight">
                  Jharia Colliery — Open Cast & Pit 07
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  BCCL Coal India Ltd. • Statutory Sector: Zone 2
                </span>
              </div>
            </div>

            {/* Industrial Hazard Level Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-700 rounded text-xs font-mono">
              <span className="inline-block h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span className="text-slate-400">DGMS ALERT LEVEL:</span>
              <span className="text-[#F59E0B] font-bold">LEVEL-2 (SLOPE STABILITY WATCH)</span>
            </div>
          </div>

          {/* Right Controls: Role Switcher, Alerts Bell, User Profile */}
          <div className="flex items-center gap-4">
            {/* User Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded text-xs font-medium text-slate-200 transition-colors shadow-sm"
              >
                <span className="text-slate-400 font-mono text-[11px]">Viewing as:</span>
                <span className="font-bold text-[#F59E0B]">{userRole}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#1E293B] border border-slate-700 rounded-md shadow-2xl py-1 z-50 text-xs font-medium">
                  <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
                    Switch Governance Perspective
                  </div>
                  {[
                    'Mine Official',
                    'Corporate HQ',
                    'Field Inspector',
                    'Safety Officer',
                  ].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setUserRole(role as any);
                        const items = roleNavigationConfig[role] || [];
                        if (items.length > 0) {
                          setActiveNav(items[0].id);
                          setActivePage(items[0].label);
                        }
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-800 transition-colors flex items-center justify-between ${
                        userRole === role ? 'text-[#F59E0B] font-bold bg-slate-800/60' : 'text-slate-200'
                      }`}
                    >
                      <span>{role}</span>
                      {userRole === role && <CheckCircle2 className="h-3.5 w-3.5 text-[#F59E0B]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell with Safety Counter */}
            <div className="relative">
              <button
                className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded transition-colors relative"
                title="Active Safety Alerts"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white font-mono text-[10px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#1E293B]">
                  3
                </span>
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-700">
              <div className="h-8 w-8 rounded bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-xs text-[#F59E0B] ring-1 ring-slate-500">
                SC
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-200 leading-tight">Shri S. Chatterjee</div>
                <div className="text-[10px] text-slate-400 font-mono">Chief Mining Inspector</div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. MAIN CONTENT AREA: INDUSTRIAL COMMAND GRID (#F8FAFC) */}
        {/* ========================================================================= */}
        <main className="flex-1 overflow-y-auto p-5 bg-[#F8FAFC] space-y-5">
          {/* Sub-header Context Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#0F172A] uppercase flex items-center gap-2">
                Operational Safety & Compliance Overview
                <span className="text-xs font-mono font-medium text-slate-500 normal-case">
                  (Live Telemetry Sync: 10:44:08 IST)
                </span>
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Real-time statutory governance under Coal Mines Regulations (CMR 2017) & DGMS Directives.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-sm transition-colors">
                <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                Refresh Sensors
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-bold rounded text-xs shadow-sm transition-colors">
                <Download className="h-3.5 w-3.5" />
                Statutory Export (PDF)
              </button>
            </div>
          </div>

          {isDashboardPage ? (
            <>
              {userRole === 'Mine Official' && (
                <>
                  {/* --------------------------------------------------------------------- */}
                  {/* ROW 1: 5 KPI CARDS */}
                  {/* --------------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <KpiCard
                      title="Mine Compliance Score"
                      value="96.4%"
                      trend="up"
                      trendValue="+1.8% vs target"
                      icon={<ShieldCheck />}
                    />
                    <KpiCard
                      title="Critical Risks"
                      value="3"
                      trend="down"
                      trendValue="Requires immediate action"
                      icon={<AlertTriangle />}
                    />
                    <KpiCard
                      title="Open Violations"
                      value="12"
                      trend="up"
                      trendValue="-2 vs last week"
                      icon={<FileWarning />}
                    />
                    <KpiCard
                      title="Overdue Actions"
                      value="5"
                      trend="warning"
                      trendValue="Past deadline"
                      icon={<Clock />}
                    />
                    <KpiCard
                      title="Today's Inspections"
                      value="4"
                      trend="neutral"
                      trendValue="2 Pending, 2 Completed"
                      icon={<ClipboardCheck />}
                    />
                  </div>

                  {/* --------------------------------------------------------------------- */}
                  {/* ROW 2: REACT-LEAFLET MINE MAP (2/3) + AI ALERT FEED (1/3) */}
                  {/* --------------------------------------------------------------------- */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* MINE MAP — real Leaflet, dark tiles, risk markers */}
                    <MineMap className="lg:col-span-2" />

                    {/* AI ALERT FEED PANEL (1/3 Width) */}
                    <div className="bg-white rounded-md border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                      <div className="p-3 bg-[#1E293B] text-white flex items-center justify-between border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                          <span className="font-bold text-[#F59E0B] text-xs uppercase tracking-wider">
                            Critical Issues - Top 5 Immediate Attention
                          </span>
                        </div>
                        <span className="bg-[#EF4444] text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                          {alerts.length} ALERTS
                        </span>
                      </div>

                      {/* Alert Feed Scroll Area */}
                      <div className="p-3 flex-1 overflow-y-auto space-y-3 divide-y divide-slate-100 max-h-[440px]">
                        {alerts.slice(0, 5).map((alert) => {
                          const isAck = acknowledgedAlerts.includes(alert.id);
                          return (
                            <div key={alert.id} className="pt-3 first:pt-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`text-[10px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                      alert.severity === 'critical'
                                        ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                                        : alert.severity === 'warning'
                                        ? 'bg-[#F59E0B]/15 text-[#D97706] border border-[#F59E0B]/30'
                                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}
                                  >
                                    {alert.severity}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {alert.time}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {alert.id}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-[#0F172A] mt-1">
                                {alert.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                                <MapIcon className="h-3 w-3 text-slate-400" />
                                {alert.location}
                              </p>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                {alert.details}
                              </p>

                              <div className="mt-2.5 flex items-center gap-2">
                                {alert.actionRequired && (
                                  <button className="px-2.5 py-1 bg-[#1E293B] hover:bg-[#0F172A] text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1">
                                    Dispatch Marshal
                                  </button>
                                )}
                                <button
                                  onClick={() => handleAcknowledge(alert.id)}
                                  disabled={isAck}
                                  className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all ${
                                    isAck
                                      ? 'bg-[#10B981] text-white border-[#10B981] cursor-not-allowed'
                                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400'
                                  }`}
                                >
                                  {isAck ? '✅ Acknowledged' : 'Acknowledge'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                        <button className="text-xs font-bold text-[#1E293B] hover:text-[#F59E0B] flex items-center justify-center gap-1 mx-auto transition-colors">
                          View Complete AI Incident Log <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* --------------------------------------------------------------------- */}
                  {/* ROW 3: COMPLIANCE & STATUTORY DATA TABLE (using shadcn/ui Table) */}
                  {/* --------------------------------------------------------------------- */}
                  <ComplianceTable />

                  {/* --------------------------------------------------------------------- */}
                  {/* ROW 4: ENVIRONMENTAL WIDGET */}
                  {/* --------------------------------------------------------------------- */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-4 mt-5 mb-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Leaf className="h-4 w-4 text-[#10B981]" />
                      <h3 className="font-bold text-sm tracking-tight text-slate-900">
                        Environmental Monitoring (Real-time)
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex flex-col justify-center">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">PM10</div>
                        <div className="flex items-end gap-2">
                          <span className="text-lg font-black text-slate-800">45 <span className="text-xs font-semibold text-slate-500">µg/m³</span></span>
                          <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded-sm">Safe</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex flex-col justify-center">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">PM2.5</div>
                        <div className="flex items-end gap-2">
                          <span className="text-lg font-black text-slate-800">28 <span className="text-xs font-semibold text-slate-500">µg/m³</span></span>
                          <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded-sm">Safe</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 flex flex-col justify-center">
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Water pH</div>
                        <div className="flex items-end gap-2">
                          <span className="text-lg font-black text-slate-800">7.2</span>
                          <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded-sm">Normal</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex flex-col justify-center">
                        <div className="text-[10px] uppercase font-bold text-amber-700 mb-1 flex items-center gap-1">
                          Noise Level <AlertTriangle className="h-3 w-3" />
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-lg font-black text-amber-900">82 <span className="text-xs font-semibold text-amber-700/70">dB</span></span>
                          <span className="text-[10px] font-bold text-[#D97706] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-1.5 py-0.5 rounded-sm">Warning</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {userRole === 'Corporate HQ' && <HQDashboard />}

              {userRole === 'Field Inspector' && <FieldInspectorView />}

              {userRole === 'Safety Officer' && <SafetyOfficerView />}
            </>
          ) : (
            /* Placeholder view for non-dashboard navigation tabs */
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-xl border border-slate-200 shadow-sm mt-4 text-center min-h-[440px]">
              <div className="h-16 w-16 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#D97706] mb-4 shadow-sm">
                <Building2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {getPlaceholderTitle(activePage)}
              </h2>
              <p className="text-sm font-mono text-slate-500 mt-2 max-w-md">
                Feature under development for SIH 2026 Prototype
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <span>Module: {activePage} • CIL/DGMS Roadmap 2026</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
