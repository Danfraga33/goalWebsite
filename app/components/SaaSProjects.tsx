import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SaaSProject, SaaSProjectsData } from "~/lib/constants/SaaSProjects";
const SaaSProjects = () => {
  const [selectedProject, setSelectedProject] = useState<SaaSProject | null>(
    null,
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SaaSProjectsData.map((project) => (
        <Card
          key={project.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {project.name}
              <Badge>{project.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-gray-500">{project.industry}</p>
            <p className="font-semibold">Solution: {project.solution}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="mt-4 w-full"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{selectedProject?.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Solution</h4>
                    <p>{selectedProject?.industry}</p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold">Notes</h4>
                    <p className="text-sm text-gray-600">
                      {selectedProject?.notes}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SaaSProjects;
