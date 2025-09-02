export interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  client: string;
  amount: number;
  status: string;
  description: string;
}

export interface Item {
  name: string;
  qty: number;
  price: number;
}

export interface InvoiceFormValues {
  billFrom: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  billTo: {
    name: string;
    email: string;
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  invoiceDate: Date | null;
  paymentTerms: string;
  projectDescription: string;
  items: Item[];
}
