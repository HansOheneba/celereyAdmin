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
import { ChevronRight, Search } from "lucide-react";
import { CLIENTS, type ClientStatus, type RiskProfile } from "@/lib/clients";

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

export default function ClientsPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLIENTS;
    return CLIENTS.filter((c) => {
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q) ||
        c.riskProfile.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Manage client profiles, risk posture, and engagement history. Select a
          client to open their profile.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, location, status…"
            className="pl-9"
          />
        </div>

        <Button asChild>
          <Link href="/admin/clients/new">Add client</Link>
        </Button>
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
              <TableHead>Last Contact</TableHead>
              <TableHead className="text-right">Profile</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer"
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
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No clients match `{query}`.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
