import type { Invoice } from "@/types/types";

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    invoiceDate: "2022-01-01",
    dueDate: "2022-02-01",
    amount: 100,
    status: "Draft",
    projectDescription: "Graphic Design",
    paymentTerms: "30 days",
    items: [],
    billTo: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      postCode: "12345",
      country: "USA",
      email: "HdN0U@example.com",
    },
    billFrom: {
      street: "123 Main St",
      city: "Anytown",
      postCode: "12345",
      country: "USA",
    },
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    invoiceDate: "2022-02-01",
    dueDate: "2022-04-01",

    amount: 200,
    status: "Pending",
    projectDescription: "Mobile Development",
    paymentTerms: "60 days",
    items: [
      {
        name: "Item 1",
        qty: 1,
        price: 100,
        total: 100,
      },
    ],
    billTo: {
      name: "Peter Doe",
      street: "Doe Street",
      city: "Downtown",
      postCode: "12345",
      country: "USA",
      email: "fake@email.com",
    },
    billFrom: {
      street: "123 Main St",
      city: "Anytown",
      postCode: "12345",
      country: "USA",
    },
  },
  {
    id: 3,
    invoiceNumber: "INV-003",
    invoiceDate: "2022-03-01",
    dueDate: "2022-04-01",

    amount: 300,
    status: "Paid",
    projectDescription: "Software Development",
    paymentTerms: "30 days",
    items: [
      {
        name: "Item 1",
        qty: 1,
        price: 100,
        total: 100,
      },
      {
        name: "Item 2",
        qty: 2,
        price: 200,
        total: 400,
      },
    ],
    billTo: {
      name: "Bob Smith",
      street: "123 Main St",
      city: "Anytown",
      postCode: "12345",
      country: "USA",
      email: "HdN0U@example.com",
    },
    billFrom: {
      street: "123 Main St",
      city: "Anytown",
      postCode: "12345",
      country: "USA",
    },
  },
  {
    id: 4,
    invoiceNumber: "INV-004",
    invoiceDate: "2022-04-01",
    dueDate: "2022-05-01",

    amount: 400,
    status: "Draft",
    projectDescription: "Web Development",
    paymentTerms: "30 days",
    items: [
      {
        name: "Item 1",
        qty: 1,
        price: 100,
        total: 100,
      },
      {
        name: "Item 2",
        qty: 2,
        price: 200,
        total: 400,
      },
      {
        name: "Item 3",
        qty: 3,
        price: 300,
        total: 900,
      },
    ],
    billTo: {
      name: "Alice Johnson",
      street: "Park Avenue",
      city: "Cityville",
      postCode: "12345",
      country: "USA",
      email: "HdN0U@example.com",
    },
    billFrom: {
      street: "Street 1",
      city: "City 1",
      postCode: "12345",
      country: "USA",
    },
  },
];
export { invoices };
