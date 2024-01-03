import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable, useFilters } from "react-table";
import Table from "../tables/Table";
import ColumnFilter from "../tables/ColumnFilter";
import axios from "axios";
import "../../styles/LDashboard.css";

export default function Contracts({ getChildProps }) {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  // const [tenantDetails, setTenantDetails] = useState(null);
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

  console.log("Contracts: ", contracts);

  // useEffect(() => {
  //   const getTenantData = async () => {
  //     console.log("selected contract: ", selectedContract);

  //     try {
  //       if (selectedContract !== null && selectedContract !== undefined) {
  //         const response = await axios.get(
  //           `http://localhost:8080/tenant/tenantContracts/${selectedContract.tenant_id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //             withCredentials: "include",
  //           }
  //         );
  //         console.log("Tenant Details: ", response?.data);
  //         setTenantDetails(response?.data);
  //       }
  //     } catch (err) {
  //       if (err.response.status === 401) {
  //         navigate("/auth/login");
  //       }
  //       console.log("Contracts getTenantData Error: ", err);
  //     }
  //   };
  //   getTenantData();
  // }, [selectedContract, token, navigate]);

  // useEffect(() => {
  //   if (tenantDetails !== null && tenantDetails !== undefined)
  //     getChildProps(tenantDetails);
  // }, [getChildProps, tenantDetails]);

  useEffect(() => {
    if (selectedContract !== null && selectedContract !== undefined)
      getChildProps(selectedContract);
  }, [getChildProps, selectedContract]);

  const handleContractClick = (contract) => {
    if (contract !== null && contract !== undefined)
      setSelectedContract(contract);
  };

  // const findTenantName = (tenantId) => {
  //   if (tenantId !== null && tenantId !== undefined) {
  //     const tenant = contracts.find((tenant) => tenant.id === tenantId);
  //     return tenant
  //       ? `${tenant.first_name} ${tenant.last_name}`
  //       : "Unknown Tenant";
  //   }
  // };

  const columns = useMemo(
    () => [
      {
        Header: "Contract ID",
        accessor: "contract_id",
      },
      {
        Header: "Tenant ID",
        accessor: "tenant_id",
      },
      // {
      //   Header: "Tenant Name",
      //   accessor: "tenant_id",
      //   Cell: ({ value }) => findTenantName(value),
      // },
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
        Header: "More Information",
        disableFilters: true,
        Cell: ({ row }) => (
          <button
            onClick={() => handleContractClick(row.original)}
            className="ldash-button"
          >
            Download
          </button>
        ),
      },
    ],
    []
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
