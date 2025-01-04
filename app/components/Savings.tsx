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
const Savings = () => {
  const savingsData = [{ type: "Savings Account", value: 20000 }];
  const totalSavings = savingsData.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Savings Type</TableHead>
              <TableHead className="text-right">Value ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savingsData.map((item) => (
              <TableRow key={item.type}>
                <TableCell>{item.type}</TableCell>
                <TableCell className="text-right">
                  {item.value.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total Savings</TableCell>
              <TableCell className="text-right font-bold">
                {totalSavings.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Savings;
