"use client";

import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, getTimeSinceLastContact } from "@/lib/client-utils";
import { Client } from "@/lib/clients";

interface ContactInformationCardProps {
  client: Client;
}

export function ContactInformationCard({
  client,
}: ContactInformationCardProps) {
  const timeSinceLastContact = getTimeSinceLastContact(client);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">
                {client.personalData?.phone || "Not provided"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">
                {client.city
                  ? `${client.city}, ${client.country}`
                  : client.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Last Contact</p>
              <p className="font-medium">
                {formatDate(client.lastContactedAt)}
                <span className="block text-xs text-muted-foreground">
                  ({timeSinceLastContact})
                </span>
              </p>
            </div>
          </div>
        </div>

        {client.personalData?.address && (
          <>
            <Separator />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="text-sm">{client.personalData.address}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
