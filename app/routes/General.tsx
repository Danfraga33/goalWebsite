import Sidebar from "~/components/sidebar";
import PageTitle from "~/components/PageTitle";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { db } from "~/lib/db/db";
import { DaysOfWeeks } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import Journal from "~/components/Journal";
import { Separator } from "~/components/ui/separator";

export async function loader({ request }: LoaderFunctionArgs) {
  const dailyTasks = await db.weeklySchedule.findMany({
    where: {
      userId: 1,
    },
  });
  const journalEntries = await db.journalEntry.findMany({
    where: {
      userId: 1,
    },
  });

  const allNotes = await db.note.findMany();

  if (!dailyTasks) throw new Response("Not Found", { status: 404 });
  return json({ dailyTasks, journalEntries, allNotes });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const time = formData.get("time") as string;
  const day = formData.get("day") as DaysOfWeeks;
  const description = formData.get("description") as string;
  const formType = formData.get("form") as string;

  switch (formType) {
    case "weeklySchedule":
      try {
        const addDailyTask = await db.weeklySchedule.create({
          data: {
            userId: 1,
            day,
            time,
            description,
          },
        });
        return { success: true, addDailyTask };
      } catch (error) {
        throw new Error("Failed to add weekly task");
      }

    case "journal":
      try {
        const date = formData.get("date") as string;
        const content = formData.get("content") as string;
        const entryDate = new Date(date);
        entryDate.setUTCHours(0, 0, 0, 0);
        console.log(typeof entryDate);

        const addJournalEntry = await db.journalEntry.upsert({
          where: {
            userId_date: {
              userId: 1,
              date: entryDate,
            },
          },
          update: {
            content,
          },
          create: {
            userId: 1,
            date: entryDate,
            content,
          },
        });

        return { success: true, addJournalEntry };
      } catch (error) {
        return json(
          { error: "An entry for this date already exists" },
          { status: 404 },
        );
      }
    default:
      break;
  }
}

export default function General() {
  const { journalEntries } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Dashboard</PageTitle>
        </div>
        <Separator />

        <Journal journalEntries={journalEntries} />
      </div>
    </Sidebar>
  );
}
