import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

const IncomeBreakdown = () => {
  const [income, setIncome] = useState<number>(1);
  const [taxRate, setTaxRate] = useState<number>(1);
  const tax = (income * taxRate) / 100;
  const disposableIncome = 23;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Breakdown</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="income">Annual Income ($)</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              placeholder="Enter your annual income"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              placeholder="Enter tax rate"
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-lg font-semibold">
            <span>Gross Income:</span>
            <span>${income.toFixed(2)}</span>
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
            <span className="text-xl">Disposable Income:</span>
            <span className="text-xl text-green-600">
              ${disposableIncome.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeBreakdown;
