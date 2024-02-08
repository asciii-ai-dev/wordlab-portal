import React from "react";
import ButtonCommon from "../Common/Button";
import { useTable } from "react-table";
import { TiTick } from "react-icons/ti";
import { useGetBusinessQuery } from "../../features/business/businessApi";
import Skeleton from "react-loading-skeleton";

const BusinessRequest = ({ handleVisible, businessData, isLoading }) => {
  function getStatusColor(value) {
    value = value?.toLowerCase();
    switch (value) {
      case "active":
        return "#1F845A";
      case "pending":
        return "#E2B203";
      case "accepted":
        return "#0C66E4";
      default:
        return "#CA3521";
    }
  }
  const data = React.useMemo(() => businessData, [businessData]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div className="flex justify-center ">
            <div
              style={{ backgroundColor: getStatusColor(value) }}
              className={`badge text-white border-none shadow-md w-[70px] py-3 rounded-[4px] uppercase text-[10px] !font-[500]`}
            >
              {value}
            </div>
          </div>
        ),
      },
      {
        Header: "Business Name",
        accessor: "businessName",
        Cell: ({ value }) => (
          <p className="max-w-[200px] text-[13px] truncate">{value}</p>
        ),
      },
      {
        Header: "Payment",
        accessor: "payment",
        Cell: () => (
          <div className="flex items-center justify-center">
            <TiTick className="text-center text-[22px]" />
          </div>
        ),
      },
      {
        Header: "Use Cases",
        accessor: "useCases",
        Cell: ({ value }) => (
          <div className="flex items-center justify-center">
            {value?.length <= 3 ? (
              value?.map((v, i) => {
                return (
                  <div
                    className="flex w-fit pl-3 bg-[#F1F6FD] rounded-full px-3 py-2"
                    key={`item-${i}`}
                  >
                    <p className="text-light text-center text-[10px]">{v}</p>
                  </div>
                );
              })
            ) : (
              <>
                {value.slice(0, 2)?.map((v, i) => {
                  return (
                    <div
                      className="flex w-fit pl-3 bg-[#F1F6FD] rounded-full px-3 py-2"
                      key={`item-${i}`}
                    >
                      <p className="text-light text-center text-[10px]">{v}</p>
                    </div>
                  );
                })}
                <div className="flex w-fit pl-3 bg-[#F1F6FD] rounded-full px-3 py-2">
                  <p className="text-light text-center font-semibold text-[10px]">
                    +{value?.length - 2}
                  </p>
                </div>
              </>
            )}
          </div>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: () => (
          <div className="flex justify-center">
            <div className="bg-[#88909B] h-[2px] w-6 items-end" />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="md:space-y-14 space-y-6">
      <div className="flex items-center  justify-between space-y-4 ">
        <h2 className="text-base-content text-[16px] md:text-[18px] !font-[500] pt-5 ">
          Request Status
        </h2>
        <ButtonCommon
          className="!w-fit md:w-[200px] !text-[10px] "
          title="Register a new business"
          onClick={handleVisible}
        />
      </div>
      <div>
        <p className="text-[13.5px] font-[400] text-light">
          Lorem ipsum dolor sit amet consectetur. Integer montes quam
          condimentum risus et erat aliquam. Blandit enim non nullam tristique
          id suspendisse eget. Vestibulum nulla vestibulum mattis massa
          convallis. Et eget feugiat non sed sed pretium.
        </p>
      </div>
      <div className="w-full overflow-x-auto business_table scrollbar-hide">
        <table className="w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="text-[12px] text-dark"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {!isLoading && (
            <tbody
              className="border-[88909B] border-r-0 border-l-0 border-2 space-y-10"
              {...getTableBodyProps()}
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="hover:bg-base-300 even:bg-base-200  hover:bg-opacity-90 cursor-pointer border-r-0 border-t-0 border-l-0 border border-b-[#e9e7e7]"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      <td
                        className="p-3 py-5 text-[14px]  text-base-content"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}{" "}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          )}
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
    </div>
  );
};

export default BusinessRequest;
