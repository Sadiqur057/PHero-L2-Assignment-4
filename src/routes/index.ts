import Layout from "@/components/layout/layout";
import Books from "@/pages/books/page";
import BorrowBook from "@/pages/borrow-book/page";
import BorrowSummary from "@/pages/borrow-summary/page";
import createBook from "@/pages/create-book/page";
import EditBook from "@/pages/edit-book/page";
import home from "@/pages/home/home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: home,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/create-book",
        Component: createBook,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/borrow-book/:id",
        Component: BorrowBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);
