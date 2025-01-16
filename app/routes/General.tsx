import Sidebar from "~/components/sidebar";
import PageTitle from "~/components/PageTitle";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { db } from "~/lib/db/db";
import { DaysOfWeeks, NoteCategory } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import Journal from "~/components/Journal";
import { Separator } from "~/components/ui/separator";
import Evernote from "~/components/Evernote";
import { getPageCategory } from "~/utils/pageUtils";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);

  const generalNotes = await db.note.findMany({
    where: {
      userId: 1,
      category: pageCategory as NoteCategory,
    },
  });

  return json({ generalNotes });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const pageCategory = getPageCategory(request.url);

  switch (request.method) {
    case "POST":
      try {
        console.log("creating...");
        const addNoteData = await db.note.create({
          data: {
            userId: 1,
            category: pageCategory as NoteCategory,
            title: formData.get("title") as string,
            content: formData.get("content") as string,
          },
        });

        return { success: true, addNoteData };
      } catch (error) {
        console.error("Error creating note:", error);

        return {
          success: false,
          message: "Failed to create general note",
          error,
        };
      }
    case "DELETE":
      const id = formData.get("noteId");
      console.log("deleting...");
      try {
        const deleteNote = await db.note.delete({
          where: {
            id: Number(id),
          },
        });
        return {
          success: true,
          message: "Sucessfully Deleted Not",
          deleteNote,
        };
      } catch (error) {
        return json(
          { error: "Unsuccessfull attempt to delete the note" },
          { status: 404 },
        );
      }
    case "PATCH":
      const newTitle = formData.get("newTitle") as string;
      const newContent = formData.get("newContent") as string;
      const selectedNoteId = formData.get("noteId");

      console.log("UPDATING...");
      try {
        const updatedNote = await db.note.update({
          where: {
            id: Number(selectedNoteId),
          },
          data: {
            title: newTitle,
            content: newContent,
            category: pageCategory as NoteCategory,
          },
        });
        return { success: true, updatedNote };
      } catch (error) {
        console.error("Error updating note", error.message);
      }
    default:
      console.log("Add Further");
      break;
  }
}

export default function General() {
  const { generalNotes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>General</PageTitle>
        </div>
        <Separator />
        <Evernote notesData={generalNotes} />
      </div>
    </Sidebar>
  );
}
