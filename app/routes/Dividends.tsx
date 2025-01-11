import Evernote from "~/components/Evernote";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
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
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();

  const addNote = await db.note.create({
    data: {
      userId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return { success: true, addNote };
}

const Dividends = () => {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Dividend Income</PageTitle>
          {/* <AddStock /> */}
        </div>
        {/* <section> */}
        {/* <StockList /> */}
        {/* </section> */}
        {/* <MonthlyIncomeChart incomeData={monthlyIncomeData} /> */}
        <section>
          <Evernote notesData={notes} />
        </section>
      </div>
    </Sidebar>
  );
};

export default Dividends;
