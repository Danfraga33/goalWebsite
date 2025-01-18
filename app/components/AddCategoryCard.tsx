import { Form } from "@remix-run/react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function AddCategory({ selectedStudy }: { selectedStudy: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="cursor-pointer rounded-lg border bg-black text-white shadow-md">
          <div className="flex flex-col items-center p-6">
            <h3 className="mb-2 text-lg font-semibold">Add Category</h3>
            <Plus />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Category</DialogTitle>
          <DialogDescription>
            Create a new category only when a new facet of the study is learned
            to keep notes organized.
          </DialogDescription>
        </DialogHeader>
        <Form method="POST" className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" />
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" />
          <Button>Save</Button>
          <input
            type="text"
            value="addCategory"
            hidden
            readOnly
            name="intent"
          />
          <input
            type="text"
            value={selectedStudy}
            hidden
            readOnly
            name="selectedStudy"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
