import React, { useEffect, useState } from "react";
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
import SearchBar from "@/components/SearchBar";

function Inventory() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    quantity: "",
    size: "",
    price: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterOption, setFilterOption] = useState(""); // State for filter option

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getInventoryItems();
      setItems(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInventoryItem(formData);
      const newItem = { ...formData, id: Date.now() };
      setItems((prevItems) => [...prevItems, newItem]);
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (value) => {
    setFilterOption(value);
  };

  // Filter and sort items based on search input and filter option
  const filteredItems = items
    .filter((item) => {
      const itemName = item.name.toLowerCase();
      const size = item.size;
      const status = item.processing;
      const price = item.price;
      const searchTerm = searchInput.toLowerCase();
      return (
        itemName.includes(searchTerm) ||
        price.includes(searchTerm) ||
        size.includes(searchTerm) ||
        status.includes(searchInput)
      );
    })
    .sort((a, b) => {
      switch (filterOption) {
        case "pending":
          return a.processing === "pending" ? -1 : 1;
        case "complete":
          return a.processing === "completed" ? -1 : 1;
        case "sent for sewing":
          return a.processing === "sent for sewing" ? -1 : 1;
        case "a to z":
          return a.name.localeCompare(b.name);
        case "high to low":
          return b.price - a.price;
        case "by date":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
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

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          {/* Search Bar */}
          <SearchBar
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
          />
        </div>
        {/* Filter Select with Search */}
        <Select value={filterOption} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="sent for sewing">Sent for Sewing</SelectItem>
            <SelectItem value="a to z">A to Z</SelectItem>
            <SelectItem value="high to low">High to Low</SelectItem>
            <SelectItem value="by date">By Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <div className="rounded-t-[10px] border ">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-300">
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total price</TableHead>
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
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.price * item.quantity}</TableCell>
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
