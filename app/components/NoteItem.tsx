import React, { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

interface NoteItemProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  onEdit: (id: number, title: string, content: string, goal: string) => void;
  onDelete: (id: number) => void;
  goal: string;
}

export function NoteItem({
  id,
  title,
  content,
  createdAt,
  goal,
  onEdit,
  onDelete,
}: NoteItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedGoal, setEditedGoal] = useState(goal);

  const handleEdit = () => {
    onEdit(id, editedTitle, editedContent, editedGoal);
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center space-x-4 rounded-lg p-4 hover:bg-secondary/50"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 py-2">
            <p className="text-md truncate font-medium text-gray-900 dark:text-gray-200">
              {title}
            </p>
            <Badge>{goal}</Badge>
          </div>
          <p className="truncate text-sm text-gray-500">{content}</p>
          <p className="text-xs text-gray-400">
            {format(createdAt, "MMM d, yyyy")}
          </p>
        </div>
        <div className="flex-shrink-0 space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
              setEditMode(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Note" : "View Note"}</DialogTitle>
          </DialogHeader>
          {editMode ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal" className="text-right">
                  Goal
                </Label>
                <Input
                  id="goal"
                  value={editedGoal}
                  onChange={(e) => setEditedGoal(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="col-span-3"
                  rows={5}
                />
              </div>
            </div>
          ) : (
            <div className="py-4">
              <h3 className="font-semibold">{title}</h3>
              <Badge className="mt-2">{goal}</Badge>
              <p className="mt-4 text-sm">{content}</p>
              <p className="mt-4 text-xs text-gray-400">
                Created on {format(createdAt, "MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          )}
          <DialogFooter>
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEdit}>Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
