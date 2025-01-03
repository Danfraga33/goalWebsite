import React from "react";
import AddStock from "~/components/AddStockBtn";
import Evernote from "~/components/Evernote";
import StockList from "~/components/StockList";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import MonthlyIncomeChart from "~/components/MonthlyIncomeChart";

const Dividends = () => {
  const monthlyIncomeData = [
    { month: "Jan", income: 25000 },
    { month: "Feb", income: 27000 },
    { month: "Mar", income: 28500 },
    { month: "Apr", income: 26000 },
    { month: "May", income: 29000 },
    { month: "Jun", income: 31000 },
  ];
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Dividend Income</PageTitle>
          {/* <AddStock /> */}
        </div>
        {/* <section>
          <StockList />
        </section>
        <section>
          <MonthlyIncomeChart incomeData={monthlyIncomeData} />
        </section> */}
        <section>
          <Evernote />
        </section>
      </div>
    </Sidebar>
  );
};

export default Dividends;
