import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
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
import Evernote from "~/components/Evernote";
import CapitalGrowth from "~/components/CapitalGrowth";

interface Property {
  id: string;
  address: string;
  type: string;
  price: string;
  rentalIncome: string;
  capRate: string;
  cashOnCash: string;
  description: string;
}

const watchlistProperties: Property[] = [
  {
    id: "1",
    address: "123 Main St, Anytown, USA",
    type: "Single Family Home",
    price: "$350,000",
    rentalIncome: "$2,500/month",
    capRate: "8.5%",
    cashOnCash: "12%",
    description:
      "Charming 3-bedroom, 2-bathroom home in a desirable neighborhood. Recently renovated kitchen and bathrooms. Large backyard with potential for additional unit.",
  },
  {
    id: "2",
    address: "456 Oak Ave, Metropolis, USA",
    type: "Multi-Family (4 units)",
    price: "$750,000",
    rentalIncome: "$6,000/month",
    capRate: "9.6%",
    cashOnCash: "14%",
    description:
      "Well-maintained 4-unit property in growing area. Each unit is 2-bed, 1-bath. Consistent rental history with long-term tenants. New roof and HVAC systems.",
  },
  {
    id: "3",
    address: "789 Pine Rd, Lakeside, USA",
    type: "Vacation Rental",
    price: "$500,000",
    rentalIncome: "$4,000/month (average)",
    capRate: "7.2%",
    cashOnCash: "10%",
    description:
      "Stunning lakefront property with 4 bedrooms and 3 bathrooms. Popular vacation destination with strong seasonal rental demand. Includes dock and boat slip.",
  },
];

const capitalGrowthData = [
  { year: 2018, value: 1000000 },
  { year: 2019, value: 1080000 },
  { year: 2020, value: 1150000 },
  { year: 2021, value: 1250000 },
  { year: 2022, value: 1400000 },
  { year: 2023, value: 1550000 },
];

const RealEstate = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <PageTitle>Real Estate</PageTitle>
          {/* <section>
          <h2 className="mb-4 text-2xl font-semibold">My Investments</h2>
          <Card>
          <CardContent className="p-6">
          <p className="text-start text-lg text-gray-500">Coming soon...</p>
          </CardContent>
          </Card>
          </section>
          <section>
          <h2 className="mb-4 text-2xl font-semibold">Watchlist</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {watchlistProperties.map((property) => (
              <Card
                key={property.id}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                <CardTitle className="flex items-center justify-between">
                {property.type}
                <Badge variant="secondary">{property.price}</Badge>
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <p className="mb-2 text-sm text-gray-500">
                  {property.address}
                  </p>
                  <Dialog>
                  <DialogTrigger asChild>
                  <Button className="w-full">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                  <DialogTitle>{property.type}</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                  <div>
                  <h4 className="mb-1 font-semibold">Address</h4>
                  <p className="text-sm">{property.address}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Price</h4>
                  <p className="text-sm">{property.price}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Rental Income</h4>
                  <p className="text-sm">{property.rentalIncome}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Cap Rate</h4>
                  <p className="text-sm">{property.capRate}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">
                  Cash on Cash Return
                  </h4>
                  <p className="text-sm">{property.cashOnCash}</p>
                  </div>
                  <div>
                  <h4 className="mb-1 font-semibold">Description</h4>
                  <p className="text-sm text-gray-600">
                  {property.description}
                  </p>
                  </div>
                  </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                </Card>
                ))}
                </div>
                </section>
                <section className="flex gap-2">
                {" "}
                <CapitalGrowth
                name="Property Value Growth (Last 5 Years)"
                data={capitalGrowthData}
                />
              </section> */}
        </div>
        <Evernote />
      </div>
    </Sidebar>
  );
};

export default RealEstate;
