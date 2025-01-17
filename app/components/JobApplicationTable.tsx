import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Calendar } from "./ui/calendar";
import { Form } from "@remix-run/react";
import { CircleX, File, Plus } from "lucide-react";
import { JobApplication } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";

const JobApplicationTable = ({
  jobApplications,
}: {
  jobApplications: JobApplication[];
}) => {
  const [jobApplicationData, setJobApplicationData] = useState();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-4">
      <Table>
        <TableCaption>A list of your recent job applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Applied?</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Connection Sent</TableHead>
            <TableHead>Connected</TableHead>
            <TableHead>Website Apply</TableHead>
            <TableHead>Referral</TableHead>
            <TableHead>Easy Apply</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobApplications.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Checkbox checked={row.Applied ?? false} />
              </TableCell>
              <TableCell>{row.Company}</TableCell>
              <TableCell>{row.Role}</TableCell>
              <TableCell>
                <Checkbox checked={row.ConnectionSent ?? false} />
              </TableCell>
              <TableCell>
                <Checkbox checked={row.Connected ?? false} />
              </TableCell>
              <TableCell>
                <Checkbox checked={row.WebsiteApply ?? false} />
              </TableCell>
              <TableCell>
                <Checkbox checked={row.Referral ?? false} />
              </TableCell>
              <TableCell>
                <Checkbox checked={row.EasyApply ?? false} />
              </TableCell>
              <TableCell>
                <Checkbox checked={row.Status ?? false} />
              </TableCell>
              <TableCell>{new Date(row.Date).toDateString()}</TableCell>
              <TableCell>{row.Notes}</TableCell>
              <TableCell>
                <section className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" name="intent" value="job">
                        <File />
                        <input
                          type="text"
                          hidden
                          readOnly
                          value={row.id}
                          name="id"
                        />
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-description="creating a new job application row">
                      <DialogHeader>
                        <DialogTitle>Update Job Application</DialogTitle>
                        <Separator />
                      </DialogHeader>
                      <Form method="PATCH" className="flex flex-col gap-4">
                        <section className="flex flex-col items-start gap-2">
                          <Label>Company Name:</Label>
                          <Input name="companyName" required />
                        </section>
                        <section className="flex flex-col items-start gap-2">
                          <Label>Role:</Label>
                          <Input name="role" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Applied</Label>
                          <Checkbox name="applied" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Connection Sent</Label>
                          <Checkbox name="connectionSent" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Connected</Label>
                          <Checkbox name="connected" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Website Apply</Label>
                          <Checkbox name="websiteApply" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Referral</Label>
                          <Checkbox name="referral" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Easy Apply</Label>
                          <Checkbox name="easyApply" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Status</Label>
                          <Checkbox name="status" />
                        </section>
                        <section className="flex items-center gap-2">
                          <Label>Notes</Label>
                          <Input name="notes" />
                        </section>
                        <section className="flex flex-col items-center py-4">
                          <Label>When did you apply?</Label>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </section>
                        <input
                          type="text"
                          value={date?.toISOString()}
                          readOnly
                          hidden
                          name="date"
                        />
                        <input
                          type="text"
                          value={row.id}
                          hidden
                          readOnly
                          name="jobApplicationId"
                        />
                        <Button type="submit" name="intent" value="job">
                          Save
                        </Button>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  <Form method="DELETE">
                    <Button variant="destructive">
                      <CircleX />
                    </Button>
                    <input
                      type="text"
                      hidden
                      readOnly
                      value="job"
                      name="intent"
                    />
                    <input
                      type="text"
                      value={row.id}
                      hidden
                      readOnly
                      name="jobApplicationId"
                    />
                  </Form>
                </section>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Add
          </Button>
        </DialogTrigger>
        <DialogContent aria-description="creating a new job application row">
          <DialogHeader>
            <DialogTitle>New Job Application</DialogTitle>
            <Separator />
          </DialogHeader>
          <Form className="flex flex-col gap-4" method="POST">
            <section className="flex flex-col items-start gap-2">
              <Label>Company Name</Label>
              <Input name="companyName" required />
            </section>
            <section className="flex flex-col items-start gap-2">
              <Label>Role:</Label>
              <Input name="role" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Applied</Label>
              <Checkbox name="applied" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Connection Sent</Label>
              <Checkbox name="connectionSent" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Connected</Label>
              <Checkbox name="connected" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Website Apply</Label>
              <Checkbox name="websiteApply" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Referral</Label>
              <Checkbox name="referral" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Easy Apply</Label>
              <Checkbox name="easyApply" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Status</Label>
              <Checkbox name="status" />
            </section>
            <section className="flex items-center gap-2">
              <Label>Notes</Label>
              <Input name="notes" />
            </section>
            <section className="flex flex-col items-center py-4">
              <Label>When did you apply?</Label>
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </section>
            <input
              type="text"
              value={date?.toISOString()}
              readOnly
              hidden
              name="date"
            />
            <Button type="submit" name="intent" value="job">
              Save
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default JobApplicationTable;
