import { Form, useLocation } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface AddNoteProps {
  StudyName?: string;
}

const AddNote: FC<AddNoteProps> = ({ StudyName }) => {
  const location = useLocation();
  const normalizeUrl = (url: string) => {
    return url.replace(/^\//, "");
  };
  console.log(StudyName);
  const pageCategory = normalizeUrl(location.pathname);
  return (
    <Popover>
      <PopoverTrigger className="flex items-center" asChild>
        <Button>
          <PlusCircle className="md:h-4 md:w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New Note</h4>
            <p className="text-sm text-muted-foreground">Create a new note</p>
          </div>
          <Form method="POST" action={`/${pageCategory}`}>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  defaultValue="Note Name"
                  name="title"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="content">Content</Label>
                <Input id="content" name="content" className="col-span-2 h-8" />
              </div>
              <Button name="intent" value="addNote">
                Submit
              </Button>
            </div>
            <input
              type="text"
              value={StudyName}
              hidden
              readOnly
              name="StudyName"
            />
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddNote;
