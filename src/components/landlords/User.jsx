import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable, useFilters } from "react-table";
import ReactLoading from "react-loading";
import Table from "../tables/Table";
import ColumnFilter from "../tables/ColumnFilter";
import Footer from "../Footer";
import axios from "axios";
import "../../styles/LDashboard.css";
import "../../styles/Loading.css";

export default function User({ getChildProps, type, color }) {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const data = useMemo(() => user, [user]);
  const token = localStorage.getItem("token");
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tenant/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        });
        setUser(response?.data);
        setIsLoading(false);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        } else console.log("User GET Request Error: ", err);
      }
    };
    getAllUser();
  }, [navigate]);

  console.log("User: ", user);

  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
        Cell: ({ value }) => {
          return `${value.substring(0, 3)}-${value.substring(
            3,
            6
          )}-${value.substring(6)}`;
        },
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
          <div className="loading-title">Loading User Data</div>
          <ReactLoading type={"balls"} color={"gray"} height={60} width={60} />
        </div>
      )}
      <Footer />
    </>
  );
}
