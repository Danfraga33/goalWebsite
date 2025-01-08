import { NoteCategory } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Evernote from "~/components/Evernote";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import TaxStrategiesList from "~/components/TaxStrategiesList";
import { db } from "~/lib/db/db";
import { getPageCategory } from "~/utils/pageUtils";

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
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  const addNote = await db.note.create({
    data: {
      authorId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return json({ success: true, addNote });
}

const TaxStrategies = () => {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Tax Strategies</PageTitle>
        <TaxStrategiesList />
        <section className="py-2">
          <Evernote notesData={notes} />
        </section>
      </div>
    </Sidebar>
  );
};

export default TaxStrategies;
