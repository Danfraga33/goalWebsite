import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { VentureCapitalDeals } from "~/lib/constants/VentureCapital";
import { Startup } from "~/lib/constants/VentureCapital";

const VentureCapitalBLocks = () => {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {VentureCapitalDeals.map((startup) => (
        <Card
          key={startup.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {startup.name}
              <Badge>{startup.fundingStage}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-gray-500">{startup.industry}</p>
            <p className="font-semibold">Valuation: {startup.valuation}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="mt-4 w-full"
                  onClick={() => setSelectedStartup(startup)}
                >
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{selectedStartup?.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Industry</h4>
                    <p>{selectedStartup?.industry}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Funding Stage</h4>
                    <p>{selectedStartup?.fundingStage}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Valuation</h4>
                    <p>{selectedStartup?.valuation}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Notes</h4>
                    <p className="text-sm text-gray-600">
                      {selectedStartup?.notes}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VentureCapitalBLocks;
