import { useState } from "react";
import Evernote from "~/components/Evernote";
import TotalIncome from "~/components/TotalIncome";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import OccupationDetails from "~/components/OccupationDetails";
import IncomeBreakdown from "~/components/IncomeBreakdown";
import { getPageCategory } from "~/utils/pageUtils";
import { db } from "~/lib/db/db";
import { NoteCategory } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
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
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  console.log(formData);
  const addNote = await db.note.create({
    data: {
      authorId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return null;
}

const Job = () => {
  const { notes } = useLoaderData<typeof loader>();
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Job Income Report</PageTitle>
        {/* <OccupationDetails />
        <IncomeBreakdown />
        <section className="flex items-center">
          <TotalIncome amount={1203} />
        </section> */}

        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default Job;
