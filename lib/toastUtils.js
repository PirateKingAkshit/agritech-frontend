import { toast } from "sonner";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const showSuccess = (message) =>
  toast.success(message, {
    icon: <CheckCircle2 className="text-green-700" />, // deeper green for agriculture
    className:
      "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 border-green-700 border",
  });

export const showInfo = (message) =>
  toast(message, {
    icon: <Info className="text-amber-900" />, // brown/earthy
    className:
      "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100 border-amber-900 border",
  });

export const showWarning = (message) =>
  toast.warning(message, {
    icon: <AlertTriangle className="text-yellow-700" />, // golden yellow
    className:
      "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-700 border",
  });

export const showError = (message) =>
  toast.error(message, {
    icon: <XCircle className="text-orange-800" />, // deep orange
    className:
      "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100 border-orange-800 border",
  });
