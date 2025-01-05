import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";

import { db } from "~/lib/db/db";
import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory } from "~/utils/pageUtils";
import { useLoaderData } from "@remix-run/react";

const capitalGrowthData = [
  { year: 2018, value: 1000000 },
  { year: 2019, value: 1080000 },
  { year: 2020, value: 1150000 },
  { year: 2021, value: 1250000 },
  { year: 2022, value: 1400000 },
  { year: 2023, value: 1550000 },
];

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

const Ecommerce = () => {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>E-commerce</PageTitle>
        <Evernote notesData={notes} />
        {/* <section>
          <MonthlyIncomeChart incomeData={rentalIncomeData} />
        </section> */}
      </div>
    </Sidebar>
  );
};

export default Ecommerce;
