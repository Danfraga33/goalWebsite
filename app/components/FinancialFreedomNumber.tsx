import { ChangeEvent, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

export function FinancialFreedomNumber() {
  const [freedomNumber, setFreedomNumber] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the number to your backend or state management system
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Financial Freedom Number</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={freedomNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFreedomNumber(e.target.value)
              }
              placeholder="Enter your number"
            />
            <Button onClick={handleSave}>Save</Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">
              ${freedomNumber ? parseInt(freedomNumber).toLocaleString() : "0"}
            </p>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
