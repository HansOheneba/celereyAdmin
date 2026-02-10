export type ClientStatus = "Active" | "Prospect" | "Inactive";
export type RiskProfile = "Conservative" | "Balanced" | "Growth";
export type SubscriptionType = "Essentials" | "Core" | "Concierge";

export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  country: string;
  status: ClientStatus;
  riskProfile: RiskProfile;
  subscriptionType: SubscriptionType;
  aua: number; // Assets Under Advisement in USD
  lastContactedAt: string; // ISO date
};

export const CLIENTS: Client[] = [
  {
    id: "cl_001",
    firstName: "Ama",
    lastName: "Mensah",
    email: "ama.mensah@example.com",
    city: "Accra",
    country: "Ghana",
    status: "Active",
    riskProfile: "Balanced",
    subscriptionType: "Core",
    aua: 125000,
    lastContactedAt: "2026-02-02",
  },
  {
    id: "cl_002",
    firstName: "Kojo",
    lastName: "Owusu",
    email: "kojo.owusu@example.com",
    city: "Kumasi",
    country: "Ghana",
    status: "Prospect",
    riskProfile: "Growth",
    subscriptionType: "Essentials",
    aua: 35000,
    lastContactedAt: "2026-01-28",
  },
  {
    id: "cl_003",
    firstName: "Efua",
    lastName: "Asare",
    email: "efua.asare@example.com",
    city: "London",
    country: "UK",
    status: "Inactive",
    riskProfile: "Conservative",
    subscriptionType: "Essentials",
    aua: 8500,
    lastContactedAt: "2025-12-14",
  },
  {
    id: "cl_004",
    firstName: "James",
    lastName: "Wellington",
    email: "james.wellington@example.com",
    city: "Toronto",
    country: "Canada",
    status: "Active",
    riskProfile: "Balanced",
    subscriptionType: "Core",
    aua: 185000,
    lastContactedAt: "2026-02-01",
  },
  {
    id: "cl_005",
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@example.com",
    city: "Paris",
    country: "France",
    status: "Active",
    riskProfile: "Growth",
    subscriptionType: "Concierge",
    aua: 520000,
    lastContactedAt: "2026-02-03",
  },
  {
    id: "cl_006",
    firstName: "Sofia",
    lastName: "Martinez",
    email: "sofia.martinez@example.com",
    city: "Madrid",
    country: "Spain",
    status: "Prospect",
    riskProfile: "Conservative",
    subscriptionType: "Essentials",
    aua: 42000,
    lastContactedAt: "2026-01-25",
  },
  {
    id: "cl_007",
    firstName: "Yuki",
    lastName: "Tanaka",
    email: "yuki.tanaka@example.com",
    city: "Tokyo",
    country: "Japan",
    status: "Active",
    riskProfile: "Growth",
    subscriptionType: "Concierge",
    aua: 750000,
    lastContactedAt: "2026-02-02",
  },
  {
    id: "cl_008",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    city: "Mumbai",
    country: "India",
    status: "Active",
    riskProfile: "Balanced",
    subscriptionType: "Core",
    aua: 98000,
    lastContactedAt: "2026-01-30",
  },
  {
    id: "cl_009",
    firstName: "Chen",
    lastName: "Wei",
    email: "chen.wei@example.com",
    city: "Shanghai",
    country: "China",
    status: "Prospect",
    riskProfile: "Growth",
    subscriptionType: "Core",
    aua: 325000,
    lastContactedAt: "2026-01-29",
  },
  {
    id: "cl_010",
    firstName: "Lucas",
    lastName: "Silva",
    email: "lucas.silva@example.com",
    city: "São Paulo",
    country: "Brazil",
    status: "Inactive",
    riskProfile: "Balanced",
    subscriptionType: "Essentials",
    aua: 15000,
    lastContactedAt: "2025-12-20",
  },
];
