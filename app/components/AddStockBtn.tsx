import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
interface Stock {
  id: string;
  name: string;
  symbol: string;
  type: "stock" | "etf";
  sector: string;
  country: string;
}

const AddStock = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: "1",
      name: "Apple Inc.",
      symbol: "AAPL",
      type: "stock",
      sector: "Technology",
      country: "USA",
    },
    {
      id: "2",
      name: "Vanguard S&P 500 ETF",
      symbol: "VOO",
      type: "etf",
      sector: "Index Fund",
      country: "USA",
    },
  ]);
  const [newStock, setNewStock] = useState<Omit<Stock, "id">>({
    name: "",
    symbol: "",
    type: "stock",
    sector: "",
    country: "",
  });

  const handleAddStock = () => {
    setStocks([...stocks, { ...newStock, id: Date.now().toString() }]);
    setNewStock({
      name: "",
      symbol: "",
      type: "stock",
      sector: "",
      country: "",
    });
    setIsAddDialogOpen(false);
  };
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger>
        <Button>Add New Stock</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Stock</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newStock.name}
              onChange={(e) =>
                setNewStock({ ...newStock, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol
            </Label>
            <Input
              id="symbol"
              value={newStock.symbol}
              onChange={(e) =>
                setNewStock({ ...newStock, symbol: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              onValueChange={(value) =>
                setNewStock({
                  ...newStock,
                  type: value as "stock" | "etf",
                })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="etf">ETF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sector" className="text-right">
              Sector
            </Label>
            <Input
              id="sector"
              value={newStock.sector}
              onChange={(e) =>
                setNewStock({ ...newStock, sector: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              value={newStock.country}
              onChange={(e) =>
                setNewStock({ ...newStock, country: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleAddStock}>Add Stock</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddStock;
