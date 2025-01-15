import { NoteCategory } from "@prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";
import { json, useOutletContext, useRouteLoaderData } from "@remix-run/react";
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
  switch (request.method) {
    case "POST":
      console.log("Creating...");

      try {
        const addNote = await db.note.create({
          data: {
            userId: 1,
            category: parentCategory as NoteCategory,
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
      console.log(subCategory); //Fundamentals

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
      break;
  }
}
export default function Fundamentals() {
  const selectedStudy: string = useOutletContext();
  const { competencyNotes } = useRouteLoaderData("routes/centre");

  return (
    <div className="container flex justify-center py-6">
      <div className="w-full max-w-7xl">
        <h1 className="mb-6 flex justify-center text-3xl font-bold">
          Industry Insights Dashboard: {selectedStudy}
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Introduction to AI">
            <p>An overview of AI, its history, and its key applications.</p>
          </DashboardCard>
          <DashboardCard title="Supervised Learning">
            <p>
              Learn how models are trained on labeled data to make predictions.
            </p>
          </DashboardCard>
          <DashboardCard title="Unsupervised Learning">
            <p>
              Explore how models find patterns and structure in unlabeled data.
            </p>
          </DashboardCard>
          <DashboardCard title="Natural Language Processing (NLP)">
            <p>
              Understand the methods for enabling machines to process human
              language.
            </p>
          </DashboardCard>
          <DashboardCard title="ML Fundamentals">
            <p>Dive into essential machine learning concepts and techniques.</p>
          </DashboardCard>
          <DashboardCard title="Reinforcement Learning">
            <p>
              Study how agents learn to make decisions by interacting with their
              environment.
            </p>
          </DashboardCard>
        </div>

        <div className="py-4">
          <Evernote notesData={competencyNotes} />
        </div>
      </div>
    </div>
  );
}
