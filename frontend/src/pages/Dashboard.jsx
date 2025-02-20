import React, { useEffect, useState } from "react";
import { Package2, ShoppingCart, ClipboardList, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInventoryItems } from "@/services/InventoryApi";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [items, setItems] = useState([]);
  // Fetch the inventory items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await getInventoryItems();
      setItems(data);
    };
    fetchItems();
  }, []); // Empty dependency array ensures this runs once on mount

  const navigate = useNavigate();

  // Calculate counts for different item statuses
  const pendingItems = items?.filter(
    (item) => item.processing === "pending"
  ).length;
  const processingItems = items?.filter(
    (item) => item.processing === "sent for sewing"
  ).length;
  const completedItems = items?.filter(
    (item) => item.processing === "completed"
  ).length;

  // Total items in stock (excluding completed ones)
  const totalInStock = items?.filter(
    (item) => item.processing !== "completed"
  ).length;

  // Define the summary card data
  const summaryCards = [
    {
      title: "Total Inventory",
      value: totalInStock,
      description: "Active items in stock",
      icon: Package2,
      trend: "+4.5% from last month",
    },
    {
      title: "Pending Orders",
      value: pendingItems,
      description: "Awaiting processing",
      icon: ShoppingCart,
      trend: "-2 from yesterday",
    },
    {
      title: "Processing",
      value: processingItems,
      description: "Items in production",
      icon: ClipboardList,
      trend: "On track",
    },
    {
      title: "Sold Out Items",
      value: completedItems,
      description: "Total number of items sold out",
      icon: Check,
      trend: "Stable",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-lg font-bold md:text-3xl">Dashboard</h1>

      {/* Grid layout for displaying summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Loop through summary cards and display each card */}
        {summaryCards.map((card, index) => (
          <Card
            className="cursor-pointer"
            key={index}
            onClick={() => {
              // Navigate to the appropriate page based on the card clicked
              card?.title === "Pending Orders"
                ? navigate("/orders")
                : card?.title === "Processing"
                ? navigate("/processing")
                : card?.title === "Sold Out Items"
                ? navigate("/complete")
                : "/";
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              {/* Card Title */}
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {/* Icon */}
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* Card Value */}
              <div className="text-2xl font-bold">{card.value}</div>
              {/* Card Description */}
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
              {/* Card Trend */}
              <p className="mt-2 text-xs text-muted-foreground">{card.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
