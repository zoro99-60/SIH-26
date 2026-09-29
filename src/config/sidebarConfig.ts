import { ComponentType } from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  ShieldAlert,
  Leaf,
  Users,
  Map,
  CheckSquare,
  FileText,
  TrendingUp,
  Zap,
  HelpCircle,
  Settings,
  PlusCircle,
  Camera,
  Flame,
  Radio,
  RefreshCw,
  Send,
  UserCheck,
  Clock,
  WifiOff,
  BarChart2,
  PieChart,
  Activity
} from 'lucide-react';

export interface SidebarItem {
  name: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export type UserRoleKey =
  | 'Mine Official'
  | 'DGMS Inspector'
  | 'Corporate Management'
  | 'Field Inspector'
  | 'Safety Officer';

export const SIDEBAR_CONFIG: Record<UserRoleKey, SidebarSection[]> = {
  'Mine Official': [
    {
      title: 'WORKSPACE',
      items: [
        { name: 'Overview', path: '/overview', icon: LayoutDashboard },
        { name: 'Risk & Alerts', path: '/risk-alerts', icon: AlertTriangle },
        { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
        { name: 'Inspections', path: '/inspections', icon: ClipboardCheck },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Safety', path: '/safety', icon: ShieldAlert },
        { name: 'Environment', path: '/environment', icon: Leaf },
        { name: 'Contractors', path: '/contractors', icon: Users },
        { name: 'GIS Map', path: '/gis-map', icon: Map },
      ],
    },
    {
      title: 'FOLLOW-UP',
      items: [
        { name: 'Actions', path: '/actions', icon: CheckSquare },
        { name: 'Reports', path: '/reports', icon: FileText },
      ],
    },
  ],

  'DGMS Inspector': [
    {
      title: 'OVERSIGHT',
      items: [
        { name: 'Regulatory Overview', path: '/dgms/overview', icon: LayoutDashboard },
        { name: 'High-Risk Mines', path: '/dgms/high-risk-mines', icon: AlertTriangle },
        { name: 'Inspections', path: '/dgms/inspections', icon: ClipboardCheck },
        { name: 'Compliance Findings', path: '/dgms/compliance-findings', icon: ShieldCheck },
      ],
    },
    {
      title: 'INVESTIGATION',
      items: [
        { name: 'Accidents & Incidents', path: '/dgms/accidents-incidents', icon: Flame },
        { name: 'Repeat Violations', path: '/dgms/repeat-violations', icon: ShieldAlert },
        { name: 'Corrective Actions', path: '/dgms/corrective-actions', icon: CheckSquare },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { name: 'Mine Comparison', path: '/dgms/mine-comparison', icon: BarChart2 },
        { name: 'Risk Map', path: '/dgms/risk-map', icon: Map },
        { name: 'Reports', path: '/dgms/reports', icon: FileText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/dgms/settings', icon: Settings },
        { name: 'Help', path: '/dgms/help', icon: HelpCircle },
      ],
    },
  ],

  'Corporate Management': [
    {
      title: 'COMMAND CENTER',
      items: [
        { name: 'Portfolio Overview', path: '/corp/portfolio-overview', icon: LayoutDashboard },
        { name: 'Risk Intelligence', path: '/corp/risk-intelligence', icon: Zap },
        { name: 'Mine Comparison', path: '/corp/mine-comparison', icon: BarChart2 },
      ],
    },
    {
      title: 'PERFORMANCE',
      items: [
        { name: 'Production', path: '/corp/production', icon: TrendingUp },
        { name: 'Compliance', path: '/corp/compliance', icon: ShieldCheck },
        { name: 'Safety', path: '/corp/safety', icon: ShieldAlert },
        { name: 'Environment', path: '/corp/environment', icon: Leaf },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { name: 'Contractors', path: '/corp/contractors', icon: Users },
        { name: 'Corrective Actions', path: '/corp/corrective-actions', icon: CheckSquare },
        { name: 'Escalations', path: '/corp/escalations', icon: AlertTriangle },
        { name: 'Reports', path: '/corp/reports', icon: FileText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [{ name: 'Settings', path: '/corp/settings', icon: Settings }],
    },
  ],

  'Field Inspector': [
    {
      title: 'TODAY',
      items: [
        { name: 'My Tasks', path: '/field/my-tasks', icon: ClipboardCheck },
        { name: 'Nearby Risks', path: '/field/nearby-risks', icon: AlertTriangle },
        { name: 'My Inspections', path: '/field/my-inspections', icon: CheckSquare },
      ],
    },
    {
      title: 'FIELD ACTIONS',
      items: [
        { name: '+ New Inspection', path: '/field/new-inspection', icon: PlusCircle },
        { name: 'Report Hazard', path: '/field/report-hazard', icon: ShieldAlert },
        { name: 'Capture Evidence', path: '/field/capture-evidence', icon: Camera },
      ],
    },
    {
      title: 'FOLLOW-UP',
      items: [
        { name: 'Pending Actions', path: '/field/pending-actions', icon: Clock },
        { name: 'Offline Queue', path: '/field/offline-queue', icon: WifiOff },
      ],
    },
    {
      title: 'TOOLS',
      items: [
        { name: 'Mine Map', path: '/field/mine-map', icon: Map },
        { name: 'Sync Status', path: '/field/sync-status', icon: RefreshCw },
      ],
    },
  ],

  'Safety Officer': [
    {
      title: 'SAFETY CENTER',
      items: [
        { name: 'Safety Overview', path: '/safety-officer/overview', icon: ShieldCheck },
        { name: 'AI Hazard Feed', path: '/safety-officer/ai-hazard-feed', icon: Radio },
        { name: 'Critical Hazards', path: '/safety-officer/critical-hazards', icon: AlertTriangle },
      ],
    },
    {
      title: 'ANALYSIS',
      items: [
        { name: 'Near Misses', path: '/safety-officer/near-misses', icon: Activity },
        { name: 'Incidents', path: '/safety-officer/incidents', icon: Flame },
        { name: 'Recurring Hazards', path: '/safety-officer/recurring-hazards', icon: RefreshCw },
        { name: 'Risk Heatmap', path: '/safety-officer/risk-heatmap', icon: Map },
      ],
    },
    {
      title: 'ACTION',
      items: [
        { name: 'Dispatch Teams', path: '/safety-officer/dispatch-teams', icon: Send },
        { name: 'Corrective Actions', path: '/safety-officer/corrective-actions', icon: CheckSquare },
        { name: 'Closure Verification', path: '/safety-officer/closure-verification', icon: UserCheck },
      ],
    },
    {
      title: 'REPORTING',
      items: [
        { name: 'Safety Reports', path: '/safety-officer/reports', icon: FileText },
        { name: 'Trends', path: '/safety-officer/trends', icon: PieChart },
      ],
    },
  ],
};
