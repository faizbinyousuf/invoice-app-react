export interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  client: string;
  amount: number;
  status: string;
  description: string;
}
