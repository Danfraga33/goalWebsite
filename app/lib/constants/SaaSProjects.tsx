export type SaaSProjectStatus = "In Development" | "Live" | "Archived";

export interface SaaSProject {
  id: number;
  name: string;
  industry: string;
  solution: string;
  notes: string;
  status: SaaSProjectStatus;
}
export const SaaSProjectsData: SaaSProject[] = [
  {
    id: 1,
    name: "Analyze AI",
    industry: "Finance",
    solution: "Automates Financial Analysis",
    notes:
      "Ideal for small to medium-sized firms seeking faster financial insights. Supports multiple data formats.",
    status: "Live",
  },
  {
    id: 2,
    name: "TeamSync",
    industry: "Productivity",
    solution:
      "Streamlines team communication and task management with AI-powered insights",
    notes:
      "Integrates with popular tools like Slack and Trello. Offers detailed productivity analytics.",
    status: "In Development",
  },
  {
    id: 3,
    name: "MarketVision",
    industry: "E-commerce",
    solution:
      "Provides real-time market analytics and competitor tracking for online retailers",
    notes:
      "Includes predictive sales trends. Customizable dashboards tailored to specific industries.",
    status: "Archived",
  },
];
