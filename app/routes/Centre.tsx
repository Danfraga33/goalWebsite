import { Outlet, json, redirect, useLoaderData } from "@remix-run/react";

import { useState } from "react";
import { db } from "~/lib/db/db";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory, getParentPath } from "~/utils/pageUtils";
import CentreNavTop from "~/components/CentreNavTop";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const parentCategory = getParentPath(pageCategory);

  const competencyNotes = await db.note.findMany({
    where: { category: parentCategory as NoteCategory },
  });
  const listOfStudies = await db.study.findMany({});

  return json({ competencyNotes, listOfStudies });
}

// export async function action({ request }: ActionFunctionArgs) {
//   const pageCategory = getPageCategory(request.url);
//   const parentCategory = getParentPath(pageCategory);
//   const formData = await request.formData();
//   const title = formData.get("title") as string;
//   const content = formData.get("content") as string;
//   switch (request.method) {
//     case "POST":
//       console.log("Creating...");

//       try {
//         const addNote = await db.note.create({
//           data: {
//             userId: 1,
//             category: parentCategory as NoteCategory,
//             title,
//             content,
//           },
//         });
//         return { success: true, addNote };
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     case "DELETE":
//       const id = formData.get("noteId");
//       try {
//         const deleteNote = await db.note.delete({
//           where: {
//             id: Number(id),
//           },
//         });
//         return {
//           success: true,
//           message: "Sucessfully Deleted Not",
//           deleteNote,
//         };
//       } catch (error) {
//         return json(
//           { error: "Unsuccessfull attempt to delete the note" },
//           { status: 404 },
//         );
//       }
//     case "PATCH":
//       const newTitle = formData.get("newTitle") as string;
//       const newContent = formData.get("newContent") as string;
//       const selectedNoteId = formData.get("noteId");

//       console.log("NESTED:", "UPDATING...");
//       try {
//         const updatedNote = await db.note.update({
//           where: {
//             id: Number(selectedNoteId),
//           },
//           data: {
//             title: newTitle,
//             content: newContent,
//             category: pageCategory as NoteCategory,
//           },
//         });
//         console.log("Success");

//         return { success: true, updatedNote };
//       } catch (error) {
//         throw new Response("Unable to update", { status: 404 }, error.message);
//       }
//     default:
//       console.log("addStudy");
//       return null;
//       break;
//   }
// }

export default function CentreIndex() {
  const [studies, setStudies] = useState(["AI Insights"]);
  const [selectedStudy, setSelectedStudy] = useState("AI Insights");
  const { listOfStudies } = useLoaderData<typeof loader>();

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
        <main className="mt-2 flex-1">
          <Outlet context={selectedStudy} />
        </main>
      </div>
    </div>
  );
}
