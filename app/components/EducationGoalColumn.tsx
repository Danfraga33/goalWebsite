import React, { ChangeEvent, useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";

interface Goal {
  id: number;
  title: string;
  description: string;
}

interface EducationGoalColumnProps {
  title: string;
  onDelete?: () => void;
}

export function EducationGoalColumn({
  title,
  onDelete,
}: EducationGoalColumnProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ title: "", description: "" });

  const addGoal = () => {
    if (newGoal.title.trim() && newGoal.description.trim()) {
      setGoals([...goals, { id: Date.now(), ...newGoal }]);
      setNewGoal({ title: "", description: "" });
    }
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {onDelete && (
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              value={newGoal.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewGoal({ ...newGoal, title: e.target.value })
              }
              placeholder="Enter goal title"
            />
            <Textarea
              value={newGoal.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setNewGoal({ ...newGoal, description: e.target.value })
              }
              placeholder="Describe your goal"
            />
            <Button onClick={addGoal} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Goal
            </Button>
          </div>
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li key={goal.id} className="rounded-lg bg-secondary p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{goal.title}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGoal(goal.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {goal.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
