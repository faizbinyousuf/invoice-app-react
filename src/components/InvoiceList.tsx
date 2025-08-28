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
import { Card, CardContent } from "./ui/card";

function InvoiceList() {
  const [statusFilter, setStatusFilter] = React.useState("");

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };
  return (
    <div className="w-full min-h-screen lg:w-3/4    lg:mx-auto  px-1.5 md:px-3 py-3 pt-20 lg:pt-3  ">
      <div
        id="header"
        className=" lg:sticky z-40 top-0 flex justify-between items-center   py-5  mt-8  "
      >
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-sm text-gray-500">Total invoices: 12</p>
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
            className="bg-[#7c5dfa] rounded-3xl text-white hover:bg-[#7c5dfa]/90 hover:text-white flex items-cente px-2 py-6"
          >
            <div className="size-9 rounded-full bg-white grid place-items-center  ">
              <PlusIcon className="size-4 text-[#7c5dfa] bg-white rounded-full " />
            </div>
            New Invoice
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto md:max-h-[calc(100vh-14rem)]  max-h-[calc(100vh-15rem)] lg:max-h-[calc(100vh-10rem)]">
        {[...Array(20)].map((_, index) => (
          <InvoiceTile key={index} />
        ))}
      </div>
    </div>
  );
}

export default InvoiceList;
function InvoiceTile() {
  return (
    <Card className="rounded-sm shadow-xs hover:shadow-md hover:cursor-pointer   hover:border hover:border-[#7c5dfa] my-3">
      <CardContent className="flex justify-between items-center">
        <div className="flex justify-between md:gap-8 gap-4 text-[12px] md:text-sm lg:text-base ">
          <p className="font-bold text-[#7c5dfa">#12345</p>
          <p className="text-gray-500">2021-08-21</p>
          <p className="text-gray-500">Alex John</p>
        </div>
        <div className="flex justify-between md:gap-8 gap-4 items-center">
          <p className="font-bold text-sm md:text-base">$120</p>
          <div className="md:px-6 px-3 text-sm md:text-base py-2.5 bg-orange-100 rounded-sm font-semibold text-orange-400">
            <span className="bg-orange-400 rounded-full inline-block w-2 h-2 mr-2.5"></span>
            status
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
