"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  formatDate,
  addClientNote,
  deleteClientNote,
} from "@/lib/client-utils";
import { Client } from "@/lib/clients";

interface ClientNotesCardProps {
  client: Client;
}

export function ClientNotesCard({ client }: ClientNotesCardProps) {
  const [newNote, setNewNote] = React.useState("");
  const [isAddingNote, setIsAddingNote] = React.useState(false);

  const fullName = `${client.firstName} ${client.lastName}`;

  const sortedNotes = React.useMemo(() => {
    if (!client.notes) return [];
    return [...client.notes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [client.notes]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addClientNote(client, newNote, "Current User");
    setNewNote("");
    setIsAddingNote(false);
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteClientNote(client, noteId);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Client Notes</CardTitle>
          <CardDescription>
            Observations and important information
          </CardDescription>
        </div>
        <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Note for {fullName}</DialogTitle>
              <DialogDescription>
                Add a note about your interaction or observation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your note here..."
                  className="min-h-30"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>Save Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {sortedNotes.length > 0 ? (
          <div className="space-y-4">
            {sortedNotes.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(note.createdAt)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  — {note.author}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No notes yet</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setIsAddingNote(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add your first note
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
