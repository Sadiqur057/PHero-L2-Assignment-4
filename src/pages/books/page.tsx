import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableHeading,
  DataTableRow,
} from "@/components/ui/data-table";
import { Link } from "react-router";
import {
  BookCopy,
  LoaderCircle,
  PlusCircle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/modal";
import Pagination from "@/components/pagination";
import Loading from "@/components/loading";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/Book";
import toast from "react-hot-toast";
const Books = () => {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<
    string | null | undefined
  >(null);

  const { data, isLoading } = useGetBooksQuery({
    page: currentPage,
    limit: parseInt(itemsPerPage),
  });

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDeleteBook = async () => {
    console.log("Deleting book with ID:", selectedBookId);

    try {
      const res = deleteBook(selectedBookId).unwrap();
      console.log("Delete response:", res);
      toast.success("Book deleted successfully");
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <div className="bg-card">
      <DataTable>
        <DataTableHeading title="Books">
          <Link to="/create-book">
            <Button
              className={
                "flex items-center justify-center gap-2 py-5 text-white"
              }
            >
              <PlusCircle />
              <span>Add New</span>
            </Button>
          </Link>
        </DataTableHeading>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full py-60">
            <Loading />
          </div>
        ) : data?.data?.length <= 0 ? (
          <div className="py-20 text-center"> No Data Found</div>
        ) : (
          <DataTableContent>
            <DataTableHeader>
              <DataTableRow isHeader>
                <DataTableHead>Book Title</DataTableHead>
                <DataTableHead>Author</DataTableHead>
                <DataTableHead>Genre</DataTableHead>
                <DataTableHead>ISBN</DataTableHead>
                <DataTableHead>Copies</DataTableHead>
                <DataTableHead>Availability</DataTableHead>
                <DataTableHead className="text-end">ACTION</DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableBody>
              {data?.data?.map((book: IBook) => (
                <DataTableRow key={book?._id}>
                  <DataTableCell>
                    <Link
                      rel="nofollow"
                      to={`/`}
                      className="hover:underline"
                      target="_blank"
                    >
                      {book?.title}
                    </Link>
                  </DataTableCell>
                  <DataTableCell>{book?.author}</DataTableCell>
                  <DataTableCell>
                    <span className="text-blue-800 bg-blue-50 p-1 rounded-md text-xs">
                      {book?.genre}
                    </span>
                  </DataTableCell>
                  <DataTableCell className="text-sm">
                    {book?.isbn}
                  </DataTableCell>
                  <DataTableCell>{book?.copies}</DataTableCell>
                  <DataTableCell>
                    <span
                      className={cn(
                        `${
                          book?.available
                            ? "text-green-500 bg-green-100"
                            : "text-red-500 bg-red-100"
                        }`,
                        "text-xs py-1 rounded px-2.5"
                      )}
                    >
                      {book?.available ? "Yes" : "No"}
                    </span>
                  </DataTableCell>
                  <DataTableCell className="text-end text-sm whitespace-nowrap text-gray-700">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        rel="nofollow"
                        to={`/edit-book/${book?._id}`}
                      >
                        <SquarePen className="w-4 h-4 text-light-80" />
                      </Link>

                      <span className="text-gray-400"> | </span>
                      <Link
                        rel="nofollow"
                        to={`/borrow-book/${book?._id}`}
                      >
                        <BookCopy className="text-blue-500 w-4 h-4 cursor-pointer" />
                      </Link>
                      <span className="text-gray-400"> | </span>
                      <button
                        onClick={() => {
                          setSelectedBookId(book?._id);
                          setIsOpen(true);
                        }}
                      >
                        <Trash2 className="text-red-500 w-4 h-4 cursor-pointer" />
                      </button>
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTableContent>
        )}
        <DataTableFooter>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <Select
                value={itemsPerPage}
                onValueChange={(value) => setItemsPerPage(value)}
              >
                <SelectTrigger className="w-fit text-sm !px-2 font-semibold">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent className="w-fit">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>{" "}
            <div className="">
              <Pagination
                totalItems={data?.meta?.totalItems?.toString() || "0"}
                itemsPerPage={parseInt(itemsPerPage)}
                currentPage={currentPage}
                setCurrentPage={(page) =>
                  setCurrentPage(
                    typeof page === "string" ? parseInt(page) : page
                  )
                }
              />
            </div>
          </div>
        </DataTableFooter>
      </DataTable>
      <Modal
        contentClassName="max-w-lg w-[90%]"
        primaryCloseButton
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalHeader
          title="Are you absolute sure you want to delete this book?"
          className="text-base"
        />

        <ModalBody className="py-6">
          <div className="">
            <p className="text-sm text-light-70">
              This action cannot be undone. This will permanently delete the
              book.
            </p>
          </div>
        </ModalBody>

        <ModalFooter className="p-4">
          <Button
            variant="outline"
            className="px-3"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="px-3"
            size="sm"
            disabled={isDeleting}
            onClick={handleDeleteBook}
          >
            {isDeleting ? (
              <div className="flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Books;
