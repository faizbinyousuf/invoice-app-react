import type { Invoice } from "@/types/types";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
interface InvoiceTileProps {
  invoice: Invoice;
}
function InvoiceTile({ invoice }: InvoiceTileProps) {
  return (
    <Link to="/invoiceDetails" state={invoice}>
      <Card className="rounded-sm shadow-xs hover:shadow-md hover:cursor-pointer   hover:border hover:border-[#7c5dfa] my-3">
        <CardContent className="flex justify-between items-center">
          <div className="flex justify-between md:gap-8 gap-4 text-[12px] md:text-sm lg:text-base ">
            <p className="font-bold text-[#7c5dfa">{invoice.invoiceNumber}</p>
            <p className="text-gray-500">{invoice.date}</p>
            <p className="text-gray-500">{invoice.date}</p>
          </div>
          {/* md:px-6 px-2.5 */}
          <div className="flex justify-between md:gap-8 gap-4 items-center">
            <p className="font-bold text-sm md:text-base">${invoice.amount}</p>
            <div className=" md:min-w-28 min-w-24 text-center text-sm md:text-base py-2.5 bg-orange-100 rounded-sm font-semibold text-orange-400">
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
