import InvoiceList from "@/components/InvoiceList";
import NavBar from "@/components/NavBar";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] ">
      <div className="flex flex-col lg:flex-row scroll-auto">
        <NavBar />
        <InvoiceList />
      </div>
    </div>
  );
}

export default HomePage;
