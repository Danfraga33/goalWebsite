import React from "react";
import PageTitle from "~/components/pageTitle";
import Sidebar from "~/components/sidebar";

const Education = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <PageTitle>Tax Strategies</PageTitle>
      </div>
    </Sidebar>
  );
};

export default Education;
