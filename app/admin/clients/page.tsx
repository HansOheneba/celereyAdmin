"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Search,
  X,
  ChevronDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  CLIENTS,
  type ClientStatus,
  type RiskProfile,
  type SubscriptionType,
} from "@/lib/clients";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatAUA(aua: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(aua);
}

function StatusBadge({ status }: { status: ClientStatus }) {
  const variant =
    status === "Active"
      ? "default"
      : status === "Prospect"
        ? "secondary"
        : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}

function RiskBadge({ risk }: { risk: RiskProfile }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
      {risk}
    </span>
  );
}

function SubscriptionBadge({
  subscription,
}: {
  subscription: SubscriptionType;
}) {
  const variants = {
    Essentials: "bg-blue-100 text-blue-800",
    Core: "bg-purple-100 text-purple-800",
    Concierge: "bg-amber-100 text-amber-800",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variants[subscription]}`}
    >
      {subscription}
    </span>
  );
}

export default function ClientsPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(
    [],
  );
  const [selectedSubscriptions, setSelectedSubscriptions] = React.useState<
    SubscriptionType[]
  >([]);
  const [selectedLastContact, setSelectedLastContact] = React.useState<
    string | null
  >(null);
  const [lastContactSort, setLastContactSort] = React.useState<
    "asc" | "desc" | null
  >(null);
  const [selectedAUARange, setSelectedAUARange] = React.useState<string | null>(
    null,
  );
  const [auaSort, setAuaSort] = React.useState<"asc" | "desc" | null>(null);

  // Extract unique countries from CLIENTS data
  const countries = React.useMemo(() => {
    const allCountries = CLIENTS.map((c) => {
      const parts = c.location.split(",");
      return parts[parts.length - 1]?.trim();
    }).filter((c): c is string => !!c);

    return [...new Set(allCountries)].sort();
  }, []);

  const subscriptionTypes: SubscriptionType[] = [
    "Essentials",
    "Core",
    "Concierge",
  ];

  const lastContactRanges = React.useMemo(
    () => [
      { label: "Last 7 days", days: 7 },
      { label: "Last 30 days", days: 30 },
      { label: "Last 90 days", days: 90 },
    ],
    [],
  );

  const auaRanges = React.useMemo(
    () => [
      { label: "Under $50k", min: 0, max: 50000 },
      { label: "$50k - $250k", min: 50000, max: 250000 },
      { label: "$250k - $500k", min: 250000, max: 500000 },
      { label: "Over $500k", min: 500000, max: Infinity },
    ],
    [],
  );

  const filtered = React.useMemo(() => {
    const results = CLIENTS.filter((c) => {
      const q = query.trim().toLowerCase();
      const now = new Date();

      // Text search
      if (q) {
        const matchesQuery =
          c.fullName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.status.toLowerCase().includes(q) ||
          c.riskProfile.toLowerCase().includes(q) ||
          c.subscriptionType.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Country filter
      if (selectedCountries.length > 0) {
        const clientCountry = c.location.split(",").pop()?.trim();
        if (!clientCountry || !selectedCountries.includes(clientCountry))
          return false;
      }

      // Subscription filter
      if (selectedSubscriptions.length > 0) {
        if (!selectedSubscriptions.includes(c.subscriptionType)) return false;
      }

      // Last Contact filter
      if (selectedLastContact) {
        const range = lastContactRanges.find(
          (r) => r.label === selectedLastContact,
        );
        if (range) {
          const contactDate = new Date(c.lastContactedAt);
          const daysDifference = Math.floor(
            (now.getTime() - contactDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          if (daysDifference > range.days) return false;
        }
      }

      // AUA Range filter
      if (selectedAUARange) {
        const range = auaRanges.find((r) => r.label === selectedAUARange);
        if (range && (c.aua < range.min || c.aua > range.max)) return false;
      }

      return true;
    });

    // Apply sorting
    if (lastContactSort) {
      results.sort((a, b) => {
        const dateA = new Date(a.lastContactedAt).getTime();
        const dateB = new Date(b.lastContactedAt).getTime();
        return lastContactSort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    if (auaSort) {
      results.sort((a, b) => {
        return auaSort === "asc" ? a.aua - b.aua : b.aua - a.aua;
      });
    }

    return results;
  }, [
    query,
    selectedCountries,
    selectedSubscriptions,
    selectedLastContact,
    lastContactSort,
    selectedAUARange,
    auaSort,
    auaRanges,
    lastContactRanges,
  ]);

  const hasActiveFilters =
    selectedCountries.length > 0 ||
    selectedSubscriptions.length > 0 ||
    selectedLastContact ||
    selectedAUARange ||
    lastContactSort ||
    auaSort;

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedSubscriptions([]);
    setSelectedLastContact(null);
    setLastContactSort(null);
    setSelectedAUARange(null);
    setAuaSort(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
 
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, location…"
              className="pl-9"
            />
          </div>

          <Button asChild>
            <Link href="/admin/clients/new">Add client</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Country Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                Country
                <ChevronDown className="h-4 w-4 opacity-50" />
                {selectedCountries.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedCountries.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Country</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {countries.map((country) => (
                <DropdownMenuCheckboxItem
                  key={country}
                  checked={selectedCountries.includes(country)}
                  onCheckedChange={(checked) => {
                    setSelectedCountries((prev) =>
                      checked
                        ? [...prev, country]
                        : prev.filter((c) => c !== country),
                    );
                  }}
                >
                  {country}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedCountries.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setSelectedCountries([])}
                    className="text-sm text-muted-foreground justify-center"
                  >
                    Clear selection
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Subscription Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                Subscription
                <ChevronDown className="h-4 w-4 opacity-50" />
                {selectedSubscriptions.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedSubscriptions.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Subscription</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {subscriptionTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedSubscriptions.includes(type)}
                  onCheckedChange={(checked) => {
                    setSelectedSubscriptions((prev) =>
                      checked
                        ? [...prev, type]
                        : prev.filter((s) => s !== type),
                    );
                  }}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedSubscriptions.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setSelectedSubscriptions([])}
                    className="text-sm text-muted-foreground justify-center"
                  >
                    Clear selection
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Last Contacted Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                Last Contacted
                <ChevronDown className="h-4 w-4 opacity-50" />
                {(selectedLastContact || lastContactSort) && (
                  <Badge variant="secondary" className="ml-1">
                    {(selectedLastContact ? 1 : 0) + (lastContactSort ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Last Contact</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedLastContact(null)}
                className={!selectedLastContact ? "bg-accent" : ""}
              >
                All
              </DropdownMenuItem>
              {lastContactRanges.map((range) => (
                <DropdownMenuItem
                  key={range.label}
                  onClick={() => setSelectedLastContact(range.label)}
                  className={
                    selectedLastContact === range.label ? "bg-accent" : ""
                  }
                >
                  {range.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs">Sort</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  setLastContactSort(lastContactSort === "asc" ? null : "asc")
                }
                className="gap-2"
              >
                <ArrowUp className="h-4 w-4" />
                <span>Oldest First</span>
                {lastContactSort === "asc" && (
                  <Badge variant="secondary" className="ml-auto">
                    ✓
                  </Badge>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setLastContactSort(lastContactSort === "desc" ? null : "desc")
                }
                className="gap-2"
              >
                <ArrowDown className="h-4 w-4" />
                <span>Newest First</span>
                {lastContactSort === "desc" && (
                  <Badge variant="secondary" className="ml-auto">
                    ✓
                  </Badge>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* AUA Range Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                AUA Range
                <ChevronDown className="h-4 w-4 opacity-50" />
                {(selectedAUARange || auaSort) && (
                  <Badge variant="secondary" className="ml-1">
                    {(selectedAUARange ? 1 : 0) + (auaSort ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by AUA</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedAUARange(null)}
                className={!selectedAUARange ? "bg-accent" : ""}
              >
                All
              </DropdownMenuItem>
              {auaRanges.map((range) => (
                <DropdownMenuItem
                  key={range.label}
                  onClick={() => setSelectedAUARange(range.label)}
                  className={
                    selectedAUARange === range.label ? "bg-accent" : ""
                  }
                >
                  {range.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs">Sort</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setAuaSort(auaSort === "asc" ? null : "asc")}
                className="gap-2"
              >
                <ArrowUp className="h-4 w-4" />
                <span>Low to High</span>
                {auaSort === "asc" && (
                  <Badge variant="secondary" className="ml-auto">
                    ✓
                  </Badge>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAuaSort(auaSort === "desc" ? null : "desc")}
                className="gap-2"
              >
                <ArrowDown className="h-4 w-4" />
                <span>High to Low</span>
                {auaSort === "desc" && (
                  <Badge variant="secondary" className="ml-auto">
                    ✓
                  </Badge>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 gap-2"
            >
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-background overflow-hidden">
        <Table>
          <TableCaption className="text-muted-foreground">
            Showing {filtered.length} client{filtered.length === 1 ? "" : "s"}.
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AUA</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead className="text-right">Profile</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => router.push(`/admin/clients/${client.id}`)}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{client.fullName}</span>
                    <span className="text-sm text-muted-foreground">
                      {client.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {client.location}
                </TableCell>

                <TableCell>
                  <StatusBadge status={client.status} />
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatAUA(client.aua)}
                </TableCell>

                <TableCell>
                  <RiskBadge risk={client.riskProfile} />
                </TableCell>

                <TableCell>
                  <SubscriptionBadge subscription={client.subscriptionType} />
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatDate(client.lastContactedAt)}
                </TableCell>

                <TableCell className="text-right">
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View <ChevronRight className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-muted-foreground"
                >
                  No clients match your filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
