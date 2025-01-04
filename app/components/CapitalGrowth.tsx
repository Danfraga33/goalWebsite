import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";

interface CapitalGrowthTypes {
  year: number;
  value: number;
}

const CapitalGrowth = ({
  name,
  data,
}: {
  name: string;
  data: CapitalGrowthTypes[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-4 text-2xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <LineChart
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                name="Property Value ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p className="mt-2 text-sm text-gray-600">
            Your real estate investments have shown significant capital growth
            over the past 5 years. The total value of your properties has
            increased from $1,000,000 in 2018 to $1,550,000 in 2023,
            representing a 55% increase. This growth outperforms many other
            investment classes and demonstrates the strong appreciation
            potential of your chosen properties.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapitalGrowth;
