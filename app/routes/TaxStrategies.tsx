import React, { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form } from "@remix-run/react";
import { Separator } from "~/components/ui/separator";
import { Plus } from "lucide-react";
import Evernote from "~/components/Evernote";

const TaxStrategies = () => {
  const [strategies, setStrategies] = useState([
    "Maximize retirement account contributions (401(k), IRA)",
    "Take advantage of tax-loss harvesting in investment accounts",
    "Utilize Health Savings Accounts (HSAs) for medical expenses",
    "Explore tax credits for energy-efficient home improvements",
    "Consider charitable giving strategies",
    "Look into business expense deductions if self-employed",
    "Investigate opportunities for tax-advantaged investments",
    "Plan for capital gains and losses strategically",
    "Understand and utilize education-related tax benefits",
    "Explore potential deductions for state and local taxes",
  ]);

  const [newStrategy, setNewStrategy] = useState("");

  const accountants = [
    {
      name: "Jane Doe",
      specialty: "Personal Finance",
      phone: "555-0123",
      email: "jane@taxpro.com",
    },
    {
      name: "John Smith",
      specialty: "Small Business",
      phone: "555-0124",
      email: "john@taxpro.com",
    },
    {
      name: "Alice Johnson",
      specialty: "Real Estate",
      phone: "555-0125",
      email: "alice@taxpro.com",
    },
  ];

  const handleAddStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStrategy.trim() !== "") {
      setStrategies([...strategies, newStrategy.trim()]);
      setNewStrategy("");
    }
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Tax Strategies</PageTitle>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex max-h-svh flex-col justify-between gap-4">
              <Card className="p-3">
                <h2 className="mb-4 text-xl font-semibold">
                  Explored Tax Strategies
                </h2>
                <Separator className="my-2" />
                <ul className="mb-4 list-disc space-y-2 pl-6">
                  {strategies.map((strategy, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-200"
                    >
                      {strategy}
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <Form
                  method="post"
                  onSubmit={handleAddStrategy}
                  className="flex gap-2 overflow-scroll"
                >
                  <Input
                    type="text"
                    value={newStrategy}
                    onChange={(e) => setNewStrategy(e.target.value)}
                    placeholder="Enter a new tax strategy"
                    className="flex-grow"
                  />
                  <Button type="submit">
                    <Plus />
                    Add Strategy
                  </Button>
                </Form>
              </Card>
            </div>
          </div>
          <Card className="p-3">
            <h2 className="mb-4 text-xl font-semibold">Tax Accountants</h2>
            <Separator className="my-2" />
            <CardContent className="px-4">
              <div className="flex flex-col justify-between space-y-4">
                {accountants.map((accountant, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${accountant.name}`}
                      />
                      <AvatarFallback>
                        {accountant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-medium">{accountant.name}</h3>
                      <p className="text-sm text-gray-500">
                        {accountant.specialty}
                      </p>
                      <p className="text-sm text-gray-500">
                        {accountant.phone}
                      </p>
                      <p className="text-sm text-gray-500">
                        {accountant.email}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="default">
                  <span>
                    <Plus />
                  </span>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>{" "}
        <section className="py-2">
          <Evernote />
        </section>
      </div>
    </Sidebar>
  );
};

export default TaxStrategies;
