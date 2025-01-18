import { NoteCategory } from "@prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";
import { json, useOutletContext, useRouteLoaderData } from "@remix-run/react";
import { AddCategory } from "~/components/AddCategoryCard";
import { DashboardCard } from "~/components/DashboardCard";
import Evernote from "~/components/Evernote";
import { db } from "~/lib/db/db";
import {
  getPageCategory,
  getParentPath,
  getSubCategory,
} from "~/utils/pageUtils";

export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const parentCategory = getParentPath(pageCategory);
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const intent = formData.get("intent") as string;
  if (intent === "addCategory") {
    switch (request.method) {
      case "POST":
        try {
          const title = formData.get("title") as string;
          const description = formData.get("description") as string;
          const selectedStudy = formData.get("selectedStudy") as string;
          const addCategory = await db.subCategory.create({
            data: {
              description,
              title,
              studyCategory: {
                create: {
                  userId: 1,
                  title: selectedStudy,
                },
              },
            },
          });

          return { success: true, addCategory };
        } catch (error) {
          console.error(error);
          return { success: false };
        }

      default:
        break;
    }
  }

  switch (request.method) {
    case "POST":
      const StudyName = formData.get("StudyName") as string;
      console.log("Creating...");

      try {
        const addNote = await db.note.create({
          data: {
            userId: 1,
            category: parentCategory as NoteCategory,
            StudyName,
            title,
            content,
          },
        });
        return { success: true, addNote };
      } catch (error) {
        throw new Error(error.message);
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
      const subCategory = getSubCategory(pageCategory);
      console.log(subCategory);

      console.log("NESTED UPDATING...");
      try {
        const updatedNote = await db.note.update({
          where: {
            id: Number(selectedNoteId),
          },
          data: {
            title: newTitle,
            content: newContent,
          },
        });
        console.log("SUCCESS UPDATING");
        return { success: true, updatedNote };
      } catch (error) {
        console.error("Error updating note", error.message);
      }
    default:
      console.log("addStudy");
      return null;
  }
}
export default function Fundamentals() {
  const selectedStudy: string = useOutletContext();
  const { competencyNotes, studyCategory } =
    useRouteLoaderData("routes/centre");

  const filteredNotes = competencyNotes.filter((note) => {
    return note.StudyName === selectedStudy;
  });

  const filterCategories = studyCategory.filter((category) => {
    return category.title === selectedStudy;
  });
  const subCategoryData = filterCategories
    .filter((category) => {
      return category.subCategories;
    })
    .map((category) => category.subCategories)
    .flat();

  return (
    <div className="container flex justify-center py-6">
      <div className="w-full max-w-7xl">
        <h1 className="mb-6 flex justify-center text-3xl font-bold">
          Industry Insights Dashboard: {selectedStudy}
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subCategoryData.map((category) => (
            <DashboardCard title={category.title} key={category.id}>
              <p>{category.description ?? ""}</p>
            </DashboardCard>
          ))}

          {subCategoryData.length < 6 && (
            <AddCategory selectedStudy={selectedStudy} />
          )}
        </div>

        <div className="py-4">
          <Evernote notesData={filteredNotes} StudyName={selectedStudy} />
        </div>
      </div>
    </div>
  );
}
