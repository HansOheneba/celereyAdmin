"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/client-utils";
import { Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

interface FinancialSnapshotCardProps {
  client: Client;
}

type LineItem = { label: string; value?: number | null };

function MoneyRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium tabular-nums">
        {formatCurrency(value)}
      </span>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-background/60 p-4 text-center shadow-sm",
        "transition-colors hover:bg-background",
      )}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 tabular-nums",
          emphasis ? "text-2xl font-bold" : "text-xl font-semibold",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  items,
  totalLabel,
  totalValue,
}: {
  title: string;
  items: LineItem[];
  totalLabel: string;
  totalValue: number;
}) {
  const visible = items.filter(
    (i) => typeof i.value === "number" && i.value !== 0,
  );

  return (
    <div className="rounded-2xl border bg-background/50 p-4 md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      </div>

      <div className="mt-4 space-y-3">
        {visible.length ? (
          visible.map((item) => (
            <MoneyRow
              key={item.label}
              label={item.label}
              value={item.value as number}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No {title.toLowerCase()} recorded
          </p>
        )}

        <Separator className="my-2" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold">{totalLabel}</span>
          <span className="text-sm font-semibold tabular-nums">
            {formatCurrency(totalValue)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FinancialSnapshotCard({ client }: FinancialSnapshotCardProps) {
  const fd = client.financialData;

  if (!fd) {
    return (
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">Financial Snapshot</CardTitle>
          <CardDescription className="text-sm">
            Assets, liabilities, and net worth
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-2xl border bg-muted/30 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No financial data available
            </p>
            <Button variant="outline" className="mt-3">
              <Plus className="mr-2 h-4 w-4" />
              Add Financial Information
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const assets: LineItem[] = [
    { label: "Cash & Savings", value: fd.cashSavings },
    { label: "Investment Portfolio", value: fd.investmentPortfolio },
    { label: "Retirement Accounts", value: fd.retirementAccounts },
    { label: "Real Estate", value: fd.realEstateValue },
    { label: "Other Assets", value: fd.otherAssets },
  ];

  const liabilities: LineItem[] = [
    { label: "Mortgage Debt", value: fd.mortgageDebt },
    { label: "Student Loans", value: fd.studentLoans },
    { label: "Credit Card Debt", value: fd.creditCardDebt },
    { label: "Personal Loans", value: fd.personalLoans },
    { label: "Other Liabilities", value: fd.otherLiabilities },
  ];

  const netWorth = fd.netWorth ?? 0;
  const totalAssets = fd.totalAssets ?? 0;
  const totalLiabilities = fd.totalLiabilities ?? 0;

  const ratioText =
    typeof fd.debtToAssetRatio === "number"
      ? `${(fd.debtToAssetRatio * 100).toFixed(1)}%`
      : "N/A";

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">Financial Snapshot</CardTitle>
        <CardDescription className="text-sm">
          Assets, liabilities, and net worth
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-5">
          {/* Assets + Liabilities as readable tiles */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Section
              title="Assets"
              items={assets}
              totalLabel="Total Assets"
              totalValue={totalAssets}
            />
            <Section
              title="Liabilities"
              items={liabilities}
              totalLabel="Total Liabilities"
              totalValue={totalLiabilities}
            />
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SummaryTile
              label="Net Worth"
              value={formatCurrency(netWorth)}
              emphasis
            />
            <SummaryTile label="Debt to Asset Ratio" value={ratioText} />
          </div>

          {/* Goals */}
          {fd.financialGoals?.length ? (
            <div className="rounded-2xl border bg-background/50 p-4 md:p-5">
              <h3 className="text-sm font-semibold tracking-tight">
                Financial Goals
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {fd.financialGoals.map((goal, index) => (
                  <Badge key={`${goal}-${index}`} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
