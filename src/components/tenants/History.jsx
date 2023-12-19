import { useMemo, useState } from "react";
import { useSortBy, useTable, useFilters } from "react-table";
import { tenantPaymentHistory } from "../../dummyData";
import "../../styles/tables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

/*
References the rent_payment_log table
*/

export default function History() {
  const [filterInput, setFilterInput] = useState("");
  const data = useMemo(() => tenantPaymentHistory, []); // might be different syntax when calling to db. look into this
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Payment Date",
        accessor: "payment_date",
        Cell: ({ cell: { value } }) => {
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
        Cell: ({ cell: { value } }) => {
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data }, useFilters, useSortBy);

  const handleFilter = (e) => {
    const value = e.target.value || undefined;
    setFilter("payment_date", value);
    setFilterInput(value);
  };

  return (
    <section className="container">
      <h3>Tenant Payment History</h3>
      <div>
        <table {...getTableProps()}>
          <thead>
            <input
              type="text"
              value={filterInput}
              onChange={handleFilter}
              placeholder="Search By Payment Date"
              className="thead-input"
            />
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    <div className="th-wrapper">
                      {column.render("Header")}
                      <FontAwesomeIcon
                        icon={faSort}
                        size="xs"
                        className="fa-icon"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
