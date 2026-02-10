"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getClientById } from "@/lib/clients";
import {
  ClientProfileCard,
  ContactInformationCard,
  QuickStatsCard,
  PersonalInformationCard,
  RecentCommunicationsCard,
  FinancialSnapshotCard,
  ClientNotesCard,
  DocumentsCard,
  EditProfileDialog,
} from "./components";

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const client = getClientById(id);

  const [isEditing, setIsEditing] = React.useState(false);

  if (!client) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Client Details</h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Info & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <ClientProfileCard
            client={client}
            onEditClick={() => setIsEditing(true)}
          />
          <ContactInformationCard client={client} />
          <QuickStatsCard client={client} />
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <PersonalInformationCard client={client} />
              <RecentCommunicationsCard client={client} />
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <FinancialSnapshotCard client={client} />
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <ClientNotesCard client={client} />
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <DocumentsCard client={client} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        client={client}
        open={isEditing}
        onOpenChange={setIsEditing}
      />
    </div>
  );
}
