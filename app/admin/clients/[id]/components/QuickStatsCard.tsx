"use client";

import { FolderOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/client-utils";
import { Client } from "@/lib/clients";

interface QuickStatsCardProps {
  client: Client;
}

export function QuickStatsCard({ client }: QuickStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Assets Under Advisement
          </p>
          <p className="text-2xl font-bold">{formatCurrency(client.aua)}</p>
        </div>

        {client.financialData?.netWorth && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Net Worth</p>
            <p className="text-2xl font-bold">
              {formatCurrency(client.financialData.netWorth)}
            </p>
          </div>
        )}

        {client.metadata?.joinedAt && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Client Since</p>
            <p className="text-lg font-medium">
              {formatDate(client.metadata.joinedAt)}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Documents</p>
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
            <p className="font-medium">
              {client.googleDriveLink ? "Linked" : "Not linked"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
