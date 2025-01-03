"use client";

import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import TotalIncome from "~/components/TotalIncome";
import Evernote from "~/components/Evernote";

interface SavingsAccount {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
}

const SavingsAccounts = () => {
  const [accounts, setAccounts] = useState<SavingsAccount[]>([
    { id: "1", name: "Emergency Fund", balance: 5000, interestRate: 1.5 },
    { id: "2", name: "Life Savings", balance: 2500, interestRate: 1.2 },
    { id: "3", name: "Chequing Acc", balance: 500, interestRate: 0 },
  ]);

  const [newAccount, setNewAccount] = useState<Omit<SavingsAccount, "id">>({
    name: "",
    balance: 0,
    interestRate: 0,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAccount = () => {
    const id = (accounts.length + 1).toString();
    setAccounts([...accounts, { ...newAccount, id }]);
    setNewAccount({ name: "", balance: 0, interestRate: 0 });
    setIsDialogOpen(false);
  };

  const amounts = accounts.map((account) => account.balance);
  const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Savings Accounts</PageTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>New Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Savings Account</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Account Name
                  </Label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="balance" className="text-right">
                    Initial Balance
                  </Label>
                  <Input
                    id="balance"
                    type="number"
                    value={newAccount.balance}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        balance: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="interestRate" className="text-right">
                    Interest Rate (%)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={newAccount.interestRate}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        interestRate: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddAccount}>Create Account</Button>
            </DialogContent>
          </Dialog>
        </div>
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
        <section>
          <TotalIncome title="Total Savings" amount={totalAmount} />
        </section>
        <section>
          <Evernote />
        </section>
      </div>
    </Sidebar>
  );
};

export default SavingsAccounts;
