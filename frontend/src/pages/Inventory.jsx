import React, { useContext, useEffect, useState } from "react";
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
import {
  createInventoryItem,
  getInventoryItems,
} from "@/services/InventoryApi.js";

function Inventory() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getInventoryItems();
      setItems(data);
    };
    fetchData();
  }, []);
  // Local state for form data and search input
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    quantity: "",
    size: "",
    price: "",
  });
  const [searchInput, setSearchInput] = useState(""); // Search input
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility

  // Handle form submission to create a new inventory item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create new inventory item
      createInventoryItem(formData);
      const newItem = { ...formData, id: Date.now() }; // Assign a temporary ID
      setItems((prevItems) => [...prevItems, newItem]); // Update context state with new item
      setIsDialogOpen(false); // Close the dialog after submission
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter items based on search input
  const filteredItems = items.reverse().filter((item) => {
    const itemName = item.name.toLowerCase();
    const size = item.size;
    const status = item.processing;
    const price = item.price;
    const companyName = item.companyName.toLowerCase();
    const searchTerm = searchInput.toLowerCase();
    return (
      itemName.includes(searchTerm) ||
      price.includes(searchTerm) ||
      companyName.includes(searchTerm) ||
      size.includes(searchTerm) ||
      status.includes(searchInput)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header with "Add Item" button */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">
          Inventory Management
        </h1>

        {/* Dialog to add new inventory item */}
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

            {/* Form for adding a new item */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Item Name Input */}
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

              {/* Quantity Input */}
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

              {/* Size Select */}
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

              {/* Company Name Input */}
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

              {/* Price Input */}
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full border hover:bg-slate-200"
              >
                Add Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Search by item or company name"
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Inventory Table */}
      <div className="rounded-t-[10px] border ">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-300">
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>

          {/* Display filtered items */}
          <TableBody className="capitalize">
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-2">
                  <h2 className="px-2 py-1">No Data Available</h2>
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item, index) => (
                <TableRow
                  key={item._id + index}
                  className={`p-4 rounded-lg shadow-sm ${
                    item.processing === "pending"
                      ? "bg-rose-50"
                      : item.processing === "sent for sewing"
                      ? "bg-sky-50"
                      : "bg-emerald-50"
                  }`}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Inventory;
