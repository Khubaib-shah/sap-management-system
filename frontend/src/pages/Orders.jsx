import React, { useContext, useEffect, useState } from "react";
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
import {
  getInventoryItems,
  updateInventoryItem,
} from "@/services/InventoryApi";
import { Link } from "react-router-dom";

function Orders() {
  // States for dialog visibility and selected order
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
  // Filter pending orders
  const pendingOrders = items?.filter(
    (order) => order.processing === "pending"
  );

  // Function to determine badge variant based on order status
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

  // Function to handle action button click (open dialog and set selected order)
  const handleActionClick = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Function to handle status update
  const handleStatusUpdate = async (status) => {
    if (selectedOrder) {
      const updatedOrder = { ...selectedOrder, processing: status };

      try {
        // Ensure order ID is present
        if (!selectedOrder?._id) {
          console.error("Order ID is missing");
          return;
        }

        // Update local items state
        const updatedOrders = items.map((order) =>
          order._id === selectedOrder?._id ? updatedOrder : order
        );
        setItems(updatedOrders);

        // Update order status in backend (API call)
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

      {/* Table to display pending orders */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs md:text-sm">Order ID</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* If no pending orders, show message */}
            {pendingOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-2">
                  <h2 className="px-2 py-1">No Pending Order Available</h2>
                </TableCell>
              </TableRow>
            ) : (
              // Map through each pending order and display in table rows
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
                      onClick={() => handleActionClick(order)} // Trigger dialog on action click
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

      {/* Alert Dialog for viewing order details and taking action */}
      <AlertDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        className="rounded"
      >
        <AlertDialogContent className="bg-white max-w-[95%] sm:max-w-md md:max-w-xl lg:max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-800 text-left">
              Order Details
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              {selectedOrder && (
                <div className="space-y-3 w-full capitalize px-4 py-2">
                  {/* Display selected order details */}
                  <div className="flex justify-between gap-2">
                    <strong>Order ID:</strong>
                    <p className="break-words">{selectedOrder._id.slice(-6)}</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    <strong>From:</strong>
                    <p className="break-words">{selectedOrder.name}</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    <strong>Items:</strong>
                    <p className="break-words">{selectedOrder.companyName}</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    <strong>Status:</strong>
                    <p className="break-words">{selectedOrder.processing}</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    <strong>Date:</strong>
                    <p className="break-words">
                      {new Date(selectedOrder.createdAt).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            {/* Action buttons */}
            <AlertDialogCancel className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <Button
              variant="default"
              className="w-full sm:w-auto"
              onClick={() => handleStatusUpdate("sent for sewing")}
            >
              Sent for Sewing
            </Button>

            {/* Link to view and download inventory */}
            <Button variant="default" className="w-full sm:w-auto">
              <Link
                to={`/inventory/${selectedOrder?._id}`}
                className="w-full block"
              >
                View & Download
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
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
