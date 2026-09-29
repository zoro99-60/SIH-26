export interface MineComplianceRecord {
  id: string;
  mineName: string;
  location: string;
  lastInspectionDate: string;
  activeViolations: number;
  aiRiskScore: number; // Scale: 0 - 100
  subsidiary?: string;
  seamType?: string;
  zone: 'Pit 07' | 'Overburden Dump' | 'Haul Road';
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
    zone: "Pit 07",
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
    zone: "Pit 07",
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
    zone: "Overburden Dump",
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
    zone: "Overburden Dump",
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
    zone: "Haul Road",
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
    zone: "Haul Road",
    lat: 24.1997,
    lng: 82.6700
  }
];
