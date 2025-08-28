import type { Invoice } from "@/types/types";
import React from "react";
interface InvoiceDetailProps {
  invoice: Invoice;
}
function InvoiceDetails({ invoice }: InvoiceDetailProps) {
  return (
    <div>
      {invoice.invoiceNumber}
      {invoice.date}
      {invoice.client}
      {invoice.amount}
      {invoice.status}
    </div>
  );
}

export default InvoiceDetails;
