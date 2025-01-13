import Sidebar from "~/components/sidebar";
import PageTitle from "~/components/PageTitle";
import WeeklyPlanner from "~/components/WeeklyPlanner";
import Evernote from "~/components/Evernote";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { db } from "~/lib/db/db";
import { DaysOfWeeks } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const dailyTasks = await db.weeklySchedule.findMany({
    where: {
      userId: 1,
    },
  });

  if (!dailyTasks) throw new Response("Not Found", { status: 404 });
  return json({ dailyTasks });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const activityId = formData.get("activityId");
  console.log(request.method);
  switch (request.method) {
    case "DELETE":
      try {
        console.log("DEstorying...");
        const deleteWeeklyTask = await db.weeklySchedule.delete({
          where: {
            id: Number(activityId),
          },
        });
        return { success: true, deleteWeeklyTask };
      } catch (error) {
        return { error };
      }
      break;
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
      break;
  }
}

export default function WeeklySchedule() {
  const { dailyTasks } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Weekly Planner</PageTitle>
        </div>
        <WeeklyPlanner dailyTasks={dailyTasks} />
        {/* <Evernote notesData={weeklyJournal} /> */}
      </div>
    </Sidebar>
  );
}
