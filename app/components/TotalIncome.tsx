import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
interface TotalIncomeProps {
  amount: number;
  title?: string;
}
const TotalIncome = ({
  amount,
  title = "Total Income (YTD)",
}: TotalIncomeProps) => {
  return (
    <>
      <Label htmlFor="totalIncome" className="text-md">
        {title}
      </Label>
      <Input
        className="border-1 border border-primary p-3 text-lg font-semibold"
        type="number"
        value={amount}
        readOnly
      />
    </>
  );
};
export default TotalIncome;
