import { useContext, useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ItemsContext } from "@/context/ItemsContext";

function Reports() {
  const { items } = useContext(ItemsContext);
  const [filterPeriod, setFilterPeriod] = useState("daily"); // Default filter: daily

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

      if (period === "daily") {
        return diffTime <= 24 * 60 * 60 * 1000; // Within the last 24 hours
      } else if (period === "weekly") {
        return diffTime <= 7 * 24 * 60 * 60 * 1000; // Within the last 7 days
      } else if (period === "monthly") {
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
      const itemPrice = parseFloat(item.price); // Ensure price is a number
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

  // Dynamic chart data for inventory (grouped by month)
  const generateDynamicChartData = (items) => {
    // Initialize chart data with zero values for each status
    const chartData = {
      completed: [],
      pending: [],
      sentForSewing: [],
    };

    // Get all unique months
    const months = [
      ...new Set(
        items.map((item) =>
          new Date(item.createdAt).toLocaleString("default", { month: "short" })
        )
      ),
    ];

    // Sort months to ensure they are in the correct order
    months.sort((a, b) => {
      const dateA = new Date(Date.parse(a + " 1, 2020"));
      const dateB = new Date(Date.parse(b + " 1, 2020"));
      return dateA - dateB;
    });

    // Initialize the chart data with months and zero totals
    months.forEach((month) => {
      chartData.completed.push({ name: month, total: 0 });
      chartData.pending.push({ name: month, total: 0 });
      chartData.sentForSewing.push({ name: month, total: 0 });
    });

    // Now group items by month and status
    items.forEach((item) => {
      const itemDate = new Date(item.createdAt);
      const month = itemDate.toLocaleString("default", { month: "short" }); // Get abbreviated month name
      const status = item.processing;

      if (status === itemStatus.COMPLETED) {
        const monthData = chartData.completed.find(
          (data) => data.name === month
        );
        if (monthData) monthData.total += 1;
      } else if (status === itemStatus.PENDING) {
        const monthData = chartData.pending.find((data) => data.name === month);
        if (monthData) monthData.total += 1;
      } else if (status === itemStatus.SENT_FOR_SEWING) {
        const monthData = chartData.sentForSewing.find(
          (data) => data.name === month
        );
        if (monthData) monthData.total += 1;
      }
    });

    return chartData;
  };

  const dynamicChartData = generateDynamicChartData(filteredItems);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>

        <div className="flex flex-wrap gap-4">
          <Select onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dynamic Charts */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Completed Items Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dynamicChartData.completed}>
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  dataKey="total"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Items Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dynamicChartData.pending}>
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  dataKey="total"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sent for Sewing Items Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sent for Sewing Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dynamicChartData.sentForSewing}>
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  dataKey="total"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Summary</h3>
        <p>Total Price of Completed Items: PKR {priceByStatus.completed}</p>
        <p>Total Price of Pending Items: PKR {priceByStatus.pending}</p>
        <p>
          Total Price of Sent for Sewing Items: PKR{" "}
          {priceByStatus.sentForSewing}
        </p>
        <p>Total Filtered Items: {filteredItems.length}</p>
      </div>
    </div>
  );
}

export default Reports;
