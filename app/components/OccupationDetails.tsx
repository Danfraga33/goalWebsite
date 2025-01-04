import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { CurrentOccupation } from "~/lib/constants/jobIncome";

const OccupationDetails = () => {
  return (
    <Card>
      <CardHeader className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Job & Income</CardTitle>
          </div>
          <Button variant="outline">Edit</Button>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="job" className="text-md">
              Job Title
            </Label>
            <Input
              id="job"
              type="text"
              value={CurrentOccupation.Title} // Placeholder for the job title
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="currentIncome" className="text-md">
              Current Income ($)
            </Label>
            <Input
              id="currentIncome"
              type="string"
              value={`$${CurrentOccupation.Income}`}
              readOnly
              step="1"
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-lg font-semibold">
          <span>Gross Income:</span>
          {/* <span>${CurrentOccupation.Income.toFixed(2)}</span> */}
          <span>Tax:</span>
          {/* <span>${tax.toFixed(2)}</span> */}
          <span className="text-xl">Disposable Income:</span>
          {/* <span className="text-xl text-green-600">
                ${disposableIncome.toFixed(2)}
              </span> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupationDetails;
