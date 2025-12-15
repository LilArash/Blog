import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ToastType, Toast, ToastContextType } from "../types";
import ToastModal from "../Components/ToastModal";

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (toast: Toast) => {
    setToast(toast);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      { toast && <ToastModal {...toast}/>}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
