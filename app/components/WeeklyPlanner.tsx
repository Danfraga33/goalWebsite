import { useState } from "react";
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
import { CircleX } from "lucide-react";
import { Form, useLocation } from "@remix-run/react";
import { WeeklySchedule } from "@prisma/client";
import { daysOfWeek } from "~/lib/constants/DaysOfWeek";
import { Activity } from "~/lib/types/types";

const WeeklyPlanner = ({ dailyTasks }: { dailyTasks: WeeklySchedule[] }) => {
  const [newActivity, setNewActivity] = useState<Omit<Activity, "id">>({
    time: "",
    description: "",
  });

  console.log("DAILY TASKS", dailyTasks);

  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const location = useLocation();
  const pageCategory = location.pathname;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
      {daysOfWeek.map((day, index) => {
        const dayActivities = dailyTasks.filter(
          (activity) => activity.day === day,
        );
        return (
          <Card key={day} className="flex flex-col">
            <CardHeader>
              <CardTitle>{day}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(addDays(startDate, index), "MMMM d")}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ScrollArea className="h-48">
                {dayActivities.map((activity) => (
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
                      onClick={() => null}
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
                  <Form method="post" action={pageCategory}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="time"
                          name="time"
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
                          name="description"
                          value={newActivity.description}
                          onChange={(e) =>
                            setNewActivity({
                              ...newActivity,
                              description: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                        <input
                          type="text"
                          hidden
                          value={selectedDay}
                          name="day"
                          onChange={() => null}
                        />
                      </div>
                    </div>
                    <Button type="submit">Add Activity</Button>
                  </Form>
                  {/* <Button onClick={addActivity}>Add Activity</Button> */}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default WeeklyPlanner;
