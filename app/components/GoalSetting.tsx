"use client";

import React, { ChangeEvent, useState } from "react";
import { Plus, Edit } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

type Goal = {
  id: string;
  text: string;
};

type Column = {
  id: string;
  name: string;
  goals: Goal[];
};

const initialColumns: Column[] = [
  { id: "1", name: "SaaS", goals: [] },
  { id: "2", name: "Job", goals: [] },
  { id: "3", name: "Agency", goals: [] },
  { id: "4", name: "Ecommerce", goals: [] },
];

export default function GoalSetting() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newColumnName, setNewColumnName] = useState("");
  const [editColumnId, setEditColumnId] = useState<string | null>(null);
  const [editColumnName, setEditColumnName] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const addColumn = () => {
    if (newColumnName.trim()) {
      setColumns([
        ...columns,
        { id: Date.now().toString(), name: newColumnName, goals: [] },
      ]);
      setNewColumnName("");
    }
  };

  const editColumn = () => {
    if (editColumnName.trim() && editColumnId) {
      setColumns(
        columns.map((col) =>
          col.id === editColumnId ? { ...col, name: editColumnName } : col,
        ),
      );
      setEditColumnId(null);
      setEditColumnName("");
    }
  };

  const addGoal = () => {
    if (newGoal.trim() && activeColumn) {
      setColumns(
        columns.map((col) =>
          col.id === activeColumn
            ? {
                ...col,
                goals: [
                  ...col.goals,
                  { id: Date.now().toString(), text: newGoal },
                ],
              }
            : col,
        ),
      );
      setNewGoal("");
      setActiveColumn(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Goal Setting</h1>
      <div className="flex flex-wrap gap-4">
        {columns.map((column) => (
          <Card key={column.id} className="w-64">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {column.name}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditColumnId(column.id);
                        setEditColumnName(column.name);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Column</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={editColumnName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditColumnName(e.target.value)
                      }
                      placeholder="Column name"
                    />
                    <Button onClick={editColumn}>Save</Button>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {column.goals.map((goal) => (
                  <li key={goal.id} className="rounded bg-secondary p-2">
                    {goal.text}
                  </li>
                ))}
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => setActiveColumn(column.id)}
                  >
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Goal to {column.name}</DialogTitle>
                  </DialogHeader>
                  <Input
                    value={newGoal}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewGoal(e.target.value)
                    }
                    placeholder="Enter your goal"
                  />
                  <Button onClick={addGoal}>Add Goal</Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Add New Column</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={newColumnName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewColumnName(e.target.value)
              }
              placeholder="Column name"
              className="mb-2"
            />
            <Button onClick={addColumn} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Column
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
