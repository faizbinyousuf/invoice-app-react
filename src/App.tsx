/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InvoiceDetails from "./pages/InvoiceDetails";

import React from "react";
import Layout from "./pages/Layout";
import { HashRouter, Routes, Route } from "react-router-dom";
import { InvoiceContextProvider } from "./context/invoiceProvider";

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

// function App() {
//   // Comment here
//   return (
//     <>
//       <React.StrictMode>
//         <RouterProvider router={router} />
//       </React.StrictMode>
//     </>
//   );
// }

function App() {
  return (
    <React.StrictMode>
      <InvoiceContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="invoiceDetails" element={<InvoiceDetails />} />
              <Route
                path="*"
                element={
                  <div>
                    <h1>404</h1>
                    <p>Page not found</p>
                  </div>
                }
              />
            </Route>
          </Routes>
        </HashRouter>
      </InvoiceContextProvider>
    </React.StrictMode>
  );
}

export default App;
