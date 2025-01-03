import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import TotalIncome from "~/components/TotalIncome";
import { projectsData } from "~/lib/constants/projects";
import SaaSProjects from "~/components/SaaSProjects";
interface SaaSProject {
  id: string;
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
}

const SaasPlanner = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Software-as-a-Service Planner</PageTitle>
        {/* <SaaSProjects />
        <TotalIncome amount={1234} /> */}
        <Evernote />
      </div>
    </Sidebar>
  );
};

export default SaasPlanner;
