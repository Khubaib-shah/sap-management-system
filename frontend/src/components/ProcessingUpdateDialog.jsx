import React from "react";
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

const ProcessingUpdateDialog = ({
  isOpen,
  onOpenChange,
  selectedItem,
  onStatusUpdate,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange} className="rounded">
      <AlertDialogContent className="bg-white max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-gray-800">
            Update Order Status
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {selectedItem && (
              <div className="space-y-3 mt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Item:</span>
                  <span>{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Company:</span>
                  <span>{selectedItem.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Current Status:</span>
                  <span className="capitalize">{selectedItem.processing}</span>
                </div>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <Button
            variant="default"
            className="w-full"
            onClick={() => onStatusUpdate("completed")}
          >
            Mark as Completed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProcessingUpdateDialog;
