interface SaaSProject {
  id: string;
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
}

export const projectsData: SaaSProject[] = [
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
