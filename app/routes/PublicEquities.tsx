import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import { db } from "~/lib/db/db";
import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory } from "~/utils/pageUtils";
import { useLoaderData } from "@remix-run/react";

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
  const formData = await request.formData();
  const pageCategory = getPageCategory(request.url);
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
      return null;
      break;
  }
}

const PublicEquities = () => {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Public Equities</PageTitle>
          {/* <AddStock /> */}
        </div>
        {/* <section>
          <StockList />
        </section>
        <section>
          <CapitalGrowth
            name="Portfolio Value Growth (Last 5 Years)"
            data={capitalGrowthData}
          />
        </section> */}

        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default PublicEquities;
