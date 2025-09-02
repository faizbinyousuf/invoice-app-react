import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";

import type { Invoice } from "@/types/types";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
// interface InvoiceDetailProps {
//   invoice: Invoice;
// }
function InvoiceDetails() {
  const invoice: Invoice = useLocation().state;
  return (
    <div className="min-h-screen bg-[#f2f2f2] ">
      <div className="flex flex-col lg:flex-row scroll-auto">
        <NavBar />
        <div className="w-full min-h-screen lg:w-3/5    lg:mx-auto  px-1.5 md:px-3 py-3 pt-20 lg:pt-3">
          <div className="   py-5  mt-8">
            <Button
              onClick={() => window.history.back()}
              variant={"ghost"}
              className="font-semibold"
            >
              <ChevronLeft />
              Go Back
            </Button>
          </div>
          <div className="mt-5  px-5 ">
            <div className="flex gap-2 bg-white rounded-lg shadow-none md:px-6 px-2.5 md:py-6 py-3  ">
              <div
                className={`md:min-w-28 min-w-24 text-center text-sm md:text-base py-3.5   rounded-sm font-semibold  
                ${
                  invoice.status === "paid" ? "bg-green-100 text-green-400" : ""
                }
                ${invoice.status === "draft" ? "border border-gray-300" : ""}
                ${
                  invoice.status === "pending"
                    ? "bg-orange-100 text-orange-400"
                    : ""
                }
                ${invoice.status === "draft" ? "bg-gray-100 text-gray-400" : ""}
                `}
              >
                <span
                  className={` rounded-full inline-block w-2 h-2 mr-2.5 ${
                    invoice.status === "paid" ? "bg-green-400" : ""
                  }
                  ${invoice.status === "pending" ? "bg-orange-400" : ""}
                  ${invoice.status === "draft" ? "bg-gray-400" : ""}
                  `}
                ></span>
                {invoice.status}
              </div>
              {/* //buttons */}
              <Button
                type="button"
                variant="outline"
                className="ml-auto shadow-none  bg-[#f4f4f5] rounded-3xl text-[#7e88c3] hover:bg-[#7e88c3]/90 hover:text-white flex items-center px-4 py-6"
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-[#ec5757] rounded-3xl text-white hover:bg-[#ec5757]/90 hover:text-white flex items-center px-4 py-6"
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-[#7c5dfa] rounded-3xl text-white hover:bg-[#7c5dfa]/90 hover:text-white flex items-center px-3 py-6"
              >
                {invoice.status === "pending"
                  ? "Mark as Paid"
                  : "Mark as Pending"}
              </Button>
            </div>
            <div className="flex flex-col   bg-white rounded-lg shadow-none md:px-6 px-2.5 md:py-6 py-3 mt-8 ">
              <div className="flex justify-between items-start   mb-3  ">
                <span className="flex flex-col font-bold text-slate-600 text-sm md:text-lg">
                  #{invoice.invoiceNumber}
                </span>
                <p className="text-[#858bb2] font-[500] text-xs md:text-sm">
                  {invoice.description}
                </p>
                <div className="text-xs md:text-sm text-[#858bb2] font-[500]">
                  <p>Customer address</p>
                  <p>Address line two</p>
                  <p>City</p>
                  <p>Country</p>
                </div>
              </div>
              <div className="flex justify-between items-start mb-6 ">
                <div>
                  <h3 className="text-[#858bb2]  text-xs md:text-md">
                    Invoice Date
                  </h3>
                  <p className="font-bold text-sm md:text-lg text-slate-800">
                    {invoice.date}
                  </p>
                </div>
                <div>
                  <h3 className="text-[#858bb2] text-xs md:text-md">
                    Billed To
                  </h3>
                  <p className="font-bold text-sm md:text-lg text-slate-800">
                    {invoice.client}
                  </p>
                  <div className="text-xs md:text-sm text-[#858bb2] font-[500]  shrink-0  min-w-[80px] ">
                    <p>Customer address </p>
                    <p>Address line two</p>
                    <p>City</p>
                    <p>Country</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#858bb2] text-xs md:text-md">Sent To</h3>
                  <p className="font-bold  text-sm md:text-lg text-slate-800">
                    {invoice.client}@gmail.com
                  </p>
                </div>
              </div>
              <div className="-mt-18">
                <h3 className="text-[#858bb2] text-xs md:text-md">Due Date</h3>
                <p className="font-bold  text-sm md:text-lg text-slate-800">
                  {invoice.date}
                </p>
              </div>
              <div className="mt-6 rounded-tr-md rounded-tl-md  relative bg-[#f4f4f5]   shadow-none md:px-6 px-2.5 md:py-6 py-3 ">
                <div className="flex justify-between items-center  ">
                  <p className="text-xs md:text-sm lg:text-lg text-[#858bb2]  font-semibold">
                    Item name
                  </p>
                  <p className="text-xs md:text-sm lg:text-lg ml-5 lg:ml-8 text-[#858bb2]  font-semibold">
                    Qty
                  </p>
                  <p className="text-xs md:text-sm lg:text-lg text-[#858bb2]  font-semibold">
                    Price
                  </p>
                  <p className="text-xs md:text-sm lg:text-lg text-[#858bb2] font-semibold">
                    Total
                  </p>
                </div>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between    mt-3 font-bold text-slate-800 "
                  >
                    <p className="text-xs md:text-sm lg:text-lg">
                      {invoice.description}
                    </p>
                    <p className="text-xs md:text-sm lg:text-lg">1</p>
                    <p className="text-xs md:text-sm lg:text-lg">
                      ${invoice.amount}
                    </p>
                    <p className="text-xs md:text-sm lg:text-lg">
                      ${invoice.amount}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-5 text-gray-300 bg-[#252945]   rounded-br-md rounded-bl-md py-5 flex justify-between  ">
                <p className="text-sm">Amount Due</p>
                <p className="font-semibold text-gray-300 text-base md:text-2xl">
                  {invoice.amount}
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
