import FormSheet from "@/components/FormSheet";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useInvoice } from "@/context/useInvoice";

import type { Invoice } from "@/types/types";
import { ChevronLeft, EditIcon } from "lucide-react";
import React from "react";

// import { useLocation } from "react-router-dom";
// interface InvoiceDetailProps {
//   invoice: Invoice;
// }
function InvoiceDetails() {
  const { state, dispatch } = useInvoice();
  const [openSheet, setOpenSheet] = React.useState(false);
  function getStatusColor(status: string) {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Draft":
        return " bg-slate-100 text-slate-800";
      case "Pending":
        return "bg-amber-100 text-amber-600";
      default:
        return "";
    }
  }
  function getDotColor(status: string) {
    switch (status) {
      case "Paid":
        return "bg-green-800";
      case "Draft":
        return "bg-slate-800";
      case "Pending":
        return "bg-amber-600";
      default:
        return "";
    }
  }
  // const invoice: Invoice = useLocation().state;
  const invoice: Invoice = state.selectedInvoice!;
  return (
    <div className="min-h-screen bg-[#f2f2f2] ">
      <div className="flex flex-col lg:flex-row scroll-auto">
        <NavBar />
        <div className="w-full min-h-screen lg:w-3/5    lg:mx-auto  px-1.5 md:px-3 py-3 pt-14  lg:pt-3">
          <div className="   py-5">
            <Button
              onClick={() => window.history.back()}
              variant={"ghost"}
              className="font-semibold"
            >
              <ChevronLeft />
              Go Back
            </Button>
          </div>
          <div className="  px-5 ">
            <div className="flex gap-2 justify-between   md:justify-start items-center bg-white rounded-lg shadow-none md:px-6 px-2.5 md:py-6 py-3  ">
              <div
                className={`hidden md:block md:min-w-28 min-w-24 text-center font-[600] text-xs md:text-sm  py-2.5  rounded-sm ${getStatusColor(
                  invoice.status
                )}`}
              >
                <span
                  className={`  rounded-full inline-block w-2 h-2 mr-2.5 ${getDotColor(
                    invoice.status
                  )}`}
                ></span>
                {invoice.status}
              </div>

              <FormSheet
                openSheet={openSheet}
                setOpenSheet={setOpenSheet}
                currentInvoice={invoice}
                triggerButton={
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {}}
                    className="hidden md:flex items-center md:ml-auto shadow-none  bg-red-300 rounded-3xl text-[#7e88c3] hover:bg-[#7e88c3]/90 hover:text-white  px-4 py-6"
                  >
                    Edit
                  </Button>
                }
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  dispatch({
                    type: "DELETE_INVOICE",
                    payload: invoice.id,
                  });
                  window.history.back();
                }}
                className="bg-[#ec5757] rounded-3xl text-white hover:bg-[#ec5757]/90 hover:text-white flex items-center px-4 py-6"
              >
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => {
                  dispatch({
                    type: "UPDATE_INVOICE",
                    payload: {
                      ...invoice,
                      status: invoice.status === "Pending" ? "Paid" : "Pending",
                    },
                  });
                }}
                variant="outline"
                className="bg-[#7c5dfa]  rounded-3xl text-white hover:bg-[#7c5dfa]/90 hover:text-white flex items-center px-3 py-6"
              >
                {invoice.status === "Pending"
                  ? "Mark as Paid"
                  : "Mark as Pending"}
              </Button>
            </div>
            <div className="flex flex-col   bg-white rounded-lg shadow-none md:px-6 px-2.5 md:py-6 py-3 mt-8 ">
              <div className="flex md:hidden justify-between md:justify-end items-start   mb-3 p-0 m-0 ">
                <FormSheet
                  openSheet={openSheet}
                  setOpenSheet={setOpenSheet}
                  currentInvoice={invoice}
                  triggerButton={
                    <Button
                      type="button"
                      variant="link"
                      className="md:hidden rounded-none shadow-none flex items-center m-0 p-0 text-[#7e88c3] bg-[#f4f4f5] "
                    >
                      <EditIcon />
                    </Button>
                  }
                />

                <div
                  className={` md:min-w-28 min-w-24 text-center font-[600] text-xs md:text-sm  py-2.5  rounded-sm ${getStatusColor(
                    invoice.status
                  )}`}
                >
                  <span
                    className={`  rounded-full inline-block w-2 h-2 mr-2.5 ${getDotColor(
                      invoice.status
                    )}`}
                  ></span>
                  {invoice.status}
                </div>
              </div>
              <div className="flex justify-between items-start    mb-3 mt-2  ">
                <span className="flex flex-col font-bold text-slate-600 text-sm md:text-lg ">
                  #{invoice.invoiceNumber}
                  <p className="text-[#858bb2] font-[500] text-xs md:text-sm">
                    {invoice.projectDescription}
                  </p>
                </span>

                <div className="text-xs md:text-sm text-[#858bb2] font-[500] ">
                  <p>{invoice.billFrom.street}</p>
                  <p>{invoice.billFrom.postCode}</p>
                  <p>{invoice.billFrom.city}</p>
                  <p>{invoice.billFrom.country}</p>
                </div>
              </div>
              <div className="flex justify-between flex-wrap items-start mb-6 gap-3 ">
                <div>
                  <h3 className="text-[#858bb2]  text-xs md:text-md">
                    Invoice Date
                  </h3>
                  <p className="font-bold text-sm md:text-lg text-slate-800">
                    {invoice.invoiceDate}
                  </p>
                  <div className="mt-5">
                    <h3 className="text-[#858bb2] text-xs md:text-md">
                      Due Date
                    </h3>
                    <p className="font-bold  text-sm md:text-lg text-slate-800">
                      {invoice.dueDate}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#858bb2] text-xs md:text-md">
                    Billed To
                  </h3>
                  <p className="font-bold text-sm md:text-lg text-slate-800">
                    {invoice.billTo.name}
                  </p>
                  <div className="text-xs md:text-sm text-[#858bb2] font-[500]  shrink-0  min-w-[80px] ">
                    <p>{invoice.billTo.street} </p>
                    <p>{invoice.billTo.city}</p>
                    <p>{invoice.billTo.postCode}</p>
                    <p>{invoice.billTo.country}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#858bb2] text-xs md:text-md">Sent To</h3>
                  <p className="font-bold  text-sm md:text-lg text-slate-800">
                    {invoice.billTo.email}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-tr-md rounded-tl-md  relative bg-[#f4f4f5]   shadow-none md:px-6 px-2.5 md:py-6 py-3 ">
                <div className="flex justify-between items-center  ">
                  <p className="flex-2 text-xs md:text-sm lg:text-lg text-[#858bb2]  font-semibold">
                    Item name
                  </p>
                  <p className="flex-1 text-xs md:text-sm lg:text-lg   text-[#858bb2]  font-semibold">
                    Qty
                  </p>
                  <p className="flex-1 text-xs md:text-sm lg:text-lg text-[#858bb2]  font-semibold">
                    Price
                  </p>
                  <p className="flex-1 text-xs md:text-sm lg:text-lg text-[#858bb2] font-semibold">
                    Total
                  </p>
                </div>
                {invoice.items.map((item) => (
                  <div
                    key={item.name + item.qty + item.price + item.total}
                    className="flex justify-between    mt-3 font-bold text-slate-800 "
                  >
                    <p className=" flex-2 text-xs md:text-sm lg:text-lg">
                      {item.name}
                    </p>
                    <p className=" flex-1 text-xs md:text-sm lg:text-lg ml-2.5">
                      {item.qty}
                    </p>
                    <p className=" flex-1 text-xs md:text-sm lg:text-lg">
                      ${item.price}
                    </p>
                    <p className=" flex-1 text-xs md:text-sm lg:text-lg">
                      ${item.total}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-5 text-gray-300 bg-[#252945]   rounded-br-md rounded-bl-md py-5 flex justify-between  ">
                <p className="text-sm">Amount Due</p>
                <p className="font-semibold text-gray-300 text-base md:text-2xl">
                  {invoice.items.reduce((acc, item) => acc + item.total, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
