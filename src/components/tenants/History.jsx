import { useMemo, useState, useEffect } from "react";
import { useSortBy, useTable, useFilters } from "react-table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Table from "../tables/Table";
import ColumnFilter from "../tables/ColumnFilter";
import Footer from "../Footer";
import "../../styles/tables.css";
import "../../styles/Loading.css";

export default function History({ type, color }) {
  const [rentLogs, setRentLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const data = useMemo(() => rentLogs, [rentLogs]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    setIsLoading(true);
    const getTenantRentLogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pay/api/v3/transaction/${userId}`
        );

        console.log("User Rent Payment Logs: ", response?.data.response);
        setRentLogs(response?.data.response);
        setIsLoading(false);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        } else console.log("Tenant Rent History Fetch Error: ", err);
      }
    };

    getTenantRentLogs();
  }, [userId, navigate]);

  const columns = useMemo(
    () => [
      {
        Header: "Transaction ID",
        accessor: "transaction_id",
      },
      {
        Header: "Payment Date",
        accessor: "transaction_date",
      },
      {
        Header: "Amount Paid",
        accessor: "amount",
        Cell: ({ value }) => {
          return <>{`$${value}.00`}</>;
        },
      },
      {
        Header: "Method",
        accessor: "transaction_method",
      },
      {
        Header: "Card Detail",
        accessor: "transaction_detail",
      },
      {
        Header: "Status",
        accessor: "transaction_status_name",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, defaultColumn }, useFilters, useSortBy);

  return (
    <>
      {!isLoading ? (
        <Table
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
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
