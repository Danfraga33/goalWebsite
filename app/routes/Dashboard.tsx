import PageTitle from "~/components/pageTitle";
import Sidebar from "~/components/sidebar";

export default function Page() {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <PageTitle>Getting Started</PageTitle>
      </div>
    </Sidebar>
  );
}
