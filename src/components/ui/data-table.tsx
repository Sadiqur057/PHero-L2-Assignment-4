import { cn } from "@/lib/utils";
import * as React from "react";

// DataTable
const DataTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "custom-shadow w-full rounded-xl border",
        className
      )}
      {...props}
    >
      <div className="">{children}</div>
    </div>
  );
});
DataTable.displayName = "DataTable";

// DataTableHeading
interface DataTableHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const DataTableHeading = React.forwardRef<
  HTMLDivElement,
  DataTableHeadingProps
>(({ className, children, title, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-2 border-b border-border px-4 lg:px-6 py-4.5",
        className
      )}
      {...props}
    >
      <h2 className="text-foreground text-lg font-medium">{title}</h2>
      {children}
    </div>
  );
});
DataTableHeading.displayName = "DataTableHeading";

// DataTableContent
const DataTableContent = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className="overflow-x-auto">
      <table
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});
DataTableContent.displayName = "DataTableContent";

// DataTableHeader
const DataTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {children}
    </thead>
  );
});
DataTableHeader.displayName = "DataTableHeader";

// DataTableBody
const DataTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {children}
    </tbody>
  );
});
DataTableBody.displayName = "DataTableBody";

// DataTableRow
interface DataTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isHeader?: boolean;
}

const DataTableRow = React.forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ className, isHeader = false, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          isHeader ? "bg-gray-100/30 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800/60",
          className,
          "border-b border-border"
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);
DataTableRow.displayName = "DataTableRow";

// DataTableHead
const DataTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "text-foreground px-4 lg:px-6 py-4 text-left text-[13px] font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
});
DataTableHead.displayName = "DataTableHead";

// DataTableCell
const DataTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn("px-4 lg:px-6 py-4", className)}
      {...props}
    >
      {children}
    </td>
  );
});
DataTableCell.displayName = "DataTableCell";

// DataTableFooter
const DataTableFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between px-6 py-4.5", className)}
      {...props}
    >
      {children}
    </div>
  );
});
DataTableFooter.displayName = "DataTableFooter";

// Export all components
export {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableHeading,
  DataTableRow,
};
