import WorkflowChart from "~/components/Workflow";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/lib/db/db";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  let pageCategory = url.pathname.replace(/^\//, "");
  pageCategory = pageCategory.replace(/^\w/, (c) => c.toUpperCase());
  const users = await db.note.findMany({
    where: {
      category: "Education",
    },
  });
  return users;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  console.log({ title, content });
  return formData;
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Getting Started</PageTitle>
        {/* <WorkflowChart /> */}
        <Evernote notesData={data} />
      </div>
    </Sidebar>
  );
}
