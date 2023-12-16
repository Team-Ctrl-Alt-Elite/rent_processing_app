import { useMemo } from "react";
import { useTable } from "react-table";
import { tenantPaymentHistory } from "../../dummyData";
import "../../styles/tables.css";

/*
References the rent_payment_log table
*/

export default function History() {
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
      },
      {
        Header: "Amount Paid ($)",
        accessor: "amount_paid",
      },
      {
        Header: "Payment Type",
        accessor: "payment_medium",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <section className="container">
      <h3>Tenant Payment History</h3>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
