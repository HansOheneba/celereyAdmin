import {
  Client,
  ClientNote,
  Communication,
  CLIENTS_WITH_CALCULATIONS,
} from "./clients";

// Sort functions
export function sortClientsByAUA(
  clients: Client[],
  order: "asc" | "desc" = "desc",
): Client[] {
  return [...clients].sort((a, b) => {
    return order === "asc" ? a.aua - b.aua : b.aua - a.aua;
  });
}

export function sortClientsByLastContact(
  clients: Client[],
  order: "asc" | "desc" = "desc",
): Client[] {
  return [...clients].sort((a, b) => {
    const dateA = new Date(a.lastContactedAt).getTime();
    const dateB = new Date(b.lastContactedAt).getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}

export function sortClientsByName(
  clients: Client[],
  order: "asc" | "desc" = "asc",
): Client[] {
  return [...clients].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    return order === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
}

// Filter functions
export function filterClientsByRiskProfile(
  clients: Client[],
  riskProfile: string[],
): Client[] {
  if (riskProfile.length === 0) return clients;
  return clients.filter((client) => riskProfile.includes(client.riskProfile));
}

export function filterClientsBySubscription(
  clients: Client[],
  subscription: string[],
): Client[] {
  if (subscription.length === 0) return clients;
  return clients.filter((client) =>
    subscription.includes(client.subscriptionType),
  );
}

export function filterClientsByCountry(
  clients: Client[],
  countries: string[],
): Client[] {
  if (countries.length === 0) return clients;
  return clients.filter((client) => countries.includes(client.country));
}

export function filterClientsByStatus(
  clients: Client[],
  statuses: string[],
): Client[] {
  if (statuses.length === 0) return clients;
  return clients.filter((client) => statuses.includes(client.status));
}

export function filterClientsByAUARange(
  clients: Client[],
  min: number = 0,
  max: number = Infinity,
): Client[] {
  return clients.filter((client) => client.aua >= min && client.aua <= max);
}

export function filterClientsByDateRange(
  clients: Client[],
  startDate: string,
  endDate: string,
): Client[] {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  return clients.filter((client) => {
    const clientDate = new Date(client.lastContactedAt).getTime();
    return clientDate >= start && clientDate <= end;
  });
}

// Search function
export function searchClients(clients: Client[], query: string): Client[] {
  const q = query.toLowerCase().trim();
  if (!q) return clients;

  return clients.filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const email = client.email.toLowerCase();
    const city = client.city?.toLowerCase() || "";
    const country = client.country.toLowerCase();
    const occupation = client.personalData?.occupation?.toLowerCase() || "";

    return (
      fullName.includes(q) ||
      email.includes(q) ||
      city.includes(q) ||
      country.includes(q) ||
      occupation.includes(q)
    );
  });
}

// Data aggregation functions
export function calculateTotalAUA(clients: Client[]): number {
  return clients.reduce((total, client) => total + client.aua, 0);
}

export function getAverageAUA(clients: Client[]): number {
  if (clients.length === 0) return 0;
  return calculateTotalAUA(clients) / clients.length;
}

export function getClientDistributionByCountry(
  clients: Client[],
): Record<string, number> {
  return clients.reduce(
    (acc, client) => {
      acc[client.country] = (acc[client.country] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

export function getClientDistributionByStatus(
  clients: Client[],
): Record<string, number> {
  return clients.reduce(
    (acc, client) => {
      acc[client.status] = (acc[client.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

// Note management - simplified
export function addClientNote(
  client: Client,
  content: string,
  author: string,
): Client {
  const newNote: ClientNote = {
    id: `note_${Date.now()}`,
    content,
    author,
    createdAt: new Date().toISOString(),
  };

  return {
    ...client,
    notes: [...(client.notes || []), newNote],
  };
}

export function deleteClientNote(client: Client, noteId: string): Client {
  return {
    ...client,
    notes: client.notes?.filter((note) => note.id !== noteId) || [],
  };
}

// Communication management
export function addClientCommunication(
  client: Client,
  type: Communication["type"],
  content: string,
  direction: Communication["direction"],
  subject?: string,
  duration?: number,
): Client {
  const newCommunication: Communication = {
    id: `comm_${Date.now()}`,
    type,
    content,
    direction,
    subject,
    duration,
    date: new Date().toISOString(),
  };

  return {
    ...client,
    communications: [...(client.communications || []), newCommunication],
    lastContactedAt: new Date().toISOString(),
  };
}

// Get all clients (with calculations applied)
export function getAllClients(): Client[] {
  return CLIENTS_WITH_CALCULATIONS;
}

// Format currency helper (can be moved to a separate utils file)
export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date helper
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", { ...defaultOptions, ...options });
}

// Calculate time since last contact
export function getTimeSinceLastContact(client: Client): string {
  const lastContact = new Date(client.lastContactedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastContact.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} day(s) ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s) ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month(s) ago`;
  return `${Math.floor(diffDays / 365)} year(s) ago`;
}
