"use client";

import Sidebar from "~/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PageTitle from "~/components/PageTitle";
import Evernote from "~/components/Evernote";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/lib/db/db";
import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory } from "~/utils/pageUtils";

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
  console.log(formData);
  const addNote = await db.note.create({
    data: {
      authorId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return null;
}

// Sample data for the income table
const incomeData = [
  { source: "SaaS", amount: 5000 },
  { source: "Agency", amount: 8000 },
  { source: "Ecommerce", amount: 6000 },
  { source: "Job", amount: 4000 },
  { source: "Rental Income", amount: 3000 },
  { source: "Dividends", amount: 1000 },
];

// Sample data for the line chart
const monthlyIncomeData = [
  { month: "Jan", income: 25000 },
  { month: "Feb", income: 27000 },
  { month: "Mar", income: 28500 },
  { month: "Apr", income: 26000 },
  { month: "May", income: 29000 },
  { month: "Jun", income: 31000 },
];

const InvestOverview = () => {
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const { notes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Income Overview</PageTitle>
        <Card>
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Amount ($)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeData.map((item) => (
                  <TableRow key={item.source}>
                    <TableCell>{item.source}</TableCell>
                    <TableCell className="text-right">
                      {item.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    {totalIncome.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Income Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyIncomeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <section>
          <Evernote notesData={notes} />
        </section>
      </div>
    </Sidebar>
  );
};

export default InvestOverview;
