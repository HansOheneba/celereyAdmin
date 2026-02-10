export type ClientStatus = "Active" | "Prospect" | "Inactive";
export type RiskProfile = "Conservative" | "Balanced" | "Growth";

export type Client = {
  id: string;
  fullName: string;
  email: string;
  location: string;
  status: ClientStatus;
  riskProfile: RiskProfile;
  aua: number; // Assets Under Advisement in USD
  lastContactedAt: string; // ISO date
};

export const CLIENTS: Client[] = [
  {
    id: "cl_001",
    fullName: "Ama Mensah",
    email: "ama.mensah@example.com",
    location: "Accra, Ghana",
    status: "Active",
    riskProfile: "Balanced",
    aua: 125000,
    lastContactedAt: "2026-02-02",
  },
  {
    id: "cl_002",
    fullName: "Kojo Owusu",
    email: "kojo.owusu@example.com",
    location: "Kumasi, Ghana",
    status: "Prospect",
    riskProfile: "Growth",
    aua: 35000,
    lastContactedAt: "2026-01-28",
  },
  {
    id: "cl_003",
    fullName: "Efua Asare",
    email: "efua.asare@example.com",
    location: "London, UK",
    status: "Inactive",
    riskProfile: "Conservative",
    aua: 8500,
    lastContactedAt: "2025-12-14",
  },
  {
    id: "cl_004",
    fullName: "James Wellington",
    email: "james.wellington@example.com",
    location: "Toronto, Canada",
    status: "Active",
    riskProfile: "Balanced",
    aua: 185000,
    lastContactedAt: "2026-02-01",
  },
  {
    id: "cl_005",
    fullName: "Marie Dubois",
    email: "marie.dubois@example.com",
    location: "Paris, France",
    status: "Active",
    riskProfile: "Growth",
    aua: 520000,
    lastContactedAt: "2026-02-03",
  },
  {
    id: "cl_006",
    fullName: "Sofia Martinez",
    email: "sofia.martinez@example.com",
    location: "Madrid, Spain",
    status: "Prospect",
    riskProfile: "Conservative",
    aua: 42000,
    lastContactedAt: "2026-01-25",
  },
  {
    id: "cl_007",
    fullName: "Yuki Tanaka",
    email: "yuki.tanaka@example.com",
    location: "Tokyo, Japan",
    status: "Active",
    riskProfile: "Growth",
    aua: 750000,
    lastContactedAt: "2026-02-02",
  },
  {
    id: "cl_008",
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    location: "Mumbai, India",
    status: "Active",
    riskProfile: "Balanced",
    aua: 98000,
    lastContactedAt: "2026-01-30",
  },
  {
    id: "cl_009",
    fullName: "Chen Wei",
    email: "chen.wei@example.com",
    location: "Shanghai, China",
    status: "Prospect",
    riskProfile: "Growth",
    aua: 325000,
    lastContactedAt: "2026-01-29",
  },
  {
    id: "cl_010",
    fullName: "Lucas Silva",
    email: "lucas.silva@example.com",
    location: "São Paulo, Brazil",
    status: "Inactive",
    riskProfile: "Balanced",
    aua: 15000,
    lastContactedAt: "2025-12-20",
  },
];
