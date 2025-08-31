import { MoonIcon, User } from "lucide-react";
import { Separator } from "./ui/separator";

function NavBar() {
  return (
    <div className="z-100 bgred w-full lg:h-screen bg-[#373b53] h-24 lg:w-24 flex lg:flex-col items-center lg:items-start lg:rounded-tr-2xl lg:rounded-br-2xl fixed ">
      <div className="text-white w-24 lg:h-24 bg-[#7c5dfa] h-full lg:w-full rounded-tr-2xl rounded-br-2xl flex items-center justify-center">
        <div className="size-10 rounded-full bg-gray-50 grid place-items-center">
          <User className="size-6 " />
        </div>
      </div>

      <div className=" lg:min-h-40 flex gap-12 ml-auto lg:mt-auto  h-24 items-center   lg:flex-col  lg:w-full pr-6 lg:pr-0 lg:mb-8  ">
        <div className="size-10 rounded-full   grid  place-items-center">
          <MoonIcon className="size-6 text-gray-400 " />
        </div>
        <Separator orientation="vertical" className="bg-gray-400 lg:hidden  " />
        <Separator
          orientation="horizontal"
          className="bg-gray-400 hidden lg:block "
        />
        <div className="size-10 rounded-full bg-gray-400 grid place-items-center shrink-0">
          <User className="size-6 " />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
