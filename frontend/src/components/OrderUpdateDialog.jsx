import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const OrderUpdateDialog = ({
  isOpen,
  onOpenChange,
  selectedOrder,
  onStatusUpdate,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange} className="rounded">
      <AlertDialogContent className="bg-white max-w-[95%] sm:max-w-md md:max-w-xl lg:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-gray-800 text-left">
            Order Details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {selectedOrder && (
              <div className="space-y-3 w-full capitalize px-4 py-2">
                <div className="flex justify-between gap-2">
                  <strong>Order ID:</strong>
                  <p className="break-words">{selectedOrder._id.slice(-6)}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <strong>From:</strong>
                  <p className="break-words">{selectedOrder.name}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <strong>Status:</strong>
                  <p className="break-words">{selectedOrder.processing}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <strong>Date:</strong>
                  <p className="break-words">
                    {new Date(selectedOrder.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel className="w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <Button
            variant="default"
            className="w-full sm:w-auto"
            onClick={() => onStatusUpdate("sent for sewing")}
          >
            Sent for Sewing
          </Button>

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
            onClick={() => onStatusUpdate("completed")}
          >
            Complete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderUpdateDialog;
