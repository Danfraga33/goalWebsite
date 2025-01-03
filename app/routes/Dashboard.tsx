import WorkflowChart from "~/components/Workflow";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";

export default function Page() {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Getting Started</PageTitle>
        {/* <WorkflowChart /> */}
        <Evernote />
      </div>
    </Sidebar>
  );
}
