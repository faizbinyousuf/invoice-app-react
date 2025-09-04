import { useContext } from "react";
import { InvoiceContext } from "./invoiceContext";

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context)
    throw new Error("useInvoice must be used inside InvoiceContextProvider");
  return context;
};
