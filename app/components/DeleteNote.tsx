import React from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Form, useLocation } from "@remix-run/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const DeleteNote = ({ noteId }: { noteId: number }) => {
  const location = useLocation();
  const normalizeUrl = (url: string) => {
    return url.replace(/^\//, "");
  };
  const pageCategory = normalizeUrl(location.pathname);
  return (
    <Form method="DELETE" action={`/${pageCategory}`}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" asChild>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <input type="number" hidden value={noteId} name="noteId" readOnly />
    </Form>
  );
};

export default DeleteNote;