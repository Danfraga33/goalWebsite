import { Outlet, json, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Evernote from "~/components/Evernote";
import { db } from "~/lib/db/db";
import { DashboardCard } from "~/components/DashboardCard";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory } from "~/utils/pageUtils";
import CentreNavTop from "~/components/CentreNavTop";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const competencyNotes = await db.note.findMany({
    where: { category: pageCategory as NoteCategory },
  });
  const listOfStudies = await db.study.findMany({});

  return json({ competencyNotes, listOfStudies });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const pageCategory = getPageCategory(request.url);
  switch (request.method) {
    case "POST":
      try {
        const addNote = await db.note.create({
          data: {
            userId: 1,
            category: pageCategory as NoteCategory,
            title,
            content,
          },
        });
        return { success: true, addNote };
      } catch (error) {
        throw new Error(error.message);
      }
      break;
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
      break;
    case "PATCH":
      const newTitle = formData.get("newTitle") as string;
      const newContent = formData.get("newContent") as string;
      const selectedNoteId = formData.get("noteId");
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
        return { success: true, updatedNote };
      } catch (error) {
        console.error("Error updating note", error.message);
      }
    default:
      console.log("addStudy");
      break;
  }
}

export default function IndustryInsightsDashboard() {
  const [studies, setStudies] = useState(["AI Insights"]);
  const [selectedStudy, setSelectedStudy] = useState("AI Insights");

  const { listOfStudies, competencyNotes } = useLoaderData<typeof loader>();
  const addStudy = () => {
    const newStudy = `Study ${studies.length + 1}`;
    setStudies([...studies, newStudy]);
    setSelectedStudy(newStudy);
  };

  const removeStudy = (study: string) => {
    if (studies.length > 1) {
      const newStudies = studies.filter((s) => s !== study);
      setStudies(newStudies);
      setSelectedStudy(newStudies[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-2">
      <div className="flex min-h-screen flex-col">
        <CentreNavTop
          listOfStudies={listOfStudies}
          selectedStudy={selectedStudy}
          setSelectedStudy={setSelectedStudy}
          addStudy={addStudy}
          removeStudy={removeStudy}
        />
        <main className="flex-1">
          <Outlet />
          <div className="container flex justify-center py-6">
            <div className="w-full max-w-7xl">
              <h1 className="mb-6 flex justify-center text-3xl font-bold">
                Industry Insights Dashboard: {selectedStudy}
              </h1>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCard title="Introduction to AI">
                  <p>
                    An overview of AI, its history, and its key applications.
                  </p>
                </DashboardCard>
                <DashboardCard title="Supervised Learning">
                  <p>
                    Learn how models are trained on labeled data to make
                    predictions.
                  </p>
                </DashboardCard>
                <DashboardCard title="Unsupervised Learning">
                  <p>
                    Explore how models find patterns and structure in unlabeled
                    data.
                  </p>
                </DashboardCard>
                <DashboardCard title="Natural Language Processing (NLP)">
                  <p>
                    Understand the methods for enabling machines to process
                    human language.
                  </p>
                </DashboardCard>
                <DashboardCard title="ML Fundamentals">
                  <p>
                    Dive into essential machine learning concepts and
                    techniques.
                  </p>
                </DashboardCard>
                <DashboardCard title="Reinforcement Learning">
                  <p>
                    Study how agents learn to make decisions by interacting with
                    their environment.
                  </p>
                </DashboardCard>
              </div>
            </div>
          </div>
          <Outlet />
          <Evernote notesData={competencyNotes} />
        </main>
      </div>
    </div>
  );
}
