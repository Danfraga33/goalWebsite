import React, { useState } from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form } from "@remix-run/react";
import { Separator } from "~/components/ui/separator";
import { Plus } from "lucide-react";
import { taxStrategies } from "~/lib/data/taxStrategies";

const TaxStrategiesList = () => {
  const [strategies, setStrategies] = useState(taxStrategies);
  const [newStrategy, setNewStrategy] = useState("");
  const handleAddStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStrategy.trim() !== "") {
      setStrategies([...strategies, newStrategy.trim()]);
      setNewStrategy("");
    }
  };

  return (
    <Card className="p-3">
      <h2 className="mb-4 text-xl font-semibold">Explored Tax Strategies</h2>
      <Separator className="my-2" />
      <ul className="mb-4 list-disc space-y-2 pl-6">
        {strategies.map((strategy, index) => (
          <li key={index} className="text-gray-700">
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
  );
};

export default TaxStrategiesList;
