import { useContext, useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemsContext } from "@/context/ItemsContext";
import { getInventoryItems } from "@/services/InventoryApi";

function Reports() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getInventoryItems();
      setItems(data);
    };
    fetchData();
  }, []);
  console.log(items);
  const [filterPeriod, setFilterPeriod] = useState("Month");

  // Enum for item status
  const itemStatus = {
    COMPLETED: "completed",
    PENDING: "pending",
    SENT_FOR_SEWING: "sent for sewing",
  };

  // Function to filter the items based on selected date
  const filterItemsByDate = (items, period) => {
    const now = new Date();
    return items.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const diffTime = now - itemDate;

      if (period === "Daily") {
        return diffTime <= 24 * 60 * 60 * 1000; // Within the last 24 hours
      } else if (period === "Weekly") {
        return diffTime <= 7 * 24 * 60 * 60 * 1000; // Within the last 7 days
      } else if (period === "Monthly") {
        return (
          itemDate.getMonth() === now.getMonth() &&
          itemDate.getFullYear() === now.getFullYear()
        ); // This month
      }
      return true; // Default to no filtering
    });
  };

  // Function to calculate the total price for each status
  const calculateTotalPriceByStatus = (items) => {
    const totals = {
      completed: 0,
      pending: 0,
      sentForSewing: 0,
    };

    items.forEach((item) => {
      const itemPrice = parseFloat(item.price);
      if (isNaN(itemPrice)) return; // Skip if price is invalid

      // Add the price to the correct status group
      switch (item.processing) {
        case itemStatus.COMPLETED:
          totals.completed += itemPrice;
          break;
        case itemStatus.PENDING:
          totals.pending += itemPrice;
          break;
        case itemStatus.SENT_FOR_SEWING:
          totals.sentForSewing += itemPrice;
          break;
        default:
          break;
      }
    });

    return totals;
  };

  // Processed inventory data based on selected period
  const filteredItems = useMemo(
    () => filterItemsByDate(items, filterPeriod),
    [items, filterPeriod]
  );

  // Calculate price totals for each status
  const priceByStatus = calculateTotalPriceByStatus(filteredItems);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>

        <div className="flex flex-wrap gap-4">
          <Select onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center py-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {filterPeriod}
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-600">
              Total Price of Completed Items:
            </span>
            <span className="font-medium text-gray-800">
              PKR {priceByStatus.completed}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-600">Total Price of Pending Items:</span>
            <span className="font-medium text-gray-800">
              PKR {priceByStatus.pending}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-600">
              Total Price of Sent for Sewing Items:
            </span>
            <span className="font-medium text-gray-800">
              PKR {priceByStatus.sentForSewing}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-600">Total Filtered Items:</span>
            <span className="font-medium text-gray-800">
              {filteredItems.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
