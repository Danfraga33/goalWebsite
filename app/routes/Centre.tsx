import { Outlet, json, useLoaderData } from "@remix-run/react";

import { useState } from "react";
import { db } from "~/lib/db/db";
import { LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory, getParentPath } from "~/utils/pageUtils";
import CentreNavTop from "~/components/CentreNavTop";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const parentCategory = getParentPath(pageCategory);

  const competencyNotes = await db.note.findMany({
    where: { category: parentCategory as NoteCategory },
  });

  const studyCategory = await db.studyCategory.findMany({
    where: {
      userId: 1,
    },
    include: {
      subCategories: true,
    },
  });

  return json({ competencyNotes, studyCategory });
}

export default function CentreIndex() {
  const { studyCategory } = useLoaderData<typeof loader>();
  const [studies, setStudies] = useState(["AI Insights"]);
  const [selectedStudy, setSelectedStudy] = useState("Artificial Intelligence");

  const addStudy = () => {
    const newStudy = `Study ${studies.length + 1}`;
    setStudies([...studies, newStudy]);
    setSelectedStudy(newStudy);
  };

  const removeStudy = (study: string) => {
    if (studies.length > 1) {
      const newStudies = studies.filter((s) => s !== study);
      setStudies(newStudies);
      setSelectedStudy(newStudies[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-2">
      <div className="flex min-h-screen flex-col">
        <CentreNavTop
          listOfStudies={studyCategory}
          selectedStudy={selectedStudy}
          setSelectedStudy={setSelectedStudy}
          addStudy={addStudy}
          removeStudy={removeStudy}
          studyCategory={studyCategory}
        />
        <main className="mt-2 flex-1">
          <Outlet context={selectedStudy} />
        </main>
      </div>
    </div>
  );
}
