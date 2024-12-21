import React from "react";
import PageTitle from "~/components/pageTitle";
import Sidebar from "~/components/sidebar";

const InvestOverview = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <PageTitle>Income Overview</PageTitle>
      </div>
    </Sidebar>
  );
};

export default InvestOverview;
