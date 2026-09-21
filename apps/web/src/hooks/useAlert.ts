import { useState, useCallback } from "react";

export type AlertSeverity = "success" | "error" | "warning" | "info";

export interface AlertState {
  message: string;
  severity: AlertSeverity;
  open: boolean;
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    message: "",
    severity: "info",
    open: false,
  });

  const showAlert = useCallback(
    (message: string, severity: AlertSeverity = "info", duration = 3000) => {
      setAlert({
        message,
        severity,
        open: true,
      });

      const timer = setTimeout(() => {
        setAlert((prev) => ({
          ...prev,
          open: false,
        }));
      }, duration);

      return () => clearTimeout(timer);
    },
    [],
  );

  const closeAlert = useCallback(() => {
    setAlert((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  return { alert, showAlert, closeAlert };
};
