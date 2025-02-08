import React, { useContext, useEffect } from "react";
import { Package2, ShoppingCart, ClipboardList, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemsContext } from "@/context/ItemsContext";
import { getInventoryItems } from "@/services/InventoryApi";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { items, setItems } = useContext(ItemsContext);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await getInventoryItems();
      setItems(data);
    };
    fetchItems();
  }, []);
  const navigate = useNavigate();
  const pendingItems = items?.filter(
    (item) => item.processing === "Pending"
  ).length;
  const processingItems = items?.filter(
    (item) => item.processing === "sent for sewing"
  ).length;
  const completedItems = items?.filter(
    (item) => item.processing === "Completed"
  ).length;

  const totalInStock = items?.filter(
    (item) => item.processing !== "Completed"
  ).length;

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
      <h1 className="text-lg font-bold md:text-3xl">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <Card
            key={index}
            onClick={(e) => {
              card?.title === "Pending Orders"
                ? navigate("/orders")
                : card?.title === "Processing"
                ? navigate("/processing")
                : "/";
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{card.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
