"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatDate, getTimeSinceLastContact } from "@/lib/client-utils";
import { Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

interface ContactInformationCardProps {
  client: Client;
}

function InfoRow({
  icon: Icon,
  label,
  value,
  sub,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  href?: string;
}) {
  const isEmpty =
    value === "Not provided" ||
    value === null ||
    value === undefined ||
    value === "";

  const content = (
    <div className="flex min-w-0 items-start gap-3">
      <div className="mt-0.5 rounded-xl border bg-background p-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={cn(
            "mt-1 text-sm leading-6",
            isEmpty ? "text-muted-foreground" : "font-medium text-foreground",
          )}
        >
          {isEmpty ? "Not provided" : value}
        </p>
        {sub ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
        ) : null}
      </div>
    </div>
  );

  if (!href || isEmpty) return content;

  return (
    <a
      href={href}
      className="block rounded-2xl transition-colors hover:bg-background/60"
    >
      {content}
    </a>
  );
}

export function ContactInformationCard({
  client,
}: ContactInformationCardProps) {
  const timeSinceLastContact = getTimeSinceLastContact(client);

  const phone = client.personalData?.phone || "Not provided";
  const email = client.email || "Not provided";

  const location =
    client.city && client.country
      ? `${client.city}, ${client.country}`
      : client.country || "Not provided";

  const lastContact = client.lastContactedAt
    ? formatDate(client.lastContactedAt)
    : "Not provided";

  const address = client.personalData?.address;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Contact Information</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="rounded-2xl border bg-background/50 p-3 shadow-sm">
            <div className="grid grid-cols-1 gap-2">
              <InfoRow
                icon={Mail}
                label="Email"
                value={email}
                href={email !== "Not provided" ? `mailto:${email}` : undefined}
              />

              <InfoRow
                icon={Phone}
                label="Phone"
                value={phone}
                href={phone !== "Not provided" ? `tel:${phone}` : undefined}
              />

              <InfoRow icon={MapPin} label="Location" value={location} />

              <InfoRow
                icon={Calendar}
                label="Last Contact"
                value={lastContact}
                sub={
                  client.lastContactedAt && timeSinceLastContact
                    ? `(${timeSinceLastContact})`
                    : undefined
                }
              />
            </div>
          </div>

          {address ? (
            <>
              <Separator className="my-3" />
              <div className="rounded-2xl border bg-background/50 p-3 shadow-sm">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="mt-1 text-sm leading-6">{address}</p>
              </div>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
