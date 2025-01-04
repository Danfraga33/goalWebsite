import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type incomeDataType = {
  month: string;
  income: number;
};

const MonthlyIncomeChart = ({
  incomeData,
}: {
  incomeData: incomeDataType[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-4 text-2xl font-semibold">
          Monthly Income (Last 6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#8884d8" name="Rental Income ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p className="mt-2 text-sm text-gray-600">
            Over the past 6 months, your rental income has shown a steady
            increase. Starting at $12,000 in January, it has grown to $15,500 in
            June, representing a 29.17% increase. This positive trend suggests
            strong demand for your properties and effective management of your
            real estate portfolio.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyIncomeChart;
