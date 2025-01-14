import {
  useMatches,
  useOutletContext,
  useRouteLoaderData,
} from "@remix-run/react";
import { DashboardCard } from "~/components/DashboardCard";
import Evernote from "~/components/Evernote";

export default function Fundamentals() {
  const selectedStudy: string = useOutletContext();
  const { competencyNotes } = useRouteLoaderData("routes/centre");
  console.log(competencyNotes);

  return (
    <div className="container flex justify-center py-6">
      <div className="w-full max-w-7xl">
        <h1 className="mb-6 flex justify-center text-3xl font-bold">
          Industry Insights Dashboard: {selectedStudy}
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Introduction to AI">
            <p>An overview of AI, its history, and its key applications.</p>
          </DashboardCard>
          <DashboardCard title="Supervised Learning">
            <p>
              Learn how models are trained on labeled data to make predictions.
            </p>
          </DashboardCard>
          <DashboardCard title="Unsupervised Learning">
            <p>
              Explore how models find patterns and structure in unlabeled data.
            </p>
          </DashboardCard>
          <DashboardCard title="Natural Language Processing (NLP)">
            <p>
              Understand the methods for enabling machines to process human
              language.
            </p>
          </DashboardCard>
          <DashboardCard title="ML Fundamentals">
            <p>Dive into essential machine learning concepts and techniques.</p>
          </DashboardCard>
          <DashboardCard title="Reinforcement Learning">
            <p>
              Study how agents learn to make decisions by interacting with their
              environment.
            </p>
          </DashboardCard>
        </div>

        <div className="py-4">
          <Evernote notesData={competencyNotes} />
        </div>
      </div>
    </div>
  );
}
