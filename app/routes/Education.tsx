import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import { Note, NoteCategory } from "@prisma/client";
import { db } from "~/lib/db/db";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getPageCategory } from "~/utils/pageUtils";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const notes = await db.note.findMany({
    where: {
      category: pageCategory as NoteCategory,
    },
  });
  return json(notes as Note[]);
}
export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  const addNote = await db.note.create({
    data: {
      userId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: (formData.get("content") as string) ?? "Enter text...",
    },
  });

  return { success: true, addNote };
}

const Notes = () => {
  const notes = useLoaderData<typeof loader>();

  if (notes.length === 0) {
  }
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Education</PageTitle>
        </div>
        {/* <GoalSetting /> */}
        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default Notes;
