import { useMemo } from "react";
import { useSortBy, useTable, useFilters } from "react-table";
import { tenantPaymentHistory } from "../../dummyData";
import Table from "../tables/Table";
import ColumnFilter from "../tables/ColumnFilter";
import "../../styles/tables.css";

export default function History() {
  const data = useMemo(() => tenantPaymentHistory, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Payment Date",
        accessor: "payment_date",
        Cell: ({ value }) => {
          const isLate = Number(value.substring(8));
          return (
            <>
              {isLate > 1 ? (
                <div style={{ color: "red" }}>{value}</div>
              ) : (
                <div>{value}</div>
              )}
            </>
          );
        },
      },
      {
        Header: "Amount Paid",
        accessor: "amount_paid",
        Cell: ({ value }) => {
          return <>{`$${value}.00`}</>;
        },
      },
      {
        Header: "Payment Type",
        accessor: "payment_medium",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, defaultColumn }, useFilters, useSortBy);

  return (
    <Table
      getTableProps={getTableProps}
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
    />
  );
}
