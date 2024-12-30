import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
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
import { useState } from "react";
interface Stock {
  id: string;
  name: string;
  symbol: string;
  type: "stock" | "etf";
  sector: string;
  country: string;
}

const StockList = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState<Stock | null>(null);
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
  const handleEditStock = () => {
    if (currentStock) {
      setStocks(
        stocks.map((stock) =>
          stock.id === currentStock.id ? currentStock : stock,
        ),
      );
      setIsEditDialogOpen(false);
      setCurrentStock(null);
    }
  };

  const handleDeleteStock = (id: string) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Symbol</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Sector</TableHead>
          <TableHead className="text-center">Country</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell>{stock.name}</TableCell>
            <TableCell className="text-center">{stock.symbol}</TableCell>
            <TableCell className="text-center">{stock.type}</TableCell>
            <TableCell className="text-center">{stock.sector}</TableCell>
            <TableCell className="text-center">{stock.country}</TableCell>
            <TableCell className="text-right">
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => setCurrentStock(stock)}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Stock</DialogTitle>
                  </DialogHeader>
                  {currentStock && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={currentStock.name}
                          onChange={(e) =>
                            setCurrentStock({
                              ...currentStock,
                              name: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-symbol" className="text-right">
                          Symbol
                        </Label>
                        <Input
                          id="edit-symbol"
                          value={currentStock.symbol}
                          onChange={(e) =>
                            setCurrentStock({
                              ...currentStock,
                              symbol: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-type" className="text-right">
                          Type
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setCurrentStock({
                              ...currentStock,
                              type: value as "stock" | "etf",
                            })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder={currentStock.type} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stock">Stock</SelectItem>
                            <SelectItem value="etf">ETF</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-sector" className="text-right">
                          Sector
                        </Label>
                        <Input
                          id="edit-sector"
                          value={currentStock.sector}
                          onChange={(e) =>
                            setCurrentStock({
                              ...currentStock,
                              sector: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-country" className="text-right">
                          Country
                        </Label>
                        <Input
                          id="edit-country"
                          value={currentStock.country}
                          onChange={(e) =>
                            setCurrentStock({
                              ...currentStock,
                              country: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                  )}
                  <Button onClick={handleEditStock}>Save Changes</Button>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={() => handleDeleteStock(stock.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockList;
