import "./App.css";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InvoiceDetails from "./pages/InvoiceDetails";
import { invoices } from "./utils/data";
import React from "react";
import Layout from "./pages/Layout";
const invoiceLoader = ({ params }) => {
  const invoice = invoices.find((inv) => inv.id === params.id);
  if (!invoice) {
    throw new Response("Not Found", { status: 404 });
  }
  return invoice;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "invoice/:id",
        element: <InvoiceDetails invoice={invoices[0]} />,
        loader: invoiceLoader,
        errorElement: <div>Invoice not found!</div>,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
