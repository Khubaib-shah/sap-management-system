import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getInventoryItems,
  updateInventoryItem,
} from "@/services/InventoryApi";
import OrderUpdateDialog from "@/components/OrderUpdateDialog";
import { Button } from "@/components/ui/button";

function Orders() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getInventoryItems();
      setItems(data);
    };
    fetchData();
  }, []);

  const pendingOrders = items?.filter(
    (order) => order.processing === "pending"
  );

  const handleActionClick = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleStatusUpdate = async (status) => {
    if (selectedOrder) {
      const updatedOrder = { ...selectedOrder, processing: status };

      try {
        if (!selectedOrder?._id) {
          console.error("Order ID is missing");
          return;
        }

        const updatedOrders = items.map((order) =>
          order._id === selectedOrder?._id ? updatedOrder : order
        );
        setItems(updatedOrders);

        await updateInventoryItem(selectedOrder._id, { processing: status });
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="md:text-3xl font-bold">Order Management</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs md:text-sm">Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-2">
                  <h2 className="px-2 py-1">No Pending Order Available</h2>
                </TableCell>
              </TableRow>
            ) : (
              pendingOrders?.map((order) => (
                <TableRow key={order._id} className="capitalize">
                  <TableCell>{order._id.slice(-6)}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell className="underline">
                    {order.processing}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      month: "numeric",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleActionClick(order)}
                    >
                      Take Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <OrderUpdateDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedOrder={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}

export default Orders;
