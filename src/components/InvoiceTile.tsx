import type { Invoice } from "@/types/types";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { useInvoice } from "@/context/useInvoice";
interface InvoiceTileProps {
  invoice: Invoice;
}
function InvoiceTile({ invoice }: InvoiceTileProps) {
  const { dispatch } = useInvoice();
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
  return (
    <Link
      to="/invoiceDetails"
      onClick={() =>
        dispatch({ type: "SET_SELECTED_INVOICE", payload: invoice })
      }
    >
      <Card className=" rounded-sm shadow-xs hover:shadow-md hover:cursor-pointer   hover:border hover:border-[#7c5dfa] my-3 p-2">
        <CardContent className="flex justify-between items-center p-2 sm:p-4 bg-white   ">
          <div className="flex flex-col md:flex-row  justify-between md:gap-8 gap-2 items-start md:items-center  ">
            <p className="font-bold text-xs md:text-lg text-black shrink-0   leading-4 ">
              #{invoice.invoiceNumber}
            </p>
            <p className="font-semibold text-xs md:text-[16px]  text-[#888EAF] shrink-0  leading-4">
              {invoice.invoiceDate}
            </p>
            <p className="font-bold text-xs md:text-lg  text-black shrink-0  leading-4 block md:hidden">
              ${invoice.amount}
            </p>
            <p className="font-semibold text-xs md:text-[16px] text-[#888EAF] shrink-0  leading-4  hidden md:block">
              {invoice.billTo.name}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:gap-8 gap-3 items-end md:items-center">
            <p className="font-bold text-xs md:text-lg text-black shrink-0  leading-4 hidden md:block">
              ${invoice.amount}
            </p>
            <p className="font-semibold text-xs md:text-[16px] text-[#888EAF] shrink-0  leading-4 md:hidden">
              {invoice.billTo.name}
            </p>
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
        </CardContent>
      </Card>
    </Link>
  );
}

export default InvoiceTile;
