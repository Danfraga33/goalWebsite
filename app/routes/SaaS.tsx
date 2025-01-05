import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import TotalIncome from "~/components/TotalIncome";
import { projectsData } from "~/lib/constants/projects";
import SaaSProjects from "~/components/SaaSProjects";
import { getPageCategory } from "~/utils/pageUtils";
import { db } from "~/lib/db/db";
import { NoteCategory } from "@prisma/client";
import { json, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  console.log(formData);
  const addNote = await db.note.create({
    data: {
      authorId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return json({ success: true });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const notes = await db.note.findMany({
    where: {
      category: pageCategory as NoteCategory,
    },
  });
  return json({ notes });
}

const SaasPlanner = () => {
  const { notes } = useLoaderData<typeof loader>();
  console.log(notes);
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Software-as-a-Service Planner</PageTitle>
        {/* <SaaSProjects />
        <TotalIncome amount={1234} /> */}
        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default SaasPlanner;
