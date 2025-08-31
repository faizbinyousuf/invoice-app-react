import "./App.css";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InvoiceDetails from "./pages/InvoiceDetails";

import React from "react";
import Layout from "./pages/Layout";

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
        path: "/invoiceDetails",
        element: <InvoiceDetails />,

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
