import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSummaryQuery } from "@/redux/api/baseApi";
import type { IDoc } from "@/types/Book";
import { useState } from "react";
const BorrowSummary = () => {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetSummaryQuery({
    page: currentPage,
    limit: parseInt(itemsPerPage),
  });
  return (
    <DataTable className="bg-card">
      <DataTableHeading title="Borrow Summary" />
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
              <DataTableHead>ISBN</DataTableHead>
              <DataTableHead>Quantity</DataTableHead>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            {data?.data?.map((doc: IDoc, idx: number) => (
              <DataTableRow key={idx}>
                <DataTableCell>{doc?.book?.title}</DataTableCell>

                <DataTableCell className="text-sm">
                  {doc?.book?.isbn}
                </DataTableCell>
                <DataTableCell>{doc?.totalQuantity}</DataTableCell>
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
                setCurrentPage(typeof page === "string" ? parseInt(page) : page)
              }
            />
          </div>
        </div>
      </DataTableFooter>
    </DataTable>
  );
};

export default BorrowSummary;
