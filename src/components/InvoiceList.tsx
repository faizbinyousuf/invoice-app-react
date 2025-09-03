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
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { invoiceSchema } from "../lib/utils";
import { type InvoiceFormValues } from "../types/types";

function InvoiceList() {
  const [statusFilter, setStatusFilter] = useState("");
  const [openDate, setOpenDate] = React.useState(false);

  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const initialValues: InvoiceFormValues = {
    billFrom: { street: "", city: "", postcode: "", country: "" },
    billTo: {
      name: "",
      email: "",
      street: "",
      city: "",
      postcode: "",
      country: "",
    },
    invoiceDate: null,
    paymentTerms: "",
    projectDescription: "",
    items: [{ name: "", qty: 1, price: 0, total: 0 }],
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
            {invoices.length} Invoices
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

          <Sheet>
            <SheetTrigger asChild>
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
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:max-w-lg ml-0 lg:ml-16 p-0 mt-16 lg:mt-0  grid "
            >
              <Formik
                initialValues={initialValues}
                validationSchema={invoiceSchema}
                onSubmit={(values) => {
                  console.log("Form Submitted ✅", values);
                }}
              >
                {/* { values, errors, touched,  setFieldValue } */}
                {(formik) => (
                  <Form className="  overflow-y-auto p-6  ">
                    <SheetHeader className="p-0 m-0">
                      <SheetTitle className="text-2xl font-bold text-[#888EAF]">
                        Create invoice
                      </SheetTitle>
                    </SheetHeader>
                    <div className="grid  auto-rows-min gap-6 py-5 ">
                      <h3 className="font-semibold text-[#7c5dfa]">
                        Bill from
                      </h3>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="street-address"
                          className="font-[400] text-[#888EAF] text-[13px]"
                        >
                          Street Address
                        </Label>
                        {/* 
                        <Input id="street-address" className="h-12" /> */}
                        <Field
                          name="billFrom.street"
                          as="input"
                          className="h-12 border border-[#dfe3fa] px-2 rounded-sm w-full"
                          //placeholder="Street"
                        />
                        <ErrorMessage
                          name="billFrom.street"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="grid gap-3">
                          <Label
                            htmlFor="city"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            City
                          </Label>
                          {/* 
                          
                          <Input id="city" className="h-12" /> */}
                          <Field
                            name="billFrom.city"
                            as="input"
                            className="h-12 border px-2 rounded-sm w-full"
                            //placeholder="City"
                          />
                          <ErrorMessage
                            name="billFrom.city"
                            component="p"
                            className="text-red-500 text-[13px]"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label
                            htmlFor="postcode"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            Postcode
                          </Label>
                          {/* 
                          <Input id="postcode" className="h-12" /> */}
                          <Field
                            name="billFrom.postcode"
                            as="input"
                            className="h-12 border px-2 rounded-sm w-full"
                            //placeholder="Postcode"
                          />
                          <ErrorMessage
                            name="billFrom.postcode"
                            component="p"
                            className="text-red-500 text-[13px]"
                          />
                        </div>
                        <div className="grid gap-3 col-span-2 md:col-span-1">
                          <Label
                            htmlFor="country"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            Country
                          </Label>
                          {/* <Label htmlFor="country">Country</Label>
                          <Input id="country" className="h-12" /> */}

                          <Field
                            name="billFrom.country"
                            as="input"
                            className="h-12 border px-2 rounded-sm w-full"
                            //placeholder="Country"
                          />
                          <ErrorMessage
                            name="billFrom.country"
                            component="p"
                            className="text-red-500 text-[13px]"
                          />
                        </div>
                      </div>
                      <h3 className="font-semibold text-[#7c5dfa]">Bill To</h3>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="client-name"
                          className="font-[400] text-[#888EAF] text-[13px]"
                        >
                          Client's Name
                        </Label>
                        <Field
                          name="billTo.name"
                          as="input"
                          className="h-12 border px-2 rounded-sm w-full"
                          //placeholder="Client's Name"
                        />
                        <ErrorMessage
                          name="billTo.email"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="client-email"
                          className="font-[400] text-[#888EAF] text-[13px]"
                        >
                          Client's Email
                        </Label>
                        {/* */}
                        {/* <Input id="client-email" className="h-12" /> */}

                        <Field
                          name="billTo.email"
                          as="input"
                          className="h-12 border px-2 rounded-sm w-full"
                          //placeholder="Client's Email"
                        />
                        <ErrorMessage
                          name="billTo.email"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="street-address-client"
                          className="font-[400] text-[#888EAF] text-[13px]"
                        >
                          Street address
                        </Label>
                        {/*
                        <Input id="street-address-client" className="h-12" /> */}

                        <Field
                          name="billTo.street"
                          as="input"
                          className="h-12 border px-2 rounded-sm w-full"
                          //placeholder="Street"
                        />
                        <ErrorMessage
                          name="billTo.street"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="grid gap-3">
                          <Label
                            htmlFor="city-client"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            City
                          </Label>
                          <Field
                            name="billTo.city"
                            as="input"
                            className="h-12 border px-2 rounded-sm w-full"
                            //placeholder="City"
                          />
                          <ErrorMessage
                            name="billTo.city"
                            component="p"
                            className="text-red-500 text-[13px]"
                          />

                          {/*
                          <Input id="city-client" className="h-12" /> */}
                        </div>
                        <div className="grid gap-3">
                          <Label
                            htmlFor="postcode-client"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            Postcode
                          </Label>
                          {/* 
                          <Input id="postcode-client" className="h-12" /> */}
                          <Field
                            name="billTo.postcode"
                            as="input"
                            className="h-12 border px-2 rounded-sm w-full"
                            //placeholder="Postcode"
                          />
                          <ErrorMessage
                            name="billTo.postcode"
                            component="p"
                            className="text-red-500 text-[13px]"
                          />
                        </div>
                        <div className="grid gap-3 col-span-2 md:col-span-1">
                          <Label
                            htmlFor="country-client"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            Country
                          </Label>
                          <Field
                            name="billTo.country"
                            as="input"
                            className="h-12 border px-2 rounded-sm w-full"
                            //placeholder="Country"
                          />
                          <ErrorMessage
                            name="billTo.country"
                            component="p"
                            className="text-red-500 text-[13px]"
                          />

                          {/* 
                          <Input id="country-client" className="h-12" /> */}
                        </div>
                      </div>
                      <div className="flex justify-between items-end gap-3  ">
                        <div className="grid gap-3 flex-1">
                          <Label
                            htmlFor="postcode-client"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            Invoice Date
                          </Label>
                          <Popover
                            open={openDate}
                            onOpenChange={setOpenDate}
                            key={"date-picker"}
                            modal={true}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={`data-[empty=true]:text-muted-foreground   justify-start text-left font-normal h-12 ${
                                  formik.touched.invoiceDate &&
                                  formik.errors.invoiceDate
                                    ? "border-red-500"
                                    : ""
                                }`}
                              >
                                <CalendarIcon className="font-[400] text-[#888EAF] text-[13px]" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span className="font-[400] text-[#888EAF] text-[13px]">
                                    Pick a date
                                  </span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate);
                                  formik.setFieldValue(
                                    "invoiceDate",
                                    selectedDate
                                  );
                                  setOpenDate(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>

                          <div className="min-h-[20px]">
                            {formik.touched.invoiceDate &&
                              formik.errors.invoiceDate && (
                                <p className="text-red-500 text-[13px]">
                                  {formik.errors.invoiceDate}
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="grid  gap-3 flex-1     ">
                          <Label
                            htmlFor="payment-terms"
                            className="font-[400] text-[#888EAF] text-[13px]"
                          >
                            Payment Terms
                          </Label>

                          <Select
                            value={formik.values.paymentTerms}
                            onValueChange={(value) =>
                              formik.setFieldValue("paymentTerms", value)
                            }
                          >
                            <SelectTrigger className="w-full min-h-12 font-[400] text-[#888EAF] text-[13px] ">
                              <SelectValue placeholder="Select a term" />
                            </SelectTrigger>

                            <SelectContent>
                              {[
                                { id: 1, name: "14 days" },
                                { id: 2, name: "30 days" },
                                { id: 3, name: "60 days" },
                              ].map((exec) => (
                                <SelectItem
                                  className="font-[400] text-[#888EAF] text-[13px]"
                                  key={exec.id}
                                  value={exec.name}
                                >
                                  {exec.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <div className="min-h-[20px]">
                            {formik.touched.paymentTerms &&
                              formik.errors.paymentTerms && (
                                <p className="text-red-500 text-[13px]">
                                  {formik.errors.paymentTerms}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <Label
                          htmlFor="project"
                          className="font-[400] text-[#888EAF] text-[13px]"
                        >
                          Project Description
                        </Label>
                        {/* */}
                        {/* <Input id="project" className="h-12" /> */}
                        <Field
                          name="projectDescription"
                          as="input"
                          className="h-12 border px-2 rounded-sm w-full"
                          //placeholder="Project Description"
                        />
                        <ErrorMessage
                          name="projectDescription"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-[#888EAF]">
                        Item List
                      </h2>
                      <div>
                        <FieldArray name="items">
                          {({ remove, push }) => (
                            <>
                              {formik.values.items.map((_item, index) => (
                                <div
                                  key={index}
                                  className="grid gap-3 grid-cols-12 items-center  mb-5  "
                                >
                                  <div className="grid gap-3 col-span-12 md:col-span-5    ">
                                    <Label
                                      htmlFor="item-total"
                                      className="font-[400] text-[#888EAF] text-[13px]"
                                    >
                                      Item name
                                    </Label>
                                    <Field
                                      name={`items.${index}.name`}
                                      as="input"
                                      className="  h-12 border px-2 rounded-sm w-full"
                                      //placeholder="Item name"
                                    />
                                    <div className="min-h-[20px]">
                                      <ErrorMessage
                                        name={`items.${index}.name`}
                                        component="div"
                                        className="text-red-500 text-sm  "
                                      />
                                    </div>
                                  </div>
                                  <div className="grid gap-3 col-span-3 md:col-span-2   ">
                                    <Label
                                      htmlFor="item-total"
                                      className="font-[400] text-[#888EAF] text-[13px]"
                                    >
                                      Qty
                                    </Label>
                                    <Field
                                      name={`items.${index}.qty`}
                                      as="input"
                                      type="number"
                                      value={formik.values.items[index].qty}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const value = Number(e.target.value);
                                        formik.setFieldValue(
                                          `items.${index}.qty`,
                                          value
                                        );
                                        formik.setFieldValue(
                                          `items.${index}.total`,
                                          value *
                                            formik.values.items[index].price
                                        );
                                      }}
                                      className=" h-12 w-full border px-2 rounded-sm "
                                      //placeholder="Qty"
                                    />
                                    <div className="min-h-[20px]">
                                      <ErrorMessage
                                        name={`items.${index}.qty`}
                                        component="div"
                                        className="text-red-500 text-[8px] min-h-[20px]"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid gap-3 col-span-5 md:col-span-2    ">
                                    <Label
                                      htmlFor="item-total"
                                      className="font-[400] text-[#888EAF] text-[13px]"
                                    >
                                      Price
                                    </Label>
                                    <Field
                                      name={`items.${index}.price`}
                                      as="input"
                                      type="number"
                                      className=" h-12 w-full border px-2 rounded-sm "
                                      //placeholder="Price"
                                      value={formik.values.items[index].price}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => {
                                        const value = Number(e.target.value);
                                        formik.setFieldValue(
                                          `items.${index}.price`,
                                          value
                                        );
                                        formik.setFieldValue(
                                          `items.${index}.total`,
                                          formik.values.items[index].qty * value
                                        );
                                      }}
                                    />
                                    <div className="min-h-[20px]">
                                      <ErrorMessage
                                        name={`items.${index}.price`}
                                        component="div"
                                        className="text-red-500 text-[8px] min-h-[20px]"
                                      />
                                    </div>
                                  </div>
                                  <div className="grid gap-3 col-span-2 md:col-span-2    ">
                                    <Label
                                      htmlFor="item-total"
                                      className="font-[400] text-[#888EAF] text-[13px]"
                                    >
                                      Total
                                    </Label>
                                    <Input
                                      className=" h-12 w-full border px-2 rounded-sm "
                                      readOnly
                                      value={
                                        formik.values.items[index].total ?? 0
                                      }
                                      // value={
                                      //   formik.values.items[index].qty *
                                      //   formik.values.items[index].price
                                      // }
                                    />
                                    <div className="min-h-[20px]">
                                      {/* <ErrorMessage
                                        name={`items.${index}.total`}
                                        component="div"
                                        className="text-red-500 text-[8px] min-h-[20px]"
                                      /> */}
                                    </div>
                                  </div>

                                  <div className="grid gap-3 place-content-center pt-5 col-span-2 md:col-span-1">
                                    <Button
                                      onClick={() => remove(index)}
                                      variant="ghost"
                                      size="icon"
                                    >
                                      <TrashIcon className="h-5 w-5 text-gray-600 font-bold" />
                                    </Button>
                                  </div>
                                </div>
                              ))}

                              <Button
                                type="button"
                                onClick={() =>
                                  push({ name: "", qty: 1, price: 0 })
                                }
                                className="bg-slate-200 rounded-3xl text-slate-800 hover:bg-[#7c5dfa]/90   flex items-center px-3 py-6 w-full"
                                variant="ghost"
                              >
                                <PlusIcon className="size-4 text-slate-800 rounded-full " />
                                Add New Item
                              </Button>
                            </>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                    <SheetFooter>
                      <div className="flex justify-center items-center    shrink-0 gap-3 md:gap-0 mb-16 lg:mb-0 ">
                        <SheetClose asChild className="w-max">
                          <Button
                            className="bg-slate-400 rounded-3xl text-white hover:bg-rose-800/90 hover:text-white flex items-center md:px-6 md:py-5  text-[13px] font-bold"
                            variant="outline"
                          >
                            Discard
                          </Button>
                        </SheetClose>
                        <Button
                          type="button"
                          variant="outline"
                          className="ml-auto md:mr-3 w-max bg-slate-800 rounded-3xl text-slate-500 hover:bg-[#7c5dfa]/90 hover:text-white flex items-center md:px-6 md:py-5  text-[13px] font-bold"
                        >
                          Save Draft
                        </Button>
                        <Button
                          type="submit"
                          variant="outline"
                          // disabled={formik.isSubmitting}
                          onClick={
                            () => console.log(formik.isValid)
                            // formik.isSubmitting
                            //   ? () => {}
                            //   : () => formik.submitForm()
                          }
                          className="w-max p bg-[#7c5dfa] rounded-3xl text-white hover:bg-[#7c5dfa]/90 hover:text-white flex items-center md:px-6 md:py-5  text-[13px] font-bold"
                        >
                          Save & Send
                        </Button>
                      </div>
                    </SheetFooter>
                  </Form>
                )}
              </Formik>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div>
        {invoices.map((invoice) => (
          <InvoiceTile invoice={invoice} key={invoice.id} />
        ))}
      </div>
    </div>
  );
}

export default InvoiceList;
