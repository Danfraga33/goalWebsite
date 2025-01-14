import { useState } from "react";
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
import { Form, useLocation } from "@remix-run/react";
import { CircleX, File } from "lucide-react";
import { JobApplication } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";

const JobApplicationTable = ({
  jobApplications,
}: {
  jobApplications: JobApplication[];
}) => {
  const [applicationChange, setApplicationChange] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  console.log(jobApplications);
  const handleCheckboxChange = () => {
    setApplicationChange((prev) => !prev);
  };

  return (
    <Card className="p-4">
      <Table>
        <TableCaption>A list of your recent job applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Applied?</TableHead>
            <TableHead>Company</TableHead>
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
                <Checkbox
                  checked={row.Applied ?? false}
                  onChange={() => handleCheckboxChange()}
                />
              </TableCell>
              <TableCell>{row.Company}</TableCell>
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
              <TableCell>{row.Date}</TableCell>
              <TableCell>{row.Notes}</TableCell>
              <TableCell>
                <section className="flex gap-2">
                  <Form method="PUT">
                    {applicationChange && (
                      <Button variant="outline">
                        <File />
                      </Button>
                    )}
                  </Form>
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
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Job Application</DialogTitle>
            <Separator />
          </DialogHeader>
          <Form className="flex flex-col gap-2" method="POST">
            <section>
              <section className="flex flex-col items-center gap-2">
                <Label className="underline">Company Name</Label>
                <Input name="companyName" />
              </section>
              <div className="flex flex-col items-center py-4">
                <Label>When did you apply ?</Label>
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </div>
              <input
                type="text"
                value={date?.toISOString()}
                readOnly
                hidden
                name="date"
              />
            </section>
            <Button name="intent" value="job">
              Save
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default JobApplicationTable;
