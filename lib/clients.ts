export type ClientStatus = "Active" | "Prospect" | "Inactive";
export type RiskProfile = "Conservative" | "Balanced" | "Growth";
export type SubscriptionType = "Essentials" | "Core" | "Concierge";

// Note interface for client notes - simplified
export interface ClientNote {
  id: string;
  content: string;
  author: string; // Advisor name
  createdAt: string; // ISO date
}

// Communication history item
export interface Communication {
  id: string;
  type: "email" | "call" | "meeting" | "message";
  subject?: string;
  content: string;
  date: string; // ISO date
  direction: "inbound" | "outbound";
  duration?: number; // minutes, for calls/meetings
  participants?: string[];
  followUpRequired?: boolean;
  followUpDate?: string;
}

// Personal information similar to onboarding store
export interface PersonalData {
  // Basic info
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  dependents?: number;
  nationality?: string;

  // Contact info
  phone: string;
  address?: string;
  timeZone?: string;

  // Professional info
  occupation?: string;
  employer?: string;
  yearsAtJob?: number;
  industry?: string;
  annualIncome?: number;

  // Family information
  spouseName?: string;
  children?: Array<{
    name: string;
    age: number;
    relationship: "child" | "dependent";
  }>;
}

// Financial data similar to onboarding store
export interface FinancialData {
  // Income & Expenses
  primaryIncomeSource?: string;
  monthlyIncome?: number;
  monthlyExpenses?: number;

  // Assets
  cashSavings?: number;
  investmentPortfolio?: number;
  retirementAccounts?: number;
  realEstateValue?: number;
  otherAssets?: number;
  totalAssets?: number; // Calculated

  // Liabilities
  mortgageDebt?: number;
  studentLoans?: number;
  creditCardDebt?: number;
  personalLoans?: number;
  otherLiabilities?: number;
  totalLiabilities?: number; // Calculated

  // Asset Locations
  assetCountries?: string[];

  // Financial Preferences & Knowledge
  financialKnowledge?: "beginner" | "intermediate" | "advanced";
  financialGoals?: string[];
  investmentTimeframe?: "short" | "medium" | "long";
  riskTolerance?: "low" | "medium" | "high";
  emergencyFund?: "yes" | "no" | "partial";
  preferredCommunication?: "email" | "phone" | "video" | "in-person";

  // Calculated fields
  netWorth?: number;
  debtToAssetRatio?: number;
  monthlySavings?: number;

  // Investment preferences
  investmentTypes?: string[];
  ethicalInvesting?: boolean;
  geographicPreference?: string[];
}

// Client metadata
export interface ClientMetadata {
  advisor: string; // Assigned advisor
  referralSource?: string;
  joinedAt: string; // ISO date when client joined
  tags: string[];
  priority?: "low" | "medium" | "high" | "vip";
  lastReviewDate?: string;
  nextReviewDate?: string;

  // Billing info
  billingCycle?: "monthly" | "quarterly" | "annually";
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  paymentMethod?: string;
}

// Main Client interface
export interface Client {
  // Basic Info
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarColor?: string; // For avatar background

  // Location
  city?: string;
  country: string;
  region?: string;

  // Status & Classification
  status: ClientStatus;
  riskProfile: RiskProfile;
  subscriptionType: SubscriptionType;

  // Financial Metrics
  aua: number; // Assets Under Advisement in USD
  monthlyRetainer?: number; // Monthly fee

  // Dates
  lastContactedAt: string;
  createdAt: string; // When record was created

  // Extended Data (optional groups)
  personalData?: PersonalData;
  financialData?: FinancialData;
  metadata?: ClientMetadata;

  // Communications
  notes?: ClientNote[];
  communications?: Communication[];

  // Documents (references only - actual files would be in storage)
  googleDriveLink?: string; // Google Drive folder/file link for client documents
}

// Helper function to calculate financial metrics
export function calculateFinancialMetrics(client: Client): Client {
  if (!client.financialData) return client;

  const financialData = { ...client.financialData };

  // Calculate total assets
  financialData.totalAssets =
    (financialData.cashSavings || 0) +
    (financialData.investmentPortfolio || 0) +
    (financialData.retirementAccounts || 0) +
    (financialData.realEstateValue || 0) +
    (financialData.otherAssets || 0);

  // Calculate total liabilities
  financialData.totalLiabilities =
    (financialData.mortgageDebt || 0) +
    (financialData.studentLoans || 0) +
    (financialData.creditCardDebt || 0) +
    (financialData.personalLoans || 0) +
    (financialData.otherLiabilities || 0);

  // Calculate net worth
  financialData.netWorth =
    (financialData.totalAssets || 0) - (financialData.totalLiabilities || 0);

  // Calculate debt to asset ratio
  if (financialData.totalAssets && financialData.totalAssets > 0) {
    financialData.debtToAssetRatio =
      (financialData.totalLiabilities || 0) / financialData.totalAssets;
  }

  // Calculate monthly savings
  if (financialData.monthlyIncome && financialData.monthlyExpenses) {
    financialData.monthlySavings =
      financialData.monthlyIncome - financialData.monthlyExpenses;
  }

  return {
    ...client,
    financialData,
  };
}

