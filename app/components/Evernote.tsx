import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const Evernote = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome Note",
      content:
        "Welcome to your SaaS Planner! Use this space to jot down ideas, plans, and important information about your projects.",
      createdAt: new Date(),
    },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const handleNoteChange = (field: "title" | "content", value: string) => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, [field]: value };
      setSelectedNote(updatedNote);
      setNotes(
        notes.map((note) => (note.id === selectedNote.id ? updatedNote : note)),
      );
    }
  };
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <Card className="flex h-[600px] overflow-hidden">
      <div className="w-1/3 border-r border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notes</h3>
          <Button size="sm" onClick={handleNewNote}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Note
          </Button>
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
        <div className="space-y-2">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`cursor-pointer rounded-md p-2 ${
                selectedNote?.id === note.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <h4 className="font-medium">{note.title}</h4>
              <p className="text-sm text-gray-500">
                {note.content.slice(0, 50)}
                {note.content.length > 50 ? "..." : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        {selectedNote ? (
          <>
            <Input
              value={selectedNote.title}
              onChange={(e) => handleNoteChange("title", e.target.value)}
              className="mb-4 text-xl font-bold"
            />
            <Textarea
              value={selectedNote.content}
              onChange={(e) => handleNoteChange("content", e.target.value)}
              className="h-full min-h-[400px] resize-none"
              placeholder="Start typing your note here..."
            />
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
