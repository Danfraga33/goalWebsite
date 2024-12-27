import { useState } from "react";
import PageTitle from "~/components/pageTitle";
import Sidebar from "~/components/sidebar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import SaaSProjectCard from "~/components/saas-project-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import Evernote from "~/components/Evernote";

interface SaaSProject {
  id: string;
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
}

const projectsData: SaaSProject[] = [
  {
    id: "1",
    title: "Project 1",
    description: "Description for project 1",
    status: "Planning",
  },
  {
    id: "2",
    title: "Project 2",
    description: "Description for project 2",
    status: "Planning",
  },
  {
    id: "3",
    title: "Project 3",
    description: "Description for project 3",
    status: "Planning",
  },
  {
    id: "4",
    title: "Project 4",
    description: "Description for project 4",
    status: "Planning",
  },
];

const SaasPlanner = () => {
  const [projects, setProjects] = useState<SaaSProject[]>(projectsData);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<SaaSProject, "id">>({
    title: "",
    description: "",
    status: "Planning",
  });

  const handleNewProject = () => {
    setProjects([...projects, { ...newProject, id: Date.now().toString() }]);
    setNewProject({ title: "", description: "", status: "Planning" });
    setIsNewProjectDialogOpen(false);
  };

  const handleEditProject = (id: string) => {
    // Implement edit functionality
    console.log("Edit project", id);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Software-as-a-Service Planner</PageTitle>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle className="flex items-center justify-between">
              Plan Your SaaS Projects{" "}
              <span>
                <Dialog
                  open={isNewProjectDialogOpen}
                  onOpenChange={setIsNewProjectDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>New SaaS Project</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New SaaS Project</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="title" className="text-right">
                          Title
                        </label>
                        <Input
                          id="title"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              title: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right">
                          Description
                        </label>
                        <Textarea
                          id="description"
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              description: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="status" className="text-right">
                          Status
                        </label>
                        <Select
                          onValueChange={(value) =>
                            setNewProject({
                              ...newProject,
                              status: value as
                                | "Planning"
                                | "In Progress"
                                | "Completed",
                            })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Planning">Planning</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleNewProject}>Create Project</Button>
                  </DialogContent>
                </Dialog>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <SaaSProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="totalIncome" className="text-md">
              Total Income (YTD)
            </Label>
            <Input
              id="totalIncome"
              className="border-1 border border-primary p-3 text-lg font-semibold"
              type="number"
              value={1203}
            />
          </div>
          <Evernote />
        </section>
      </div>
    </Sidebar>
  );
};

export default SaasPlanner;
