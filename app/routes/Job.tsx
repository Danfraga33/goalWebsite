import { useState } from "react";
import Evernote from "~/components/Evernote";
import TotalIncome from "~/components/TotalIncome";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import OccupationDetails from "~/components/OccupationDetails";
import IncomeBreakdown from "~/components/IncomeBreakdown";

const Job = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <PageTitle>Job Income Report</PageTitle>
        {/* <OccupationDetails />
        <IncomeBreakdown />
        <section className="flex items-center">
          <TotalIncome amount={1203} />
        </section> */}

        <Evernote />
      </div>
    </Sidebar>
  );
};

export default Job;
