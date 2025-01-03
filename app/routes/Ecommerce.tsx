import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import MonthlyIncomeChart from "~/components/MonthlyIncomeChart";
import Evernote from "~/components/Evernote";

const Ecommerce = () => {
  const rentalIncomeData = [
    { month: "Jan", income: 12000 },
    { month: "Feb", income: 11500 },
    { month: "Mar", income: 12500 },
    { month: "Apr", income: 13000 },
    { month: "May", income: 14000 },
    { month: "Jun", income: 15500 },
  ];
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>E-commerce</PageTitle>
        <Evernote />
        {/* <section>
          <MonthlyIncomeChart incomeData={rentalIncomeData} />
        </section> */}
      </div>
    </Sidebar>
  );
};

export default Ecommerce;
