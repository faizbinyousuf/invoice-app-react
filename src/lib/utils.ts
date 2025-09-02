import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const invoiceSchema = Yup.object().shape({
  billFrom: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    postcode: Yup.string().required("Postcode is required"),
    country: Yup.string().required("Country is required"),
  }),
  billTo: Yup.object().shape({
    name: Yup.string().required("Client name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Client email is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    postcode: Yup.string().required("Postcode is required"),
    country: Yup.string().required("Country is required"),
  }),
  invoiceDate: Yup.date().nullable().required("Invoice date is required"),
  paymentTerms: Yup.string().required("Select a payment term"),
  projectDescription: Yup.string().required("Project description is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        qty: Yup.number()
          // .typeError("Qty must be a number")
          // .positive("Qty must be greater than 0")
          .required("Qty is required"),
        price: Yup.number()
          // .typeError("Price must be a number")
          // .positive("Price must be greater than ")
          .required("Price is required"),
      })
    )
    .min(1, "At least one item is required"),
});
