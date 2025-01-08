import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import { db } from "~/lib/db/db";
import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory } from "~/utils/pageUtils";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

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

  return { success: true, addNote };
}

const PublicEquities = () => {
  const { notes } = useLoaderData<typeof loader>();

  const capitalGrowthData = [
    { month: "January", growth: 2000 },
    { month: "February", growth: 2200 },
    { month: "March", growth: 2500 },
    { month: "April", growth: 2800 },
    { month: "May", growth: 3100 },
    { month: "June", growth: 3500 },
  ];

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
