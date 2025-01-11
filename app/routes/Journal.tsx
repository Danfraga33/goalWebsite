import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { Card } from "~/components/ui/card";
import { JournalEntry } from "~/lib/types/types";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { getPageCategory } from "~/utils/pageUtils";
import { db } from "~/lib/db/db";
import { Form, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const journalEntries = await db.journalEntry.findMany({
    where: {
      userId: 1,
    },
  });
  return json({ journalEntries });
}
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const date = formData.get("date") as string;
  const content = formData.get("content") as string;

  if (!date || !content) {
    return json({ error: "Date and content are required." }, { status: 400 });
  }

  const parsedDate = new Date(date);

  try {
    const addJournalEntry = await db.journalEntry.upsert({
      where: {
        userId_date: {
          userId: 1,
          date: new Date(date),
        },
      },
      update: {
        content,
      },
      create: {
        userId: 1,
        date: new Date(date),
        content,
      },
    });

    return { success: true, addJournalEntry };
  } catch (error) {
    if (error.code === "P2002") {
      return json(
        { error: "An entry for this date alerady exists" },
        { status: 404 },
      );
    }
  }
}

const Journal = () => {
  const { journalEntries } = useLoaderData<typeof loader>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState("");

  const getEntryForDate = (date: Date) => {
    return journalEntries.find(
      (entry) =>
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );
  };

  console.log(currentEntry);

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageTitle>My Journal</PageTitle>
        </div>
        <Form method="POST">
          <Card className="grid gap-6 p-2 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Textarea
                placeholder="Write your journal entry here..."
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                className="h-40"
                name="content"
              />
              <Button type="submit">Save Entry</Button>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Past Entries</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </div>
          </Card>
          <input
            type="text"
            hidden
            value={selectedDate.toISOString()}
            name="date"
            // onChange={() => null}
            readOnly
          />
        </Form>
        <ScrollArea className="h-40 rounded-md border p-4">
          {getEntryForDate(selectedDate) ? (
            <div>
              <h3 className="font-semibold">
                {format(selectedDate, "MMMM d, yyyy")}
              </h3>
              <p>{getEntryForDate(selectedDate)?.content}</p>
            </div>
          ) : (
            <p>No entry for this date.</p>
          )}
        </ScrollArea>
      </div>
    </Sidebar>
  );
};

export default Journal;
