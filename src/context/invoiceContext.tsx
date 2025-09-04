import type { InvoiceAction, InvoiceState } from "@/types/types";
import React, { createContext } from "react";

type InvoiceContextType = {
  state: InvoiceState;
  dispatch: React.Dispatch<InvoiceAction>;
};

export const InvoiceContext = createContext<InvoiceContextType | undefined>(
  undefined
);

// const InvoiceContext = createContext({});

// const InvoiceContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [invoiceState, setInvoiceState] = useState();
//   return (
//     <InvoiceContext.Provider value={{ invoiceState, setInvoiceState }}>
//       {children}
//     </InvoiceContext.Provider>
//   );
// };

// export { InvoiceContext, InvoiceContextProvider };
