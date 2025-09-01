import type { Invoice } from "@/types/types";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
interface InvoiceTileProps {
  invoice: Invoice;
}
function InvoiceTile({ invoice }: InvoiceTileProps) {
  return (
    <Link to="/invoiceDetails" state={invoice}>
      <Card className=" rounded-sm shadow-xs hover:shadow-md hover:cursor-pointer   hover:border hover:border-[#7c5dfa] my-3">
        <CardContent className="flex justify-between items-center p-2 sm:p-4">
          <div className="flex justify-between md:gap-8 gap-2   ">
            <p className="font-[600] text-xs md:text-sm text-[#7c5dfa] shrink-0">
              {invoice.invoiceNumber}
            </p>
            <p className="font-[500] text-xs md:text-sm text-[#888EAF] shrink-0">
              {invoice.date}
            </p>
            <p className="font-[500] text-xs md:text-sm text-[#888EAF] shrink-0">
              {invoice.date}
            </p>
          </div>
          {/* md:px-6 px-2.5 */}
          <div className="flex justify-between md:gap-8 gap-3 items-center">
            {/* <p className="font-[700] text-xs md:text-sm shrink-0 ">
              ${invoice.amount}
            </p> */}
            <div className=" md:min-w-28 min-w-24 text-center font-[600] text-xs md:text-sm  py-2.5 bg-orange-100 rounded-sm   text-orange-400">
              <span className="bg-orange-400 rounded-full inline-block w-2 h-2 mr-2.5"></span>
              {invoice.status}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default InvoiceTile;
