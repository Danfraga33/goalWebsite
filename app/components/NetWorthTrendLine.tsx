import PageTitle from "~/components/PageTitle";
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
import Evernote from "~/components/Evernote";
import Savings from "~/components/Savings";
import Investments from "~/components/Investments";
import NetWorth from "~/components/NetWorth";
const monthlyNetWorthData = [
  { month: "Jan", value: 450000 },
  { month: "Feb", value: 455000 },
  { month: "Mar", value: 460000 },
  { month: "Apr", value: 458000 },
  { month: "May", value: 465000 },
  { month: "Jun", value: 470000 },
];
const NetWorthTrendLine = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyNetWorthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Net Worth"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetWorthTrendLine;
