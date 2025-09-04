/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { CalendarIcon, FilterIcon, PlusIcon, TrashIcon } from "lucide-react";

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
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { invoiceSchema } from "../lib/utils";
import { type Invoice, type InvoiceFormValues } from "../types/types";
import { useInvoice } from "@/context/useInvoice";
import FormSheet from "./FormSheet";

function InvoiceList() {
  const [statusFilter, setStatusFilter] = useState("");

  const [openSheet, setOpenSheet] = React.useState(false);
  const { state, dispatch } = useInvoice();

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  return (
    <div className="w-full min-h-screen lg:w-3/5   lg:mx-auto  px-4   py-3 pt-20 lg:pt-3  ">
      <div
        id="header"
        className="  flex justify-between items-center   py-5  mt-3  "
      >
        <div>
          <h2 className="text-3xl md:text-3xl font-bold leading-4 ">
            Invoices
          </h2>
          <p className="text-sm text-slate-500 font-semibold leading-6 mt-2">
            {state.invoices.length} Invoices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-28 border-none shadow-none [&>svg]:text-[#7c5dfa]  ">
                <SelectValue
                  className="font-bold hidden md:block"
                  style={{ color: "#7c5dfa", fontWeight: "bold" }}
                  defaultValue={statusFilter}
                  //placeholder="Filter"
                />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:hidden">
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger
                className="w-12 h-12 p-0 rounded-full flex items-center justify-center border-none bg-transparent shadow-none  "
                style={{
                  backgroundImage: "none", // Removes default chevron background if any
                }}
              >
                <FilterIcon className="h-5 w-5 text-[#7c5dfa] md:hidden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FormSheet
            openSheet={openSheet}
            setOpenSheet={setOpenSheet}
            currentInvoice={state.selectedInvoice ?? null}
            triggerButton={
              <Button
                type="button"
                variant="outline"
                className="p-0 m-0 px-2 md:py-5 bg-[#7c5dfa] border border-black rounded-full text-white hover:bg-[#7c5dfa]/90 hover:text-white flex  justify-start gap-3 items-center  h-[48px] "
              >
                <div className="size-8   rounded-full bg-white grid place-items-center  ">
                  <PlusIcon className="size-3  font-bold text-[#7c5dfa] bg-white rounded-full p-0 m-0  " />
                </div>
                <span className="hidden md:block font-bold pr-3">
                  New Invoice
                </span>
                <span className="md:hidden font-bold pr-4">New</span>
              </Button>
            }
          />
        </div>
      </div>
      <div>
        {state.invoices.length === 0 && (
          <div className="text-slate-600 text-2xl flex items-center justify-center mt-40">
            No Invoices
          </div>
        )}
        {state.invoices.map((invoice) => (
          <InvoiceTile invoice={invoice} key={invoice.id} />
        ))}
      </div>
    </div>
  );
}

export default InvoiceList;
