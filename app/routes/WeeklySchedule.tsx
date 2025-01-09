"use client";

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
import WeeklyPlanner from "~/components/WeeklyPlanner";
import Evernote from "~/components/Evernote";
import { getPageCategory } from "~/utils/pageUtils";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { db } from "~/lib/db/db";
import { NoteCategory } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const notes = await db.note.findMany({
    where: {
      category: pageCategory as NoteCategory,
    },
  });

  if (!notes) throw new Response("Not Found", { status: 404 });
  return json({ notes });
}

export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  const addNote = await db.note.create({
    data: {
      authorId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return { success: true, addNote };
}

export default function WeeklySchedule() {
  const { notes } = useLoaderData<typeof loader>();
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Weekly Planner</PageTitle>
        </div>
        <WeeklyPlanner />
        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
}
