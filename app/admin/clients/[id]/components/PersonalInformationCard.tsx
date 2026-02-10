"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/client-utils";
import { Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

interface PersonalInformationCardProps {
  client: Client;
}

function InfoItem({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  const isEmpty =
    value === "Not provided" ||
    value === null ||
    value === undefined ||
    value === "";

  return (
    <div
      className={cn(
        "rounded-xl border bg-background/60 p-4 shadow-sm",
        "transition-colors hover:bg-background",
        className,
      )}
    >
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <p
        className={cn(
          "mt-1 text-sm leading-6",
          isEmpty ? "text-muted-foreground" : "font-medium text-foreground",
        )}
      >
        {isEmpty ? "Not provided" : value}
      </p>
    </div>
  );
}

export function PersonalInformationCard({
  client,
}: PersonalInformationCardProps) {
  const dob = client.personalData?.dateOfBirth
    ? formatDate(client.personalData.dateOfBirth)
    : "Not provided";

  const maritalStatus = client.personalData?.maritalStatus ? (
    <span className="capitalize">{client.personalData.maritalStatus}</span>
  ) : (
    "Not provided"
  );

  const occupation = client.personalData?.occupation || "Not provided";
  const employer = client.personalData?.employer || "Not provided";

  const dependents =
    client.personalData?.dependents !== undefined
      ? client.personalData.dependents
      : null;

  const advisor = client.metadata?.advisor || null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">Personal Information</CardTitle>
        <CardDescription className="text-sm">
          Basic details and background
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <InfoItem label="Date of Birth" value={dob} />
          <InfoItem label="Marital Status" value={maritalStatus} />
          <InfoItem label="Occupation" value={occupation} />
          <InfoItem label="Employer" value={employer} />

          {dependents !== null && (
            <InfoItem label="Dependents" value={dependents} />
          )}

          {advisor && <InfoItem label="Assigned Advisor" value={advisor} />}

        
        </div>
      </CardContent>
    </Card>
  );
}
