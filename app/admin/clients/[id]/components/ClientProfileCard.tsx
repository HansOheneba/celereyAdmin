"use client";

import { Edit, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Client } from "@/lib/clients";

interface ClientProfileCardProps {
  client: Client;
  onEditClick: () => void;
}

export function ClientProfileCard({
  client,
  onEditClick,
}: ClientProfileCardProps) {
  const fullName = `${client.firstName} ${client.lastName}`;
  const initials = `${client.firstName[0]}${client.lastName[0]}`.toUpperCase();

  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 0;

    total += 5;
    if (
      client.firstName &&
      client.lastName &&
      client.email &&
      client.country &&
      client.status
    )
      completed += 5;

    if (client.personalData) {
      const personalFields = ["phone", "dateOfBirth", "occupation"];
      total += personalFields.length;
      personalFields.forEach((field) => {
        if (client.personalData?.[field as keyof typeof client.personalData])
          completed += 1;
      });
    }

    if (client.financialData) {
      const financialFields = ["monthlyIncome", "totalAssets", "riskTolerance"];
      total += financialFields.length;
      financialFields.forEach((field) => {
        if (client.financialData?.[field as keyof typeof client.financialData])
          completed += 1;
      });
    }

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarFallback
              className="text-2xl bg-primary text-primary-foreground"
              style={{ backgroundColor: client.avatarColor }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-muted-foreground">{client.email}</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="default">{client.status}</Badge>
            <Badge variant="secondary">{client.riskProfile}</Badge>
            <Badge variant="outline">{client.subscriptionType}</Badge>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Profile Completion</span>
              <span className="font-medium">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3">
        {/* <Button className="w-full" variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Send Message
        </Button>
        <Button className="w-full" variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          Schedule Call
        </Button> */}
        <Button className="w-full" variant="outline" onClick={onEditClick}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
