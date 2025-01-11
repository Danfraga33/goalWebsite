import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Plus } from "lucide-react";
import Sidebar from "~/components/sidebar";
import PageTitle from "~/components/PageTitle";
import { Separator } from "~/components/ui/separator";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface Section {
  id: string;
  title: string;
  notes: Note[];
}

interface Topic {
  id: string;
  title: string;
  sections: Section[];
}

const initialTopics: Topic[] = [
  {
    id: "t1",
    title: "React",
    sections: [
      {
        id: "s1",
        title: "Hooks",
        notes: [
          {
            id: "n1",
            title: "useState",
            content: "Manages state in functional components",
          },
          {
            id: "n2",
            title: "useEffect",
            content: "Handles side effects in components",
          },
        ],
      },
      {
        id: "s2",
        title: "Components",
        notes: [
          {
            id: "n3",
            title: "Functional Components",
            content: "Modern way of writing React components",
          },
          {
            id: "n4",
            title: "Class Components",
            content: "Traditional way of writing React components",
          },
        ],
      },
    ],
  },
  {
    id: "t2",
    title: "JavaScript",
    sections: [
      {
        id: "s3",
        title: "ES6 Features",
        notes: [
          {
            id: "n5",
            title: "Arrow Functions",
            content: "Concise syntax for writing function expressions",
          },
          {
            id: "n6",
            title: "Destructuring",
            content: "Extract values from arrays or properties from objects",
          },
        ],
      },
      {
        id: "s4",
        title: "Async Programming",
        notes: [
          {
            id: "n7",
            title: "Promises",
            content:
              "Represents the eventual completion of an asynchronous operation",
          },
          {
            id: "n8",
            title: "Async/Await",
            content: "Syntactic sugar for working with Promises",
          },
        ],
      },
    ],
  },
];

const DeepDive = () => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [activeTopicId, setActiveTopicId] = useState<string>(topics[0].id);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [newNote, setNewNote] = useState({
    sectionId: "",
    title: "",
    content: "",
  });
  const [newSection, setNewSection] = useState({ title: "" });
  const [newTopic, setNewTopic] = useState({ title: "" });
  const handleNoteClick = (note: Note) => setSelectedNote(note);

  const addNote = () => {
    if (newNote.sectionId && newNote.title && newNote.content) {
      setTopics(
        topics.map((topic) => ({
          ...topic,
          sections: topic.sections.map((section) =>
            section.id === newNote.sectionId
              ? {
                  ...section,
                  notes: [
                    ...section.notes,
                    {
                      id: `n${Date.now()}`,
                      title: newNote.title,
                      content: newNote.content,
                    },
                  ],
                }
              : section,
          ),
        })),
      );
      setNewNote({ sectionId: "", title: "", content: "" });
    }
  };

  const addSection = () => {
    if (newSection.title) {
      setTopics(
        topics.map((topic) =>
          topic.id === activeTopicId
            ? {
                ...topic,
                sections: [
                  ...topic.sections,
                  { id: `s${Date.now()}`, title: newSection.title, notes: [] },
                ],
              }
            : topic,
        ),
      );
      setNewSection({ title: "" });
    }
  };

  const addTopic = () => {
    if (newTopic.title) {
      const newTopicId = `t${Date.now()}`;
      setTopics([
        ...topics,
        { id: newTopicId, title: newTopic.title, sections: [] },
      ]);
      setActiveTopicId(newTopicId);
      setNewTopic({ title: "" });
    }
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Deep Dive</PageTitle>
        </div>
        <Tabs value={activeTopicId} onValueChange={setActiveTopicId}>
          <TabsList className="mb-4 gap-2">
            <div>
              {topics.map((topic) => (
                <TabsTrigger key={topic.id} value={topic.id}>
                  {topic.title}
                </TabsTrigger>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="mr-2 h-4 w-4" /> Add Topic
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Topic</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="topic-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="topic-title"
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({ title: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={addTopic}>Add Topic</Button>
              </DialogContent>
            </Dialog>
          </TabsList>
          {topics.map((topic) => (
            <TabsContent key={topic.id} value={topic.id}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{topic.title}</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" /> Add Section
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Add New Section to {topic.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="section-title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="section-title"
                          value={newSection.title}
                          onChange={(e) =>
                            setNewSection({ title: e.target.value })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={addSection}>Add Section</Button>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {topic.sections.map((section) => (
                  <Card key={section.id}>
                    <CardHeader>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>
                        Notes on {section.title}
                      </CardDescription>
                      <Separator />
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] w-full pr-4">
                        {section.notes.map((note) => (
                          <div
                            key={note.id}
                            className="mb-4 cursor-pointer"
                            onClick={() => handleNoteClick(note)}
                          >
                            <h4 className="font-semibold">{note.title}</h4>

                            <p className="text-sm text-gray-600">
                              {note.content}
                            </p>
                          </div>
                        ))}
                      </ScrollArea>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="mt-4 w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Note
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Add New Note to {section.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="note-title"
                                className="text-right"
                              >
                                Title
                              </Label>
                              <Input
                                id="note-title"
                                value={newNote.title}
                                onChange={(e) =>
                                  setNewNote({
                                    ...newNote,
                                    sectionId: section.id,
                                    title: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="note-content"
                                className="text-right"
                              >
                                Content
                              </Label>
                              <Textarea
                                id="note-content"
                                value={newNote.content}
                                onChange={(e) =>
                                  setNewNote({
                                    ...newNote,
                                    sectionId: section.id,
                                    content: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <Button onClick={addNote}>Add Note</Button>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>{" "}
        {selectedNote && (
          <Card className="mt-8 border-t p-4">
            <h2 className="text-xl font-semibold">{selectedNote.title}</h2>
            <Separator />
            <p className="mt-2 text-gray-700">{selectedNote.content}</p>
          </Card>
        )}
      </div>
    </Sidebar>
  );
};

export default DeepDive;
