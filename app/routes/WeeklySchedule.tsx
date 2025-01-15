import Sidebar from "~/components/sidebar";
import PageTitle from "~/components/PageTitle";
import WeeklyPlanner from "~/components/WeeklyPlanner";
import Evernote from "~/components/Evernote";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { db } from "~/lib/db/db";
import { DaysOfWeeks, NoteCategory } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { getPageCategory } from "~/utils/pageUtils";

export async function loader({ request }: LoaderFunctionArgs) {
  const dailyTasks = await db.weeklySchedule.findMany({
    where: {
      userId: 1,
    },
  });

  const pageCategory = getPageCategory(request.url);
  const weeklyNotes = await db.note.findMany({
    where: {
      userId: 1,
      category: pageCategory as NoteCategory,
    },
  });

  if (!dailyTasks || !weeklyNotes)
    throw new Response("Notes Not Found", { status: 404 });
  return json({ weeklyNotes, dailyTasks });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const activityId = formData.get("activityId");
  const intent = formData.get("intent");
  const pageCategory = getPageCategory(request.url);
  if (intent === "weekSchedule") {
    switch (request.method) {
      case "DELETE":
        try {
          console.log("Destroying...");
          const deleteWeeklyTask = await db.weeklySchedule.delete({
            where: {
              id: Number(activityId),
            },
          });
          return { success: true, deleteWeeklyTask };
        } catch (error) {
          return { error };
        }
      case "POST":
        const time = formData.get("time") as string;
        const day = formData.get("day") as DaysOfWeeks;
        const description = formData.get("description") as string;
        const addDailyTask = await db.weeklySchedule.create({
          data: {
            userId: 1,
            day,
            time,
            description,
          },
        });
        console.log({ day, time, description });
        return { success: true, addDailyTask };
      default:
        return null;
    }
  } else {
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
        console.log("addStudy");
        break;
    }
  }
}

export default function WeeklySchedule() {
  const { dailyTasks, weeklyNotes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Weekly Planner</PageTitle>
        </div>
        <WeeklyPlanner dailyTasks={dailyTasks} />
        <Evernote notesData={weeklyNotes} />
      </div>
    </Sidebar>
  );
}
