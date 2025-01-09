import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { SavingsAccount } from "~/lib/types/types";

const SavingsTable = ({ accounts }: { accounts: SavingsAccount[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account Name</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Interest Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell>{account.name}</TableCell>
            <TableCell>${account.balance.toFixed(2)}</TableCell>
            <TableCell>{account.interestRate}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SavingsTable;
