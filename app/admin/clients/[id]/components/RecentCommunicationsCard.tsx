"use client";

import * as React from "react";
import { Mail, Phone, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/client-utils";
import { Client } from "@/lib/clients";

interface RecentCommunicationsCardProps {
  client: Client;
}

export function RecentCommunicationsCard({
  client,
}: RecentCommunicationsCardProps) {
  const recentCommunications = React.useMemo(() => {
    if (!client.communications) return [];
    return [...client.communications]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [client.communications]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Communications</CardTitle>
          <CardDescription>Latest interactions with client</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Log Interaction
        </Button>
      </CardHeader>
      <CardContent>
        {recentCommunications.length > 0 ? (
          <div className="space-y-4">
            {recentCommunications.map((comm) => (
              <div
                key={comm.id}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div
                  className={`p-2 rounded-full ${
                    comm.direction === "outbound"
                      ? "bg-blue-100"
                      : "bg-green-100"
                  }`}
                >
                  {comm.type === "email" && <Mail className="h-4 w-4" />}
                  {comm.type === "call" && <Phone className="h-4 w-4" />}
                  {comm.type === "meeting" && <Calendar className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium capitalize">{comm.type}</p>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comm.date)}
                    </span>
                  </div>
                  {comm.subject && (
                    <p className="text-sm font-medium">{comm.subject}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    {comm.content}
                  </p>
                  {comm.duration && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Duration: {comm.duration} minutes
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No communications recorded</p>
            <Button variant="outline" className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add first communication
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
