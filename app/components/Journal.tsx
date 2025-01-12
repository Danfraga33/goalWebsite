import { Form, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import PageTitle from "./PageTitle";
import { ScrollArea } from "./ui/scroll-area";
import { JournalEntry } from "@prisma/client";
import { Input } from "./ui/input";

const Journal = ({ journalEntries }: { journalEntries: JournalEntry[] }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState("");

  useEffect(() => {
    const entry = journalEntries.find((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getUTCFullYear() === selectedDate.getUTCFullYear() &&
        entryDate.getUTCMonth() === selectedDate.getUTCMonth() &&
        entryDate.getUTCDate() === selectedDate.getUTCDate()
      );
    });
    setCurrentEntry(entry?.content ?? "");
  }, [selectedDate, journalEntries]);
  const getEntryForDate = (date: Date) => {
    return journalEntries.find(
      (entry) =>
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );
  };
  const location = useLocation();
  const normalizeUrl = (url: string) => {
    return url.replace(/^\//, "");
  };
  const pageCategory = normalizeUrl(location.pathname);
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageTitle>Night Journal</PageTitle>
      </div>
      <Form name="" method="POST" action={`/${pageCategory}`}>
        <Card className="grid gap-6 p-2 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="Type a new note"
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              className="h-40"
              name="content"
            />
            <Button type="submit">Save Entry</Button>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </Card>
        <Input
          type="text"
          hidden
          value={selectedDate.toISOString()}
          name="date"
          readOnly
        />
        <input type="text" hidden name="form" value="journal" readOnly />
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
      {/* <Evernote /> */}
    </>
  );
};

export default Journal;
