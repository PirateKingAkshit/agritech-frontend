import React from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
    >
      <div className="bg-white dark:bg-background rounded-xl shadow-xl w-full max-w-sm p-6 relative animate-in fade-in-0 zoom-in-95">
        {/* Close Icon (optional) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <h2 id="delete-title" className="text-lg font-semibold text-foreground">
          Confirm Deletion
        </h2>
        <p id="delete-description" className="text-sm text-muted-foreground mt-2">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-input text-foreground hover:bg-muted transition"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
