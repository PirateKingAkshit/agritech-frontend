import { toast } from "sonner";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const showSuccess = (message) =>
  toast.success(message, {
    icon: <CheckCircle2 className="text-green-500" />,
    className:
      "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100",
  });

export const showInfo = (message) =>
  toast(message, {
    icon: <Info className="text-blue-500" />,
    className:
      "bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  });

export const showWarning = (message) =>
  toast.warning(message, {
    icon: <AlertTriangle className="text-yellow-500" />,
    className:
      "bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  });

export const showError = (message) =>
  toast.error(message, {
    icon: <XCircle className="text-red-500" />,
    className:
      "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100",
  });
