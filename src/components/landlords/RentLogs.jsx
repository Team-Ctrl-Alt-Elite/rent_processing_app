import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable, useFilters } from "react-table";
import axios from "axios";
import "../../styles/LDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const filterCategories = [
  "Payment Date",
  "Amount",
  "Unit ID",
  "Payment Status",
];

export default function RentLogs({ getChildProps }) {
  const [selectedLog, setSelectedLog] = useState(null);
  const [logDetails, setLogDetails] = useState(null);
  const [rentLogs, setRentLogs] = useState([]);
  const [filterDropDown, setFilterDropDown] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
  const data = useMemo(() => rentLogs, [rentLogs]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllRentLogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8080/rentPaymentLog/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: "include",
          }
        );
        setRentLogs(response?.data);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        }
        console.log("Rent Logs GET Request Error: ", err);
      }
    };
    getAllRentLogs();
  }, [navigate]);

  console.log("Rent Logs: ", rentLogs);

  useEffect(() => {
    // Update unit details when selectedUnit changes
    if (selectedLog !== null && selectedLog !== undefined) {
      // Find the selected unit details from the units array
      const selectedLogDetails = rentLogs.find(
        (log) => log.id === selectedLog.id
      );

      // Update the state with the selected unit details
      setLogDetails(selectedLogDetails);
    }
  }, [rentLogs, selectedLog]);

  useEffect(() => {
    if (logDetails !== null && logDetails !== undefined) {
      getChildProps(logDetails);
    }
  }, [getChildProps, logDetails]);

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
          <button onClick={() => handleLogClick(row.original)} className="ldash-button">
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  const handleFilterDropDown = (e) => {
    setSelectedFilterCategory(e.target.value);
  };

  const handleFilter = (e) => {
    const value = e.target.value || undefined;
    setFilter("payment_date", value);
    setFilterInput(value);
  };

  const handleLogClick = (log) => {
    if (log !== null && log !== undefined) setSelectedLog(log);
  };

  return (
    <section className="container">
      {/* <h3>Rent Payment Logs</h3> */}
      {rentLogs.length > 1 ? (
        <div>
          <label>
            Filter Category:
            <select
              value={selectedFilterCategory}
              onChange={handleFilterDropDown}
            >
              <option value="">-- Select Filter Category --</option>
              {filterCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                  {/* {new Date(`${monthYear}-1`).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })} */}
                </option>
              ))}
            </select>
          </label>

          <input
            type="text"
            value={filterInput}
            onChange={handleFilter}
            placeholder="Search"
            className="thead-input"
          />
          <table {...getTableProps()}>
            <thead>
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
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          No Rent Payment Logs To Display
        </div>
      )}
    </section>
  );
}
