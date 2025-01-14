import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { BookCopy, CircleX, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Form, useLocation } from "@remix-run/react";
import { ScrollArea } from "./ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Note } from "~/lib/types/types";
import AddNote from "./AddNote";
import DeleteNote from "./DeleteNote";
import { Button } from "./ui/button";

const Evernote = ({ notesData }: { notesData: Note[] }) => {
  const [notes, setNotes] = useState<Note[]>(notesData);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const handleNoteChange = (field: "title" | "content", value: string) => {
    const updatedNote = { ...selectedNote, [field]: value };
    setSelectedNote(updatedNote);
  };

  const filteredNotes = notesData.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const location = useLocation();
  const normalizeUrl = (url: string) => {
    return url.replace(/^\//, "");
  };
  const pageCategory = normalizeUrl(location.pathname);

  return (
    <Card className="flex h-full overflow-hidden">
      <div className="w-1/3 border-r border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Notes</h3>
            <span>
              <Badge>{pageCategory}</Badge>
            </span>
          </div>

          <AddNote />
        </div>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[80%] space-y-2 rounded-md border">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`flex items-center justify-between rounded-md p-2 ${
                  selectedNote?.id === note.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
              >
                <div
                  className="flex-grow cursor-pointer"
                  onClick={() => setSelectedNote(note)}
                >
                  <h4 className="font-medium">{note.title}</h4>
                  <p className="text-sm text-gray-500">
                    {note.content.slice(0, 50)}
                    {note.content.length > 50 ? "..." : ""}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Form method="DELETE">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="flex"
                      type="submit"
                      onClick={() => setSelectedNote(null)}
                    >
                      <CircleX color="red" />
                    </Button>
                    <input
                      type="text"
                      value={note.id}
                      hidden
                      readOnly
                      name="noteId"
                    />
                  </Form>
                  {/* <DeleteNote noteId={note.id} /> */}
                </div>
              </div>
            ))
          ) : (
            <p className="px-2">Add a note...</p>
          )}
        </ScrollArea>
      </div>
      <div className="flex-1 p-4">
        {selectedNote ? (
          <>
            <Form method="PATCH">
              <div className="flex gap-16">
                <Input
                  value={selectedNote.title || ""}
                  onChange={(e) => handleNoteChange("title", e.target.value)}
                  className="mb-4 text-xl font-bold"
                  name="newTitle"
                />
                <Button color="default">
                  <BookCopy />
                  Update
                </Button>
              </div>
              <Textarea
                value={selectedNote.content ?? "Enter Text..."}
                onChange={(e) => handleNoteChange("content", e.target.value)}
                className="h-full min-h-[400px] resize-none"
                placeholder="Start typing your note here..."
                name="newContent"
              />
              <input
                type="number"
                hidden
                readOnly
                value={selectedNote.id}
                name="noteId"
              />
            </Form>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            Select a note or create a new one
          </div>
        )}
      </div>
    </Card>
  );
};

export default Evernote;
