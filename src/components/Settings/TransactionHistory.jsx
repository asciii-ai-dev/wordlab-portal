import React from "react";
import { useTable } from "react-table";
import { useGetInvoicesQuery } from "../../features/subscriptions/subscriptionApi";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const TransactionHistory = () => {
  const { auth:{user} } = useSelector((state) => state);
  const { data: invoiceData = [], isLoading } = useGetInvoicesQuery({userId: user?._id});
  const data = React.useMemo(
    () => invoiceData,
    [invoiceData]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => (
          <div className="flex justify-center ">
            <div className={`text-base-content font-[500] text-[12.5px]`}>{value}</div>
          </div>
        ),
      },
      {
        Header: "Details",
        accessor: "details",
        Cell: ({ value }) => (
          <p className="max-w-[200px] text-base-content font-[500] text-[12.5px] truncate">
            {value}
          </p>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => (
          <div className="flex items-center justify-center">
            <p className="text-base-content font-[600] text-[12.5px]`">{value}</p>={" "}
          </div>
        ),
      },
      {
        Header: "Download",
        accessor: "invoicePdf",
        Cell: ({value}) => (
          <div className="flex items-center justify-center">
            <a href={value} download="invoice.pdf" className="text-primary text-[12.5px] font-[400] underline">
              Download Invoice
            </a>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="w-full overflow-x-auto  scrollbar-hide pt-6 pb-3">
      <table className="w-full overflow-x-auto" {...getTableProps()}>
        <thead className="bg-[#02152C] !rounded-md">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="text-[12px] text-base-content py-3  uppercase"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {
          !isLoading && (
            <tbody
          // className="space-y-5"
          {...getTableBodyProps()}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="hover:bg-base-300 even:bg-base-200  cursor-pointer  "
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    className="p-3 py-5 pt-8 text-[14px]  text-base-content"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}{" "}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
          )
        }
      </table>
      {isLoading && (
          <div className="flex sm:mx-5 my-5 flex-col gap-y-2 justify-center">
            <Skeleton className="w-[100%] h-5 " />
            <Skeleton className="w-[100%] h-5 " />
            <Skeleton className="w-[100%] h-5 " />
            <Skeleton className="w-[100%] h-5 " />
          </div>
        )}
    </div>
  );
};

export default TransactionHistory;
