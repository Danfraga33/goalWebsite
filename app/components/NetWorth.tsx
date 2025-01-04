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
const savingsData = [{ type: "Savings Account", value: 20000 }];

const investmentData = [
  { type: "Cash", value: 35000 },
  { type: "Public Equities", value: 50000 },
  { type: "Bonds", value: 30000 },
  { type: "Real Estate", value: 200000 },
  { type: "Venture Capital", value: 40000 },
];

const NetWorth = () => {
  const totalSavings = savingsData.reduce((sum, item) => sum + item.value, 0);
  const totalInvestments = investmentData.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  const netWorth = totalSavings + totalInvestments;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Total Savings</TableCell>
              <TableCell className="text-right">
                {totalSavings.toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Investments</TableCell>
              <TableCell className="text-right">
                {totalInvestments.toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-lg font-bold">Net Worth</TableCell>
              <TableCell className="text-right text-lg font-bold">
                {netWorth.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NetWorth;
