"use client";

import * as React from "react";
import { Edit, ExternalLink, FolderOpen, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Client } from "@/lib/clients";

interface DocumentsCardProps {
  client: Client;
}

export function DocumentsCard({ client }: DocumentsCardProps) {
  const [driveLink, setDriveLink] = React.useState(
    client.googleDriveLink || "",
  );
  const [isEditingDriveLink, setIsEditingDriveLink] = React.useState(false);

  const handleSaveDriveLink = () => {
    // In a real app, you would make an API call here to save the link
    console.log("Saving Google Drive link:", driveLink);
    setIsEditingDriveLink(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
        <CardDescription>
          Link to client&apos;s Google Drive folder
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="driveLink">Google Drive Link</Label>
          </div>

          {isEditingDriveLink ? (
            <div className="space-y-3">
              <Input
                id="driveLink"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/..."
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveDriveLink}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Link
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setDriveLink(client.googleDriveLink || "");
                    setIsEditingDriveLink(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {driveLink ? (
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                  <FolderOpen className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Google Drive Folder</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {driveLink}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingDriveLink(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                    No Documents Linked
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Add a Google Drive link to access client documents
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setIsEditingDriveLink(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Google Drive Link
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
