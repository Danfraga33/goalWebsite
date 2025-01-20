import Evernote from "~/components/Evernote";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { getPageCategory } from "~/utils/pageUtils";
import { db } from "~/lib/db/db";
import { NoteCategory } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import JobApplicationTable from "~/components/JobApplicationTable";
import { Textarea } from "~/components/ui/textarea";
import { ReferralMsg } from "~/lib/constants/Referral";
import { Label } from "~/components/ui/label";

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
  const companyName = formData.get("companyName") as string;
  const role = formData.get("role") as string;
  const applied = formData.get("applied") === "on";
  const connectionSent = formData.get("connectionSent") === "on";
  const connected = formData.get("connected") === "on";
  const websiteApply = formData.get("websiteApply") === "on";
  const referral = formData.get("referral") === "on";
  const easyApply = formData.get("easyApply") === "on";
  const status = formData.get("status") === "on";
  const date = formData.get("date") as string;
  const notes = formData.get("notes") as string;

  if (intent == "job") {
    switch (request.method) {
      case "POST":
        try {
          console.log("ADDING APPLICATION...");
          const addJobApplication = await db.jobApplication.create({
            data: {
              userId: 1,
              Company: companyName,
              Role: role,
              Applied: applied,
              ConnectionSent: connectionSent,
              Connected: connected,
              WebsiteApply: websiteApply,
              Referral: referral,
              EasyApply: easyApply,
              Status: status,
              Date: date,
              Notes: notes,
            },
          });

          return { success: true, addJobApplication };
        } catch (error) {
          return json(
            { error: "Unsuccessfull attempt to delete the note" },
            { statusText: error.message },
          );
        }
      case "PATCH":
        const formId = formData.get("jobApplicationId") as string;
        console.log("Updating job application...");
        try {
          const updateJobApplication = await db.jobApplication.update({
            where: {
              id: Number(formId),
              userId: 1,
            },
            data: {
              Company: companyName,
              Applied: applied,
              ConnectionSent: connectionSent,
              Connected: connected,
              Role: role,
              WebsiteApply: websiteApply,
              Referral: referral,
              EasyApply: easyApply,
              Status: status,
              Date: date,
              Notes: notes,
            },
          });
          return { success: true, updateJobApplication };
        } catch (error) {
          console.error(error);
          return { success: false };
        }

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
        const addNote = await db.note.create({
          data: {
            userId: 1,
            category: pageCategory as NoteCategory,
            title: formData.get("title") as string,
            content: formData.get("content") as string,
          },
        });

        return { success: true, addNote };
      case "DELETE":
        const id = formData.get("noteId");
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

const Job = () => {
  const { jobApplications, notes } = useLoaderData<typeof loader>();
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Job Table</PageTitle>
        <JobApplicationTable jobApplications={jobApplications} />
        <Label htmlFor="referralMsg">Text Referral Msg</Label>
        <Textarea id="referralMsg" className="h-5" value={ReferralMsg} />
        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default Job;
