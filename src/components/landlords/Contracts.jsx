import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable, useFilters } from "react-table";
import Table from "../tables/Table";
import ColumnFilter from "../tables/ColumnFilter";
import axios from "axios";
import "../../styles/LDashboard.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";
import ReactLoading from "react-loading";

export default function Contracts({ type, color }) {
  const [contracts, setContracts] = useState([]);
  const data = useMemo(() => contracts, [contracts]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllTenantContracts = async () => {
      try {
        const tenantContracts = await axios.get(
          "http://localhost:8080/landlord/landlordContracts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContracts(tenantContracts?.data);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        }
        console.log("TDashboard Error:", err);
      }
    };

    getAllTenantContracts();
  }, [navigate, token]);

  const columns = useMemo(
    () => [
      {
        Header: "Contract ID",
        accessor: "contract_id",
      },
      {
        id: "tenant_id",
        Header: "Tenant ID",
        accessor: "tenant_id",
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Lease Start",
        accessor: "lease_starting_date",
        Cell: ({ value }) => {
          const date = new Date(value); // Unix timestamp
          const formattedDate = date.toLocaleDateString();
          return formattedDate;
        },
      },
      {
        Header: "Lease End",
        accessor: "lease_ending_on",
        Cell: ({ value }) => {
          const date = new Date(value); // Unix timestamp
          const formattedDate = date.toLocaleDateString();
          return formattedDate;
        },
      },
      {
        id: "contract_download",
        Header: "Hard Copy",
        accessor: "tenant_id",
        disableFilters: true,
        Cell: ({ value }) => {
          if (value !== null && value !== undefined) {
            return (
              <PDFDownloadLink
                document={<PDFFile tenantId={value} contracts={contracts} />}
                fileName="Download"
              >
                {({ loading }) =>
                  loading ? (
                    <ReactLoading
                      type={"bubbles"}
                      color={"gray"}
                      height={20}
                      width={20}
                    />
                  ) : (
                    <button className="ldash-button">Download</button>
                  )
                }
              </PDFDownloadLink>
            );
          }
        },
      },
    ],
    [contracts]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFilters,
      useSortBy
    );

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
