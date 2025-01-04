import { useState } from "react";
import { Plus, X, Edit2, Check } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

interface Goal {
  id: number;
  description: string;
}

interface GoalCategoryProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

export function GoalCategory({ title, onTitleChange }: GoalCategoryProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<string>("");
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), description: newGoal.trim() }]);
      setNewGoal("");
    }
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const handleTitleEdit = () => {
    if (isEditingTitle) {
      onTitleChange(editedTitle);
    }
    setIsEditingTitle(!isEditingTitle);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          {isEditingTitle ? (
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="max-w-[200px]"
            />
          ) : (
            <CardTitle>{title}</CardTitle>
          )}
          <Button variant="ghost" size="sm" onClick={handleTitleEdit}>
            {isEditingTitle ? (
              <Check className="h-4 w-4" />
            ) : (
              <Edit2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter a new goal"
              onKeyPress={(e) => e.key === "Enter" && addGoal()}
            />
            <Button onClick={addGoal}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center justify-between rounded bg-secondary p-2"
              >
                <span>{goal.description}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGoal(goal.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
