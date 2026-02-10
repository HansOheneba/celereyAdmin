"use client";

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

interface FinancialSnapshotCardProps {
  client: Client;
}

export function FinancialSnapshotCard({ client }: FinancialSnapshotCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Snapshot</CardTitle>
        <CardDescription>Assets, liabilities, and net worth</CardDescription>
      </CardHeader>
      <CardContent>
        {client.financialData ? (
          <div className="space-y-6">
            {/* Assets */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Assets</h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Cash & Savings",
                    value: client.financialData.cashSavings,
                  },
                  {
                    label: "Investment Portfolio",
                    value: client.financialData.investmentPortfolio,
                  },
                  {
                    label: "Retirement Accounts",
                    value: client.financialData.retirementAccounts,
                  },
                  {
                    label: "Real Estate",
                    value: client.financialData.realEstateValue,
                  },
                  {
                    label: "Other Assets",
                    value: client.financialData.otherAssets,
                  },
                ].map((item) =>
                  item.value ? (
                    <div
                      key={item.label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ) : null,
                )}
                <Separator />
                <div className="flex justify-between items-center font-bold">
                  <span>Total Assets</span>
                  <span>
                    {formatCurrency(client.financialData.totalAssets || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Liabilities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Liabilities</h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Mortgage Debt",
                    value: client.financialData.mortgageDebt,
                  },
                  {
                    label: "Student Loans",
                    value: client.financialData.studentLoans,
                  },
                  {
                    label: "Credit Card Debt",
                    value: client.financialData.creditCardDebt,
                  },
                  {
                    label: "Personal Loans",
                    value: client.financialData.personalLoans,
                  },
                  {
                    label: "Other Liabilities",
                    value: client.financialData.otherLiabilities,
                  },
                ].map((item) =>
                  item.value ? (
                    <div
                      key={item.label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ) : null,
                )}
                <Separator />
                <div className="flex justify-between items-center font-bold">
                  <span>Total Liabilities</span>
                  <span>
                    {formatCurrency(client.financialData.totalLiabilities || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Worth Summary */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Net Worth</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(client.financialData.netWorth || 0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Debt to Asset Ratio
                  </p>
                  <p className="text-2xl font-bold">
                    {client.financialData.debtToAssetRatio
                      ? `${(client.financialData.debtToAssetRatio * 100).toFixed(1)}%`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Goals */}
            {client.financialData.financialGoals &&
              client.financialData.financialGoals.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Financial Goals
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {client.financialData.financialGoals.map((goal, index) => (
                      <Badge key={index} variant="secondary">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No financial data available</p>
            <Button variant="outline" className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Financial Information
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
