import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable, useFilters, usePagination } from "react-table";
import ReactLoading from "react-loading";
import ColumnFilter from "../tables/ColumnFilter";
import Footer from "../Footer";
import axios from "axios";
import "../../styles/LDashboard.css";
import "../../styles/Loading.css";
import PaginationTable from "../tables/PaginationTable";

export default function RentLogs({ getChildProps, type, color }) {
  const [rentLogs, setRentLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const data = useMemo(() => rentLogs, [rentLogs]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getAllRentLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pay/api/v3/transaction/all",
          {
            headers: {
              Authorization:
                "Basic azdZZlN0WjlNNkk1RFZiMW8yNFFsUG5KcEs4Z3UwUlg6VjhMSzRsWUJYV0ViYWtPamZHSTZzWjE3M3VGQWRnU24=",
              "Content-Type": "application/json",
            },
            withCredentials: "include",
          }
        );
        setRentLogs(response?.data.response);
        setIsLoading(false);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        } else console.log("Rent Logs GET Request Error: ", err);
      }
    };
    getAllRentLogs();
  }, [navigate]);

  console.log("Rent Logs: ", rentLogs);

  const columns = useMemo(
    () => [
      {
        Header: "Transaction ID",
        accessor: "transaction_id",
      },
      {
        Header: "Tenant ID",
        accessor: "customer_id",
      },
      {
        Header: "Payment Date",
        accessor: "transaction_date",
        Cell: ({ value }) => {
          let date = value.split("-");
          return `${date[1]}/${date[2]}/${date[0]}`;
        },
      },
      {
        Header: "Amount Paid",
        accessor: "amount",
        Cell: ({ value }) => {
          return <>{`$${value}`}</>;
        },
      },
      {
        Header: "Method",
        accessor: "transaction_method",
      },
      {
        Header: "Type",
        accessor: "transaction_detail",
      },
      {
        Header: "Status",
        accessor: "transaction_status_name",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      {!isLoading ? (
        <PaginationTable
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          prepareRow={prepareRow}
        />
      ) : (
        <div className="loading">
          <div className="loading-title">Loading Rent Logs</div>
          <ReactLoading type={"balls"} color={"gray"} height={60} width={60} />
        </div>
      )}
      <Footer />
    </>
  );
}
