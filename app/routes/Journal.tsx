import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { Card } from "~/components/ui/card";

interface JournalEntry {
  date: Date;
  content: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState("");

  // Simulating data fetch from a backend
  useEffect(() => {
    const mockEntries: JournalEntry[] = [
      { date: new Date(2023, 4, 1), content: "Started my new project today!" },
      { date: new Date(2023, 4, 3), content: "Had a great workout session." },
      // Add more mock entries as needed
    ];
    setEntries(mockEntries);
  }, []);

  const handleSaveEntry = () => {
    const newEntry: JournalEntry = {
      date: selectedDate,
      content: currentEntry,
    };
    setEntries([...entries, newEntry]);
    setCurrentEntry("");
  };

  const getEntryForDate = (date: Date) => {
    return entries.find(
      (entry) =>
        format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageTitle>My Journal</PageTitle>
        </div>
        <Card className="grid gap-6 p-2 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Textarea
              placeholder="Write your journal entry here..."
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              className="h-40"
            />
            <Button onClick={handleSaveEntry}>Save Entry</Button>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Past Entries</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
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
        </Card>
      </div>
    </Sidebar>
  );
}
