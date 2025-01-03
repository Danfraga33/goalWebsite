"use client";

import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Startup } from "~/lib/constants/ventureCapital";
import Evernote from "~/components/Evernote";
import VentureCapitalBLocks from "~/components/VentureCapitalBLocks";

const VentureCapital = () => {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <PageTitle>Venture Capital</PageTitle>
          {/* <Button>
            <Plus />
            Add
          </Button> */}
        </div>
        {/* <VentureCapitalBLocks /> */}

        <Evernote />
      </div>
    </Sidebar>
  );
};

export default VentureCapital;
