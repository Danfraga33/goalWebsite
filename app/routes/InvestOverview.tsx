import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import Savings from "~/components/Savings";
import Investments from "~/components/Investments";
import NetWorth from "~/components/NetWorth";
import NetWorthTrendLine from "~/components/NetWorthTrendLine";

const InvestOverview = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-8 p-4">
        <PageTitle>Investment Overview</PageTitle>
        {/* 
        <Savings />

        <Investments />

        <NetWorth />

        <NetWorthTrendLine /> */}
        <Evernote />
      </div>
    </Sidebar>
  );
};

export default InvestOverview;
