import { Form, useLocation } from "@remix-run/react";
import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const AddNote = () => {
  const location = useLocation();
  const normalizeUrl = (url: string) => {
    return url.replace(/^\//, "");
  };
  const pageCategory = normalizeUrl(location.pathname);
  return (
    <Popover>
      <PopoverTrigger className="flex items-center" asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New Note</h4>
            <p className="text-sm text-muted-foreground">Create a new note</p>
          </div>
          <Form method="post" action={`/${pageCategory}`}>
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
                <Input
                  id="content"
                  name="content"
                  defaultValue="Content..."
                  className="col-span-2 h-8"
                />
              </div>
              <Button>Submit</Button>
            </div>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddNote;
