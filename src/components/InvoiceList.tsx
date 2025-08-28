import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

import { invoices } from "@/utils/data";
import InvoiceTile from "./InvoiceTile";

function InvoiceList() {
  const [statusFilter, setStatusFilter] = React.useState("");

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };
  return (
    <div className="w-full min-h-screen lg:w-3/5   lg:mx-auto  px-1.5 md:px-3 py-3 pt-20 lg:pt-3  ">
      <div
        id="header"
        className="  flex justify-between items-center   py-5  mt-8  "
      >
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-sm text-gray-500">
            Total invoices: {invoices.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-28">
              <SelectValue
                style={{ color: "#7c5dfa", fontWeight: "bold" }}
                defaultValue={statusFilter}
                placeholder="Filter"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            className="bg-[#7c5dfa] rounded-3xl text-white hover:bg-[#7c5dfa]/90 hover:text-white flex items-center px-2 py-6"
          >
            <div className="size-9 rounded-full bg-white grid place-items-center  ">
              <PlusIcon className="size-4 text-[#7c5dfa] bg-white rounded-full " />
            </div>
            New Invoice
          </Button>
        </div>
      </div>
      <div>
        {invoices.map((invoice) => (
          <InvoiceTile invoice={invoice} key={invoice.id} />
        ))}
      </div>
      {/* <div className="overflow-y-auto md:max-h-[calc(100vh-14rem)]  max-h-[calc(100vh-15rem)] lg:max-h-[calc(100vh-10rem)]">
        {invoices.map((invoice) => (
          <InvoiceTile invoice={invoice} key={invoice.id} />
        ))}
      </div> */}
    </div>
  );
}

export default InvoiceList;
