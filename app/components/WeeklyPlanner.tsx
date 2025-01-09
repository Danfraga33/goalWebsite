import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Sidebar from "~/components/sidebar";
import PageTitle from "~/components/PageTitle";
import { CircleX, Cross } from "lucide-react";

interface Activity {
  id: string;
  time: string;
  description: string;
}

interface DaySchedule {
  [key: string]: Activity[];
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyPlanner = () => {
  const [schedule, setSchedule] = useState<DaySchedule>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [newActivity, setNewActivity] = useState<Omit<Activity, "id">>({
    time: "",
    description: "",
  });

  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const addActivity = () => {
    if (newActivity.time && newActivity.description) {
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [selectedDay]: [
          ...prevSchedule[selectedDay],
          { ...newActivity, id: Math.random().toString(36).substr(2, 9) },
        ].sort((a, b) => a.time.localeCompare(b.time)),
      }));
      setNewActivity({ time: "", description: "" });
    }
  };

  const removeActivity = (day: string, id: string) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].filter((activity) => activity.id !== id),
    }));
  };

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
        {daysOfWeek.map((day, index) => (
          <Card key={day} className="flex flex-col">
            <CardHeader>
              <CardTitle>{day}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(addDays(startDate, index), "MMMM d")}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ScrollArea className="h-48">
                {schedule[day].map((activity) => (
                  <div
                    key={activity.id}
                    className="mb-2 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium">{activity.time}</span>
                      <p className="text-sm">{activity.description}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeActivity(day, activity.id)}
                      className="flex p-0"
                    >
                      <CircleX />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="mt-2 w-full"
                    onClick={() => setSelectedDay(day)}
                  >
                    Add Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Activity for {selectedDay}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="time" className="text-right">
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={newActivity.time}
                        onChange={(e) =>
                          setNewActivity({
                            ...newActivity,
                            time: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        value={newActivity.description}
                        onChange={(e) =>
                          setNewActivity({
                            ...newActivity,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button onClick={addActivity}>Add Activity</Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default WeeklyPlanner;
