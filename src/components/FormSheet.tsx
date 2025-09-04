/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { type ReactNode } from "react";
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
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { invoiceSchema } from "../lib/utils";
import type { Invoice, InvoiceFormValues } from "@/types/types";
import { useInvoice } from "@/context/useInvoice";
interface FormSheetProps {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  currentInvoice: Invoice | null;
  triggerButton?: ReactNode;
}
function FormSheet({
  openSheet,
  setOpenSheet,
  currentInvoice,
  triggerButton,
}: FormSheetProps) {
  if (currentInvoice === null) {
    currentInvoice = {
      id: 0,
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      amount: 0,
      status: "",
      projectDescription: "",
      items: [],
      billTo: {
        name: "",
        email: "",
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      billFrom: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      paymentTerms: "",
    };
  }

  const { state, dispatch } = useInvoice();
  const [openDate, setOpenDate] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  React.useEffect(() => {
    if (currentInvoice?.invoiceDate) {
      setDate(new Date(currentInvoice.invoiceDate));
    }
  }, [currentInvoice]);

  const calculateDueDate = (paymentTerms: string) => {
    const today = new Date();
    const [days] = paymentTerms.split(" ");
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + parseInt(days));
    return dueDate.toISOString().split("T")[0];
  };

  const generateId = () => {
    const maxInvoiceId = state.invoices.reduce(
      (maxId, invoice) => Math.max(maxId, invoice.id),
      0
    );
    return maxInvoiceId + 1;
  };

  const initialValues: InvoiceFormValues = currentInvoice
    ? {
        billFrom: currentInvoice.billFrom,
        billTo: currentInvoice.billTo,
        invoiceDate: currentInvoice.invoiceDate
          ? new Date(currentInvoice.invoiceDate)
          : null,
        paymentTerms: currentInvoice.paymentTerms,
        projectDescription: currentInvoice.projectDescription,
        items: currentInvoice.items,
      }
    : {
        billFrom: { street: "", city: "", postCode: "", country: "" },
        billTo: {
          name: "",
          email: "",
          street: "",
          city: "",
          postCode: "",
          country: "",
        },
        invoiceDate: null,
        paymentTerms: "",
        projectDescription: "",
        items: [{ name: "", qty: 1, price: 0, total: 0 }],
      };

  //   const initialValues: InvoiceFormValues = {
  //     billFrom: { street: "", city: "", postCode: "", country: "" },
  //     billTo: {
  //       name: "",
  //       email: "",
  //       street: "",
  //       city: "",
  //       postCode: "",
  //       country: "",
  //     },
  //     invoiceDate: null,
  //     paymentTerms: "",
  //     projectDescription: "",
  //     items: [{ name: "", qty: 1, price: 0, total: 0 }],
  //   };
  return (
    <>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          {triggerButton}
          {/* <Button
            type="button"
            variant="outline"
            className="p-0 m-0 px-2 md:py-5 bg-[#7c5dfa] border border-black rounded-full text-white hover:bg-[#7c5dfa]/90 hover:text-white flex  justify-start gap-3 items-center  h-[48px] "
          >
            <div className="size-8   rounded-full bg-white grid place-items-center  ">
              <PlusIcon className="size-3  font-bold text-[#7c5dfa] bg-white rounded-full p-0 m-0  " />
            </div>
            <span className="hidden md:block font-bold pr-3">New Invoice</span>
            <span className="md:hidden font-bold pr-4">New</span>
          </Button> */}
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full sm:max-w-lg ml-0 lg:ml-16 p-0 mt-16 lg:mt-0  grid "
        >
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={invoiceSchema}
            onSubmit={(values) => {
              console.log("Form Submitted ✅", values);
              currentInvoice = {
                // Generate invoice id
                id: generateId(),
                invoiceNumber: "INV-" + Math.floor(Math.random() * 1000),
                billFrom: values.billFrom,
                billTo: values.billTo,
                invoiceDate: values.invoiceDate!.toISOString().split("T")[0],
                paymentTerms: values.paymentTerms,
                projectDescription: values.projectDescription,
                items: values.items,
                status: "Pending",
                amount: values.items.reduce(
                  (total, item) => total + item.total,
                  0
                ),
                // calculate due date from payment terms
                dueDate: calculateDueDate(values.paymentTerms.toString()),
              };
              console.log("Current Invoice ✅", currentInvoice);
              dispatch({
                type: "ADD_INVOICE",
                payload: currentInvoice,
              });
              setOpenSheet(false);
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
                  <h3 className="font-semibold text-[#7c5dfa]">Bill from</h3>
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
                    <div className="min-h-[20px] ">
                      <ErrorMessage
                        name="billFrom.street"
                        component="p"
                        className="text-red-500 text-[13px] "
                      />
                    </div>
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
                      <div className="min-h-[20px] ">
                        <ErrorMessage
                          name="billFrom.city"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label
                        htmlFor="postCode"
                        className="font-[400] text-[#888EAF] text-[13px]"
                      >
                        Postcode
                      </Label>
                      {/* 
                          <Input id="postCode" className="h-12" /> */}
                      <Field
                        name="billFrom.postCode"
                        as="input"
                        className="h-12 border px-2 rounded-sm w-full"
                        //placeholder="Postcode"
                      />
                      <div className="min-h-[20px] ">
                        <ErrorMessage
                          name="billFrom.postCode"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
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
                      <div className="min-h-[20px] ">
                        <ErrorMessage
                          name="billFrom.country"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
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
                    <div className="min-h-[20px] ">
                      <ErrorMessage
                        name="billTo.name"
                        component="p"
                        className="text-red-500 text-[13px]"
                      />
                    </div>
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
                    <div className="min-h-[20px] ">
                      <ErrorMessage
                        name="billTo.street"
                        component="p"
                        className="text-red-500 text-[13px]"
                      />
                    </div>
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
                      <div className="min-h-[20px] ">
                        <ErrorMessage
                          name="billTo.city"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>

                      {/*
                          <Input id="city-client" className="h-12" /> */}
                    </div>
                    <div className="grid gap-3">
                      <Label
                        htmlFor="postCode-client"
                        className="font-[400] text-[#888EAF] text-[13px]"
                      >
                        Postcode
                      </Label>
                      {/* 
                          <Input id="postCode-client" className="h-12" /> */}
                      <Field
                        name="billTo.postCode"
                        as="input"
                        className="h-12 border px-2 rounded-sm w-full"
                        //placeholder="Postcode"
                      />
                      <div className="min-h-[20px] ">
                        <ErrorMessage
                          name="billTo.postCode"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>
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
                      <div className="min-h-[20px] ">
                        <ErrorMessage
                          name="billTo.country"
                          component="p"
                          className="text-red-500 text-[13px]"
                        />
                      </div>

                      {/* 
                          <Input id="country-client" className="h-12" /> */}
                    </div>
                  </div>
                  <div className="flex justify-between items-end gap-3  ">
                    <div className="grid gap-3 flex-1">
                      <Label
                        htmlFor="postCode-client"
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
                            className={`data-[empty=true]:text-muted-foreground   justify-start text-left font-normal h-12 `}
                          >
                            {/* Use the below to make the border red when there is an error */}
                            {/* ${
                                  formik.touched.invoiceDate &&
                                  formik.errors.invoiceDate
                                    ? "border-red-500"
                                    : ""
                                } */}
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
                              formik.setFieldValue("invoiceDate", selectedDate);
                              setOpenDate(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>

                      <div className="min-h-[20px] text-nowrap">
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

                      <div className="min-h-[20px] text-nowrap ">
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
                    <div className="min-h-[20px]">
                      <ErrorMessage
                        name="projectDescription"
                        component="p"
                        className="text-red-500 text-[13px]"
                      />
                    </div>
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
                                      value * formik.values.items[index].price
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
                                  value={formik.values.items[index].total ?? 0}
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

                              <div className="grid gap-3 place-content-center    col-span-2 md:col-span-1">
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
                            onClick={() => push({ name: "", qty: 1, price: 0 })}
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
                      // onClick={
                      //   formik.isSubmitting
                      //     ? () => {}
                      //     : () => formik.submitForm()
                      // }
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
    </>
  );
}

export default FormSheet;
