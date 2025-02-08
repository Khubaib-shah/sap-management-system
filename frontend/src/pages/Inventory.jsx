import React, { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createInventoryItem } from "@/services/InventoryApi.js";
import { ItemsContext } from "@/context/ItemsContext";

function Inventory() {
  const { items, setItems } = useContext(ItemsContext);

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    quantity: "",
    size: "",
    price: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createInventoryItem(formData);
      const newItem = { ...formData, id: Date.now() };
      setItems((prevItems) => [...prevItems, newItem]);
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  // const styleByStatus = (status) => {
  //   switch (status) {
  //     case "completed":
  //       return {
  //         backgroundColor: "rgba(2, 255, 255, 0.2)",
  //         color: "black",
  //       };
  //     case "sent for sewing":
  //       return {
  //         backgroundColor: "rgba(188, 0, 29, 0.2)",
  //         color: "black",
  //       };
  //     case "pending":
  //       return {
  //         backgroundColor: "rgba(2, 255, 255, 0.2)",
  //         color: "black",
  //       };
  //     default:
  //       return {
  //         background: "white", // Default background
  //         color: "black", // Default text color
  //       };
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-3xl font-bold">Inventory Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  required
                  value={formData?.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  required
                  value={formData?.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select
                  value={formData?.size}
                  onValueChange={(value) =>
                    setFormData({ ...formData, size: value })
                  }
                >
                  <SelectTrigger id="size" required>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  required
                  value={formData?.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  required
                  value={formData?.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Add Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          {items.length === 0 ? (
            <h2 className="px-2 py-1">No Data Availible</h2>
          ) : (
            <TableBody className="capitalize">
              {items.map((item, index) => (
                <TableRow
                  key={item._id + index}
                  // style={styleByStatus(item.processing)}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}

export default Inventory;
