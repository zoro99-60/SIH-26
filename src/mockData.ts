export interface MineComplianceRecord {
  id: string;
  mineName: string;
  location: string;
  lastInspectionDate: string;
  activeViolations: number;
  aiRiskScore: number; // Scale: 0 - 100
  subsidiary?: string;
  seamType?: string;
  lat: number;  // Geographic latitude
  lng: number;  // Geographic longitude
}

export const mockComplianceData: MineComplianceRecord[] = [
  {
    id: "MNE-JH-001",
    mineName: "Jharia Open Cast Pit 07",
    location: "Dhanbad, Jharkhand (BCCL)",
    lastInspectionDate: "2026-09-24",
    activeViolations: 3,
    aiRiskScore: 86, // High Risk (>80) -> Red
    subsidiary: "Bharat Coking Coal Ltd.",
    seamType: "Coking Coal - Seam IV",
    lat: 23.7537,
    lng: 86.4203
  },
  {
    id: "MNE-OR-014",
    mineName: "Talcher Deep Pit Colliery",
    location: "Angul, Odisha (MCL)",
    lastInspectionDate: "2026-09-18",
    activeViolations: 2,
    aiRiskScore: 72, // Medium Risk (50-80) -> Yellow
    subsidiary: "Mahanadi Coalfields Ltd.",
    seamType: "Thermal Coal - Bench 3",
    lat: 20.9517,
    lng: 85.2330
  },
  {
    id: "MNE-CH-008",
    mineName: "Gevra Mega Open Cast Mine",
    location: "Korba, Chhattisgarh (SECL)",
    lastInspectionDate: "2026-09-27",
    activeViolations: 0,
    aiRiskScore: 32, // Low Risk (<50) -> Green
    subsidiary: "South Eastern Coalfields",
    seamType: "Overburden Pit A",
    lat: 22.3595,
    lng: 82.7501
  },
  {
    id: "MNE-JH-004",
    mineName: "North Karnpura Sector 2",
    location: "Ranchi, Jharkhand (CCL)",
    lastInspectionDate: "2026-09-12",
    activeViolations: 4,
    aiRiskScore: 89, // High Risk (>80) -> Red
    subsidiary: "Central Coalfields Ltd.",
    seamType: "Incline Drift #2",
    lat: 23.9310,
    lng: 85.4600
  },
  {
    id: "MNE-WB-022",
    mineName: "Raniganj Underground Colliery",
    location: "Asansol, West Bengal (ECL)",
    lastInspectionDate: "2026-09-20",
    activeViolations: 1,
    aiRiskScore: 64, // Medium Risk (50-80) -> Yellow
    subsidiary: "Eastern Coalfields Ltd.",
    seamType: "Seam VII Incline",
    lat: 23.6103,
    lng: 87.0786
  },
  {
    id: "MNE-MP-005",
    mineName: "Singrauli Jayant Project",
    location: "Singrauli, MP (NCL)",
    lastInspectionDate: "2026-09-28",
    activeViolations: 0,
    aiRiskScore: 24, // Low Risk (<50) -> Green
    subsidiary: "Northern Coalfields Ltd.",
    seamType: "Heavy HEMM Corridor",
    lat: 24.1997,
    lng: 82.6700
  }
];

export interface SubsidiaryRecord {
  id: string;
  code: string;
  name: string;
  totalMines: number;
  avgRiskScore: number;
  activeViolations: number;
  mtdProduction: number; // In Million Tonnes (MT)
  mtdTarget: number;     // In Million Tonnes (MT)
  lat: number;
  lng: number;
}

export const mockSubsidiaryData: SubsidiaryRecord[] = [
  {
    id: "SUB-BCCL",
    code: "BCCL",
    name: "Bharat Coking Coal Ltd.",
    totalMines: 36,
    avgRiskScore: 78,
    activeViolations: 14,
    mtdProduction: 4.8,
    mtdTarget: 4.5,
    lat: 23.7537,
    lng: 86.4203
  },
  {
    id: "SUB-MCL",
    code: "MCL",
    name: "Mahanadi Coalfields Ltd.",
    totalMines: 42,
    avgRiskScore: 62,
    activeViolations: 8,
    mtdProduction: 12.4,
    mtdTarget: 11.8,
    lat: 20.9517,
    lng: 85.2330
  },
  {
    id: "SUB-NCL",
    code: "NCL",
    name: "Northern Coalfields Ltd.",
    totalMines: 28,
    avgRiskScore: 34,
    activeViolations: 3,
    mtdProduction: 10.2,
    mtdTarget: 9.8,
    lat: 24.1997,
    lng: 82.6700
  },
  {
    id: "SUB-SECL",
    code: "SECL",
    name: "South Eastern Coalfields Ltd.",
    totalMines: 54,
    avgRiskScore: 45,
    activeViolations: 7,
    mtdProduction: 14.1,
    mtdTarget: 15.0,
    lat: 22.3595,
    lng: 82.7501
  },
  {
    id: "SUB-CCL",
    code: "CCL",
    name: "Central Coalfields Ltd.",
    totalMines: 38,
    avgRiskScore: 82,
    activeViolations: 18,
    mtdProduction: 6.5,
    mtdTarget: 7.2,
    lat: 23.9310,
    lng: 85.4600
  },
  {
    id: "SUB-ECL",
    code: "ECL",
    name: "Eastern Coalfields Ltd.",
    totalMines: 31,
    avgRiskScore: 68,
    activeViolations: 11,
    mtdProduction: 5.2,
    mtdTarget: 5.0,
    lat: 23.6103,
    lng: 87.0786
  },
  {
    id: "SUB-WCL",
    code: "WCL",
    name: "Western Coalfields Ltd.",
    totalMines: 25,
    avgRiskScore: 56,
    activeViolations: 6,
    mtdProduction: 4.1,
    mtdTarget: 4.4,
    lat: 21.1458,
    lng: 79.0882
  }
];

