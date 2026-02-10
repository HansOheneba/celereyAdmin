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
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, } from "lucide-react";

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
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-base">Client Notes</CardTitle>
          <CardDescription className="text-sm">
            Observations and important information
          </CardDescription>
        </div>

        <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 px-3">
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-base">
                Add Note for {fullName}
              </DialogTitle>
              <DialogDescription>
                Add a quick observation or action item.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="note" className="text-xs text-muted-foreground">
                  Note
                </Label>
                <Textarea
                  id="note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your note..."
                  className={cn(
                    "min-h-27.5 resize-none",
                    "text-sm leading-6",
                  )}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Keep it short and specific (next step, context, or outcome).
                  </span>
                  <span
                    className={cn(newNote.length > 600 && "text-destructive")}
                  >
                    {newNote.length}/800
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => setIsAddingNote(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-8"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                Save Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="pt-0">
        {sortedNotes.length > 0 ? (
          <div className="space-y-2">
           {sortedNotes.map((note) => (
  <div
    key={note.id}
    className="rounded-xl border bg-background/50 px-3 py-2.5 transition-colors hover:bg-background"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatDate(note.createdAt)}
          </span>
          {note.author ? (
            <span className="text-xs text-muted-foreground">
              • {note.author}
            </span>
          ) : null}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label="Open note actions"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => handleDeleteNote(note.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete note
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <p className="mt-2 text-sm leading-6 whitespace-pre-wrap">
      {note.content}
    </p>
  </div>
))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-muted/30 p-8 text-center">
            <p className="text-sm text-muted-foreground">No notes yet</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 h-8"
              onClick={() => setIsAddingNote(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add your first note
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
