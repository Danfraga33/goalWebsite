import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";

import { db } from "~/lib/db/db";
import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
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

const Ecommerce = () => {
  const rentalIncomeData = [
    { month: "Jan", income: 12000 },
    { month: "Feb", income: 11500 },
    { month: "Mar", income: 12500 },
    { month: "Apr", income: 13000 },
    { month: "May", income: 14000 },
    { month: "Jun", income: 15500 },
  ];
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>E-commerce</PageTitle>
        <Evernote />
        {/* <section>
          <MonthlyIncomeChart incomeData={rentalIncomeData} />
        </section> */}
      </div>
    </Sidebar>
  );
};

export default Ecommerce;
