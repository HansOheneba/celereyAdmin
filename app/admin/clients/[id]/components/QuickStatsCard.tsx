"use client";

import * as React from "react";
import {
  FolderOpen,
  Link2,
  Link2Off,
  Wallet,
  Landmark,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/client-utils";
import { Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

interface QuickStatsCardProps {
  client: Client;
}

function StatTile({
  label,
  value,
  icon: Icon,
  sub,
  className,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ElementType;
  sub?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-background/50 p-4 shadow-sm",
        "transition-colors hover:bg-background",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="mt-1 text-lg font-semibold leading-7 tabular-nums">
            {value}
          </div>
          {sub ? (
            <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
          ) : null}
        </div>

        <div className="rounded-xl border bg-background p-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

function StatusPill({ linked }: { linked: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        linked
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
          : "bg-muted text-muted-foreground",
      )}
    >
      {linked ? (
        <Link2 className="h-3.5 w-3.5" />
      ) : (
        <Link2Off className="h-3.5 w-3.5" />
      )}
      {linked ? "Linked" : "Not linked"}
    </span>
  );
}

export function QuickStatsCard({ client }: QuickStatsCardProps) {
  const aua = client.aua ?? 0;
  const netWorth = client.financialData?.netWorth;
  const joinedAt = client.metadata?.joinedAt;
  const docsLinked = !!client.googleDriveLink;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Stats</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-3">
          <StatTile
            label="Assets Under Advisement"
            value={formatCurrency(aua)}
            icon={Wallet}
            sub="Current AUA"
          />

          {typeof netWorth === "number" && (
            <StatTile
              label="Net Worth"
              value={formatCurrency(netWorth)}
              icon={Landmark}
              sub="Latest snapshot"
            />
          )}

          {joinedAt && (
            <StatTile
              label="Client Since"
              value={formatDate(joinedAt)}
              icon={Calendar}
            />
          )}

          <div className="rounded-2xl border bg-background/50 p-4 shadow-sm transition-colors hover:bg-background">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Documents</p>
                <div className="mt-1 flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  <StatusPill linked={docsLinked} />
                </div>
              </div>

              {/* Optional: if you later want quick action */}
              {/* <Button size="sm" variant="outline" className="h-8">Open</Button> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
