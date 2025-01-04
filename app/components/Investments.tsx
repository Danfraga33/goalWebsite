import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

// Sample data for savings
const Investments = () => {
  const investmentData = [
    { type: "Cash", value: 35000 },
    { type: "Public Equities", value: 50000 },
    { type: "Bonds", value: 30000 },
    { type: "Real Estate", value: 200000 },
    { type: "Venture Capital", value: 40000 },
  ];
  const totalInvestments = investmentData.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investment Type</TableHead>
              <TableHead className="text-right">Value ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investmentData.map((item) => (
              <TableRow key={item.type}>
                <TableCell>{item.type}</TableCell>
                <TableCell className="text-right">
                  {item.value.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total Investments</TableCell>
              <TableCell className="text-right font-bold">
                {totalInvestments.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Investments;