// Sample extended clients data
export const CLIENTS: Client[] = [
  // Active Clients with full data
  {
    id: "cl_001",
    firstName: "Ama",
    lastName: "Mensah",
    email: "ama.mensah@example.com",
    avatarColor: "#2d1b4e",
    city: "Accra",
    country: "Ghana",
    region: "West Africa",
    status: "Active",
    riskProfile: "Balanced",
    subscriptionType: "Core",
    aua: 125000,
    monthlyRetainer: 300,
    lastContactedAt: "2026-02-02",
    createdAt: "2024-01-15",

    personalData: {
      dateOfBirth: "1985-03-15",
      gender: "Female",
      maritalStatus: "married",
      dependents: 2,
      nationality: "Ghanaian",
      phone: "+233 55 123 4567",
      address: "123 Independence Ave, Accra, Ghana",
      timeZone: "GMT",
      occupation: "Software Engineer",
      employer: "TechCorp Africa",
      yearsAtJob: 8,
      industry: "Technology",
      annualIncome: 180000,
      spouseName: "Kwame Mensah",
      children: [
        { name: "Akosua", age: 12, relationship: "child" },
        { name: "Kofi", age: 8, relationship: "child" },
      ],
    },

    financialData: {
      // Income & Expenses
      primaryIncomeSource: "Salary & Investments",
      monthlyIncome: 15000,
      monthlyExpenses: 8000,

      // Assets
      cashSavings: 75000,
      investmentPortfolio: 125000,
      retirementAccounts: 45000,
      realEstateValue: 350000,
      otherAssets: 25000,

      // Liabilities
      mortgageDebt: 180000,
      studentLoans: 0,
      creditCardDebt: 5000,
      personalLoans: 15000,
      otherLiabilities: 0,

      // Asset Locations
      assetCountries: ["Ghana", "USA", "UK"],

      // Financial Preferences
      financialKnowledge: "advanced",
      financialGoals: [
        "Retirement at 55",
        "Children's Education",
        "Real Estate Investment",
      ],
      investmentTimeframe: "long",
      riskTolerance: "medium",
      emergencyFund: "yes",
      preferredCommunication: "video",
      investmentTypes: ["Stocks", "Real Estate", "Bonds"],
      ethicalInvesting: true,
      geographicPreference: ["Africa", "North America"],
    },

    metadata: {
      advisor: "Sarah Johnson",
      referralSource: "Website",
      joinedAt: "2024-01-15",
      tags: ["High-Value", "Tech", "International", "Family"],
      priority: "high",
      lastReviewDate: "2025-12-15",
      nextReviewDate: "2026-03-15",
      billingCycle: "quarterly",
      lastPaymentDate: "2026-01-15",
      nextPaymentDate: "2026-04-15",
      paymentMethod: "Bank Transfer",
    },

    notes: [
      {
        id: "note_001",
        content:
          "Client expressed interest in expanding real estate portfolio. Recommended connecting with our property investment specialist.",
        author: "Sarah Johnson",
        createdAt: "2025-12-22",
      },
      {
        id: "note_002",
        content:
          "Follow up on tax optimization strategy next quarter. Client has complex international income streams.",
        author: "Sarah Johnson",
        createdAt: "2025-11-15",
      },
    ],

    communications: [
      {
        id: "comm_001",
        type: "meeting",
        subject: "Quarterly Portfolio Review",
        content:
          "Discussed current market conditions and rebalancing strategy. Client satisfied with performance.",
        date: "2026-02-02",
        direction: "outbound",
        duration: 45,
        participants: ["Sarah Johnson", "Ama Mensah"],
        followUpRequired: true,
        followUpDate: "2026-03-02",
      },
    ],

    googleDriveLink: "https://drive.google.com/drive/folders/abc123example",
  },

  // Prospect client (less data)
  {
    id: "cl_002",
    firstName: "Kojo",
    lastName: "Owusu",
    email: "kojo.owusu@example.com",
    avatarColor: "#15803d",
    city: "Kumasi",
    country: "Ghana",
    region: "West Africa",
    status: "Prospect",
    riskProfile: "Growth",
    subscriptionType: "Essentials",
    aua: 35000,
    lastContactedAt: "2026-01-28",
    createdAt: "2025-11-20",

    personalData: {
      dateOfBirth: "1990-07-22",
      gender: "Male",
      maritalStatus: "single",
      dependents: 0,
      nationality: "Ghanaian",
      phone: "+233 24 987 6543",
      timeZone: "GMT",
      occupation: "Entrepreneur",
      employer: "Owusu Enterprises",
      industry: "Agriculture",
      annualIncome: 75000,
    },

    financialData: {
      primaryIncomeSource: "Business Revenue",
      monthlyIncome: 6250,
      monthlyExpenses: 3500,
      cashSavings: 20000,
      investmentPortfolio: 15000,
      financialGoals: ["Business Expansion", "Wealth Building"],
      investmentTimeframe: "medium",
      riskTolerance: "high",
      emergencyFund: "partial",
    },

    metadata: {
      advisor: "David Chen",
      referralSource: "Referral - Ama Mensah",
      joinedAt: "2025-11-20",
      tags: ["Prospect", "Entrepreneur", "Local"],
      priority: "medium",
    },

    notes: [
      {
        id: "note_003",
        content:
          "Initial consultation went well. Client is interested in growth-focused investments. Send follow-up materials.",
        author: "David Chen",
        createdAt: "2026-01-28",
      },
    ],

    communications: [
      {
        id: "comm_002",
        type: "call",
        subject: "Initial Consultation",
        content:
          "Discussed investment options and risk tolerance. Client is eager to start.",
        date: "2026-01-28",
        direction: "outbound",
        duration: 30,
        participants: ["David Chen", "Kojo Owusu"],
        followUpRequired: true,
        followUpDate: "2026-02-05",
      },
    ],

    googleDriveLink: "",
  },

  // More clients with varying levels of data
  {
    id: "cl_004",
    firstName: "James",
    lastName: "Wellington",
    email: "james.wellington@example.com",
    avatarColor: "#0ea5e9",
    city: "Toronto",
    country: "Canada",
    region: "North America",
    status: "Active",
    riskProfile: "Balanced",
    subscriptionType: "Core",
    aua: 185000,
    monthlyRetainer: 450,
    lastContactedAt: "2026-02-01",
    createdAt: "2023-08-10",

    personalData: {
      dateOfBirth: "1978-11-30",
      gender: "Male",
      maritalStatus: "married",
      dependents: 3,
      nationality: "Canadian",
      phone: "+1 416 555 7890",
      address: "456 Bay Street, Toronto, ON",
      timeZone: "EST",
      occupation: "Finance Director",
      employer: "Bay Street Financial",
      yearsAtJob: 12,
      industry: "Finance",
      annualIncome: 220000,
      spouseName: "Elizabeth Wellington",
      children: [
        { name: "Michael", age: 15, relationship: "child" },
        { name: "Sophie", age: 12, relationship: "child" },
        { name: "Oliver", age: 8, relationship: "child" },
      ],
    },

    financialData: {
      primaryIncomeSource: "Salary & Bonus",
      monthlyIncome: 18333,
      monthlyExpenses: 9500,
      cashSavings: 120000,
      investmentPortfolio: 185000,
      retirementAccounts: 280000,
      realEstateValue: 850000,
      mortgageDebt: 450000,
      creditCardDebt: 8000,
      assetCountries: ["Canada", "USA"],
      financialKnowledge: "advanced",
      financialGoals: [
        "Early Retirement",
        "Children's University Fund",
        "Vacation Home",
      ],
      investmentTimeframe: "long",
      riskTolerance: "medium",
      emergencyFund: "yes",
      ethicalInvesting: true,
    },

    metadata: {
      advisor: "Michael Rodriguez",
      referralSource: "Professional Network",
      joinedAt: "2023-08-10",
      tags: ["High-Value", "Finance", "Family"],
      priority: "high",
      lastReviewDate: "2026-01-15",
      nextReviewDate: "2026-04-15",
      billingCycle: "monthly",
    },

    notes: [
      {
        id: "note_004",
        content:
          "Client requested analysis of education savings plans. Sent comparison of RESP options.",
        author: "Michael Rodriguez",
        createdAt: "2026-01-15",
      },
    ],

    communications: [
      {
        id: "comm_003",
        type: "email",
        subject: "Quarterly Performance Report",
        content:
          "Sent detailed performance report. Portfolio up 8.2% for the quarter.",
        date: "2026-02-01",
        direction: "outbound",
      },
    ],

    googleDriveLink: "https://drive.google.com/drive/folders/xyz789example",
  },

  // Minimal client
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
    createdAt: "2024-05-20",

    metadata: {
      advisor: "Unassigned",
      joinedAt: "2024-05-20",
      tags: ["Inactive", "Minimal"],
      priority: "low",
    },

    googleDriveLink: "",
  },
];

// Apply financial calculations to all clients
export const CLIENTS_WITH_CALCULATIONS = CLIENTS.map(calculateFinancialMetrics);

// Helper functions for client data
export function getClientFullName(client: Client): string {
  return `${client.firstName} ${client.lastName}`;
}

export function getClientInitials(client: Client): string {
  return `${client.firstName[0]}${client.lastName[0]}`.toUpperCase();
}

export function getClientById(id: string): Client | undefined {
  return CLIENTS_WITH_CALCULATIONS.find((client) => client.id === id);
}

export function getClientsByStatus(status: ClientStatus): Client[] {
  return CLIENTS_WITH_CALCULATIONS.filter((client) => client.status === status);
}

export function getClientsByAdvisor(advisor: string): Client[] {
  return CLIENTS_WITH_CALCULATIONS.filter(
    (client) => client.metadata?.advisor === advisor,
  );
}

export function getClientsByCountry(country: string): Client[] {
  return CLIENTS_WITH_CALCULATIONS.filter(
    (client) => client.country === country,
  );
}
