export interface Invoice {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  amount: number;
  status: string;
  projectDescription: string;

  items: Item[];
  billTo: BillTo;
  billFrom: BillFrom;
  paymentTerms: string;
}

interface BillTo {
  name: string;
  email: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface BillFrom {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  qty: number;
  price: number;
  total: number;
}

export interface InvoiceFormValues {
  billFrom: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo: {
    name: string;
    email: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  invoiceDate: Date | null;
  paymentTerms: string;
  projectDescription: string;
  items: Item[];
}

export type InvoiceState = {
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  invoiceFormValues: InvoiceFormValues;
  isEditing: boolean;
  isOpen: boolean;
  isLoading: boolean;
  errorMessage: string;
};

// Actions
export type InvoiceAction =
  | { type: "SET_INVOICES"; payload: Invoice[] }
  | { type: "ADD_INVOICE"; payload: Invoice }
  | { type: "UPDATE_INVOICE"; payload: Invoice }
  | { type: "DELETE_INVOICE"; payload: number }
  | { type: "EDIT_INVOICE"; payload: Invoice }
  | { type: "SET_SELECTED_INVOICE"; payload: Invoice | null }
  | { type: "RESET_INVOICE_FORM_VALUES" }
  | { type: "SET_INVOICE_FORM_VALUES"; payload: InvoiceFormValues };
// | { type: "SET_IS_EDITING"; payload: boolean }
// | { type: "SET_IS_OPEN"; payload: boolean }
// | { type: "SET_IS_LOADING"; payload: boolean }
// | { type: "SET_ERROR_MESSAGE"; payload: string }
