import Evernote from "~/components/Evernote";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { getPageCategory } from "~/utils/pageUtils";
import { db } from "~/lib/db/db";
import { NoteCategory } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import JobApplicationTable from "~/components/JobApplicationTable";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const notes = await db.note.findMany({
    where: {
      category: pageCategory as NoteCategory,
    },
  });

  const jobApplications = await db.jobApplication.findMany({
    where: {
      userId: 1,
    },
  });

  if (!notes) throw new Response("Not Found", { status: 404 });
  return json({ jobApplications, notes });
}

export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent == "job") {
    switch (request.method) {
      case "POST":
        try {
          const companyName = formData.get("companyName") as string;
          const date = formData.get("date") as string;
          const addJobApplication = await db.jobApplication.create({
            data: {
              userId: 1,
              Company: companyName,
              Date: date,
            },
          });

          return { success: true, addJobApplication };
        } catch (error) {
          console.error("Error Deleting Application", error.message);
          return null;
        }
        break;
      case "DELETE":
        try {
          const jobApplicationId = formData.get("jobApplicationId");
          console.log(jobApplicationId);

          const deleteJobApplication = await db.jobApplication.delete({
            where: {
              id: Number(jobApplicationId),
            },
          });

          return { success: true, deleteJobApplication };
        } catch (error) {
          console.error("Error Deleting Application", error.message);
          return null;
        }
      default:
        break;
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
          return json({ success: true, addNote });
        } catch (error) {
          console.error(error.message);
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
      default:
        break;
    }
  }
}

const Job = () => {
  const { jobApplications, notes } = useLoaderData<typeof loader>();
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Job Table</PageTitle>
        <JobApplicationTable jobApplications={jobApplications} />
        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default Job;
