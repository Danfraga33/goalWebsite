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
export const watchlistProperties: Property[] = [
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
