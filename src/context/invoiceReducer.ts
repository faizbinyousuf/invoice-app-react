import type { InvoiceAction, InvoiceState } from "@/types/types";

function invoiceReducer(
  state: InvoiceState,
  action: InvoiceAction
): InvoiceState {
  switch (action.type) {
    case "ADD_INVOICE":
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    case "UPDATE_INVOICE":
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        ),
        selectedInvoice: action.payload,
      };
    case "DELETE_INVOICE":
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        ),
      };
    case "SET_INVOICES":
      return {
        ...state,
        invoices: action.payload,
      };
    case "SET_SELECTED_INVOICE":
      return {
        ...state,
        selectedInvoice: action.payload,
      };
    case "SET_INVOICE_FORM_VALUES":
      return {
        ...state,
        invoiceFormValues: action.payload,
      };

    case "RESET_INVOICE_FORM_VALUES": {
      return {
        ...state,
        invoices: [],
        selectedInvoice: null,
        invoiceFormValues: {
          paymentTerms: "",

          billFrom: {
            street: "",
            city: "",
            postCode: "",
            country: "",
          },
          billTo: {
            street: "",
            city: "",
            postCode: "",
            country: "",
            name: "",
            email: "",
          },
          items: [],
          invoiceDate: null,
          projectDescription: "",
        },
        isEditing: false,
        isOpen: false,
        isLoading: false,
        errorMessage: "",
      };
    }
    default:
      return state;
  }
}

export default invoiceReducer;
