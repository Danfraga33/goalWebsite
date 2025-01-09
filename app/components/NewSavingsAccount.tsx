import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { SavingsAccount } from "~/lib/types/types";
type NewSavingsAccountProps = {
  accounts: SavingsAccount[];
  setAccounts: Dispatch<SetStateAction<SavingsAccount[]>>;
  newAccount: Omit<SavingsAccount, "id">;
  setNewAccount: Dispatch<SetStateAction<Omit<SavingsAccount, "id">>>;
};
const NewSavingsAccount = ({
  accounts,
  setAccounts,
  setNewAccount,
  newAccount,
}: NewSavingsAccountProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAccount = () => {
    const id = (accounts.length + 1).toString();
    setAccounts([...accounts, { ...newAccount, id }]);
    setNewAccount({ name: "", balance: 0, interestRate: 0 });
    setIsDialogOpen(false);
  };
  return (
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
  );
};

export default NewSavingsAccount;
