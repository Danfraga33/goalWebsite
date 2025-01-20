import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import { json, useLoaderData } from "@remix-run/react";
import { NoteCategory } from "@prisma/client";
import { db } from "~/lib/db/db";
import { getPageCategory } from "~/utils/pageUtils";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Category } from "~/lib/types/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const notes = await db.note.findMany({
    where: {
      category: pageCategory as NoteCategory,
    },
  });

  if (!notes) throw new Response("Not Found", { status: 404 });
  return json({ notes });
}

export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  switch (request.method) {
    case "POST":
      try {
        const addNote = await db.note.create({
          data: {
            userId: 1,
            category: pageCategory as NoteCategory,
            title: formData.get("title") as string,
            content: formData.get("content") as string,
          },
        });

        return { success: true, addNote };
      } catch (error) {}
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
          { statusText: error.message },
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
      break;
  }
}

const Flow = () => {
  const { notes } = useLoaderData<typeof loader>();
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: "Personal Goals" },
    { id: 2, title: "Fitness Goals" },
    { id: 3, title: "Financial Goals" },
  ]);

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageTitle>My Goals</PageTitle>
          {/* <Button onClick={addCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button> */}
        </div>
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <GoalCategory
              key={category.id}
              title={category.title}
              onTitleChange={(newTitle) =>
                updateCategoryTitle(category.id, newTitle)
              }
            />
          ))}
        </div> */}
        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default Flow;
