import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";

import Evernote from "~/components/Evernote";
import CapitalGrowth from "~/components/CapitalGrowth";
import AddStock from "~/components/AddStockBtn";
import StockList from "~/components/StockList";

const PublicEquities = () => {
  const capitalGrowthData = [
    { month: "January", growth: 2000 },
    { month: "February", growth: 2200 },
    { month: "March", growth: 2500 },
    { month: "April", growth: 2800 },
    { month: "May", growth: 3100 },
    { month: "June", growth: 3500 },
  ];

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Public Equities</PageTitle>
          {/* <AddStock /> */}
        </div>
        {/* <section>
          <StockList />
        </section>
        <section>
          <CapitalGrowth
            name="Portfolio Value Growth (Last 5 Years)"
            data={capitalGrowthData}
          />
        </section> */}

        <Evernote />
      </div>
    </Sidebar>
  );
};

export default PublicEquities;
