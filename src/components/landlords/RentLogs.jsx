import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";
import { unit, rent_payment_log } from "../../dummyData";
import "../../styles/LDashboard.css";

/* LANDLORD PAYMENT REPORTS:
1. Landlord should be able to view all payments within each pay period (monthly)
2. Landlord should be able to see what rent payments are on-time and what payments are late
*/

export default function RentLogs({ getChildProps }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [logDetails, setLogDetails] = useState(null);
  const [rentLogs, setRentLogs] = useState([]);
  const data = useMemo(() => rent_payment_log, []);

  useEffect(() => {
    const getAllRentLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/rentPaymentLog/all"
        );
        setRentLogs(response?.data);
      } catch (err) {
        console.log("Rent Logs GET Request Error: ", err);
      }
    };

    getAllRentLogs();
  }, []);

  console.log(rentLogs);

  const columns = useMemo(
    () => [
      {
        Header: "Payment Date",
        accessor: "payment_date",
      },
      {
        Header: "Amount",
        accessor: "amount_paid",
      },
      {
        Header: "Unit ID",
        accessor: "unit_id",
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
      },
      {
        Header: "More Information",
        Cell: ({ row }) => (
          <button onClick={() => handleLogClick(row.original)}>
            View Details
          </button>
        ),
      },
    ],
    []
  );

  // const paymentLogs = rent_payment_log;

  // // Extract unique months and years from payment logs
  // const uniqueMonths = Array.from(new Set(paymentLogs.map((log) => log.payment_date.slice(0, 7))));

  // const [selectedMonthYear, setSelectedMonthYear] = useState("");

  // const handleDropdownChange = (e) => {
  //   setSelectedMonthYear(e.target.value);
  // };

  // const filteredLogs = paymentLogs.filter((log) =>
  //   log.payment_date.startsWith(selectedMonthYear)
  // );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  useEffect(() => {
    if (selectedLog) {
      setLogDetails(selectedLog);
    }
  }, [selectedLog]);

  const handleLogClick = (log) => {
    getChildProps(
      <div>
        <h2>Payment Log Details</h2>
        <p>Payment ID: {log.id}</p>
        <p>Contract ID: {log.contract_id}</p>
        <p>Amount Paid: {log.amount_paid}</p>
        <p>Payment Date: {log.payment_date}</p>
        <p>Payment Medium: {log.payment_medium}</p>
        <p>
          {log.check_number
            ? `Check Number: ${log.check_number}`
            : "Check Number: N/A"}
        </p>
        <p>
          {log.online_transaction_number
            ? `Online Transaction Number: ${log.online_transaction_number}`
            : "Online Transaction Number: N/A"}
        </p>
      </div>
    );
    setSelectedLog(log);
  };

  return (
    <section className="container">
      {/* <h3>Rent Payment Logs</h3> */}
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
}
