import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface SaaSProject {
  id: string;
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
}

interface SaaSProjectCardProps {
  project: SaaSProject;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SaaSProjectCard: React.FC<SaaSProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project.title}
          <span
            className={`rounded px-2 py-1 text-sm ${
              project.status === "Planning"
                ? "bg-yellow-200 text-yellow-800"
                : project.status === "In Progress"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-green-200 text-green-800"
            }`}
          >
            {project.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-600">{project.description}</p>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(project.id)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SaaSProjectCard;
