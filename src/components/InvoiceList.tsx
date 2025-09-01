import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { CalendarIcon, PlusIcon, TrashIcon } from "lucide-react";

import { invoices } from "@/utils/data";
import InvoiceTile from "./InvoiceTile";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
function InvoiceList() {
  const [statusFilter, setStatusFilter] = useState("");
  const [openDate, setOpenDate] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(undefined);

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
            <SelectTrigger
              className="w-28 border-none shadow-none [&>svg]:text-[#7c5dfa]"
              // style={{ color: "#7c5dfa", fontWeight: "bold" }}
            >
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

          <Sheet>
            <SheetTrigger asChild>
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
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:max-w-lg ml-0 lg:ml-24 p-0 mt-24   grid "
            >
              <div className="  overflow-y-auto p-6  ">
                <SheetHeader className="p-0 m-0">
                  <SheetTitle className="text-2xl font-bold">
                    Create invoice
                  </SheetTitle>
                </SheetHeader>
                <div className="grid  auto-rows-min gap-6 py-5 ">
                  <h3 className="font-bold text-[#7c5dfa]">Bill from</h3>
                  <div className="grid gap-3">
                    <Label htmlFor="street-address">Street address</Label>
                    <Input id="street-address" className="h-12" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" className="h-12" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="postcode">Postcode</Label>
                      <Input id="postcode" className="h-12" />
                    </div>
                    <div className="grid gap-3 col-span-2 md:col-span-1">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" className="h-12" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#7c5dfa]">Bill To</h3>
                  <div className="grid gap-3">
                    <Label htmlFor="client-name">Client's Name</Label>
                    <Input id="client-name" className="h-12" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="client-email">Client's Email</Label>
                    <Input id="client-email" className="h-12" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="street-address-client">
                      Street address
                    </Label>
                    <Input id="street-address-client" className="h-12" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="city-client">City</Label>
                      <Input id="city-client" className="h-12" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="postcode-client">Postcode</Label>
                      <Input id="postcode-client" className="h-12" />
                    </div>
                    <div className="grid gap-3 col-span-2 md:col-span-1">
                      <Label htmlFor="country-client">Country</Label>
                      <Input id="country-client" className="h-12" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-3  ">
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="postcode-client">Invoice Date</Label>
                      <Popover
                        open={openDate}
                        onOpenChange={setOpenDate}
                        key={"date-picker"}
                        modal={true}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className=" data-[empty=true]:text-muted-foreground   justify-start text-left font-normal h-12"
                          >
                            <CalendarIcon />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-3 flex-1    ">
                      <Label htmlFor="payment-terms">Payment Terms</Label>
                      <Select onValueChange={(value) => console.log(value)}>
                        <SelectTrigger className="w-full min-h-12 ">
                          <SelectValue placeholder="Select a term" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            { id: 1, name: "14 days" },
                            { id: 2, name: "30 days" },
                            { id: 3, name: "60 days" },
                          ].map((exec) => (
                            <SelectItem key={exec.id} value={exec.name}>
                              {exec.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="project">Project Description</Label>
                    <Input id="project" className="h-12" />
                  </div>
                  <h2 className="text-2xl font-bold">Item List</h2>
                  <div className="grid gap-3 grid-cols-12 items-center ">
                    <div className="grid gap-3 col-span-12 md:col-span-5  ">
                      <Label htmlFor="item-name">Item name</Label>
                      <Input id="item-name" className="h-12" />
                    </div>
                    <div className="grid gap-3 col-span-3 md:col-span-2">
                      <Label htmlFor="item-qty">Qty</Label>
                      <Input id="item-qty" className="h-12" />
                    </div>
                    <div className="grid gap-3 col-span-5 md:col-span-2  ">
                      <Label htmlFor="item-price">Price</Label>
                      <Input id="item-price" className="h-12" />
                    </div>
                    <div className="grid gap-3 col-span-2 md:col-span-2">
                      <Label htmlFor="item-total">Total</Label>
                      <Input
                        id="item-total"
                        type="text"
                        readOnly
                        value={"$0.00"}
                        className="h-12 border-none shadow-none font-bold text-gray-500"
                      />
                    </div>
                    <div className="grid gap-3 place-content-center pt-5 col-span-2 md:col-span-1">
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-5 w-5 text-gray-600 font-bold" />
                      </Button>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">Save changes</Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
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
