import React, { useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ItemsContext } from "@/context/ItemsContext";
import { updateInventoryItem } from "@/services/InventoryApi";
import { Link } from "react-router-dom";

function Orders() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { items, setItems } = useContext(ItemsContext);
  console.log(selectedOrder);
  const pendingOrders = items?.filter(
    (order) => order.processing === "pending"
  );

  const getStatusBadge = (status) => {
    const variants = {
      Pending: "default",
      "In Progress": "warning",
      Completed: "success",
    };

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

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

        console.log(selectedOrder._id);
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
              <TableHead>School/Store</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingOrders.length === 0 ? (
              <h2 className="px-2 py-1">No Pending Order Availible</h2>
            ) : (
              pendingOrders?.map((order) => (
                <TableRow key={order._id} className="capitalize">
                  <TableCell>{order._id.slice(-6)}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.companyName}</TableCell>
                  <TableCell>{getStatusBadge(order.processing)}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
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

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Order Details</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedOrder && (
                <div className="space-y-2 capitalize px-5">
                  <div className="flex justify-between">
                    <strong>Order ID:</strong>{" "}
                    <p className="w-1/5">
                      {selectedOrder && selectedOrder._id.slice(-6)}
                    </p>
                  </div>
                  <div className="flex justify-between ">
                    <strong>School/Store:</strong>{" "}
                    <p className=" w-1/5">{selectedOrder.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <strong>Items:</strong>
                    <p className="w-1/5"> {selectedOrder.companyName}</p>
                  </div>
                  <div className="flex justify-between">
                    <strong>Status:</strong>
                    <p className="w-1/5"> {selectedOrder.processing}</p>
                  </div>
                  <div className="flex justify-between">
                    <strong>Date:</strong>
                    <p className="w-1/5">
                      {" "}
                      {new Date(selectedOrder.createdAt).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="default"
              onClick={() => handleStatusUpdate("sent for sewing")}
            >
              Sent for Sewing
            </Button>

            <Button variant="default">
              <Link to={`/inventory/${selectedOrder && selectedOrder?._id}`}>
                View & Download
              </Link>
            </Button>

            <Button
              variant="success"
              onClick={() => handleStatusUpdate("completed")}
            >
              Complete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Orders;
