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

interface PersonalInformationCardProps {
  client: Client;
}

export function PersonalInformationCard({
  client,
}: PersonalInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Basic details and background</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <p className="font-medium">
              {client.personalData?.dateOfBirth
                ? formatDate(client.personalData.dateOfBirth)
                : "Not provided"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Marital Status</Label>
            <p className="font-medium capitalize">
              {client.personalData?.maritalStatus || "Not provided"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Occupation</Label>
            <p className="font-medium">
              {client.personalData?.occupation || "Not provided"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Employer</Label>
            <p className="font-medium">
              {client.personalData?.employer || "Not provided"}
            </p>
          </div>

          {client.personalData?.dependents !== undefined && (
            <div className="space-y-2">
              <Label>Dependents</Label>
              <p className="font-medium">{client.personalData.dependents}</p>
            </div>
          )}

          {client.metadata?.advisor && (
            <div className="space-y-2">
              <Label>Assigned Advisor</Label>
              <p className="font-medium">{client.metadata.advisor}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
