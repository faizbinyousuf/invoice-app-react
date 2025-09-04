import { useReducer } from "react";
import { InvoiceContext } from "../context/invoiceContext";
import invoiceReducer from "./invoiceReducer";
import type { InvoiceState } from "@/types/types";
import { invoices } from "@/utils/data";

const initialState: InvoiceState = {
  invoices: invoices,
  selectedInvoice: null,
  invoiceFormValues: {
    billFrom: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: {
      name: "",
      email: "",
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    invoiceDate: null,
    paymentTerms: "",
    projectDescription: "",
    items: [],
  },
  isEditing: false,
  isOpen: false,
  isLoading: false,
  errorMessage: "",
};

export const InvoiceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};
