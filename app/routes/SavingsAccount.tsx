import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import TotalIncome from "~/components/TotalIncome";
import Evernote from "~/components/Evernote";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/lib/db/db";
import { json, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteCategory } from "@prisma/client";
import { getPageCategory } from "~/utils/pageUtils";
import SavingsTable from "~/components/SavingsTable";
import { SavingsAccount } from "~/lib/types/types";
import NewSavingsAccount from "~/components/NewSavingsAccount";
import { accountsData } from "~/lib/data/accounts";

export async function loader({ request }: LoaderFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const notes = await db.note.findMany({
    where: {
      category: pageCategory as NoteCategory,
    },
  });

  if (!notes) throw new Response("Not Found", { status: 404 });
  return json({ notes });
}

export async function action({ request }: ActionFunctionArgs) {
  const pageCategory = getPageCategory(request.url);
  const formData = await request.formData();
  const addNote = await db.note.create({
    data: {
      userId: 1,
      category: pageCategory as NoteCategory,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    },
  });

  return json({ success: true, addNote });
}

const SavingsAccounts = () => {
  const [accounts, setAccounts] = useState<SavingsAccount[]>(accountsData);

  const [newAccount, setNewAccount] = useState<Omit<SavingsAccount, "id">>({
    name: "",
    balance: 0,
    interestRate: 0,
  });

  const amounts = accounts.map((account) => account.balance);
  const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
  const { notes } = useLoaderData<typeof loader>();

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Savings Accounts</PageTitle>
          {/* <NewSavingsAccount
            accounts={accounts}
            setAccounts={setAccounts}
            newAccount={newAccount}
            setNewAccount={setNewAccount}
          /> */}
        </div>

        {/* <SavingsTable accounts={accounts} /> */}
        {/* <TotalIncome title="Total Savings" amount={totalAmount} /> */}

        <Evernote notesData={notes} />
      </div>
    </Sidebar>
  );
};

export default SavingsAccounts;
