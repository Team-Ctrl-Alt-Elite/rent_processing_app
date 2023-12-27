import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable, useFilters } from "react-table";
import axios from "axios";
import "../../styles/LDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

/* LANDLORD DASHBOARD FOR CONTRACTS:
1. Landlord should be able to see the contracts for every tenant on the property
2. Landlord should be able to see more information about each contract when clicked
*/

export default function Contracts({ getChildProps }) {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractDetails, setContractDetails] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const data = useMemo(() => contracts, [contracts]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        console.log("Tenant Contracts: ", tenantContracts?.data);
        setContracts(tenantContracts?.data);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        }
        console.log("TDashboard Error:", err);
      }
    };

    getAllTenantContracts();
  }, [navigate]);

  console.log(contracts);

  useEffect(() => {
    // Update unit details when selectedUnit changes
    if (selectedContract !== null && selectedContract !== undefined) {
      // Find the selected unit details from the units array
      const selectedContractDetails = contracts.find(
        (contract) => contract.id === selectedContract.id
      );

      // Update the state with the selected unit details
      setContractDetails(selectedContractDetails);
    }
  }, [contracts, selectedContract]);

  useEffect(() => {
    if (contractDetails !== null && contractDetails !== undefined) {
      getChildProps(contractDetails);
    }
  }, [getChildProps, contractDetails]);

  const columns = useMemo(
    () => [
      {
        Header: "Contract ID",
        accessor: "contract_id",
      },
      {
        Header: "Tenant ID",
        accessor: "tenant_id",
        // Cell: ({ value }) => {
        //   const tenant = contracts.find((tenant) => tenant.id === value);
        //   return tenant
        //     ? `${tenant.first_name} ${tenant.last_name}`
        //     : "Unknown Tenant";
        // },
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Lease Start Date",
        accessor: "lease_starting_date",
      },
      {
        Header: "More Information",
        Cell: ({ row }) => (
          <button onClick={() => handleContractClick(row.original)}>
            View Details
          </button>
        ),
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
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  const handleFilter = (e) => {
    const value = e.target.value || undefined;
    setFilter("payment_date", value);
    setFilterInput(value);
  };

  const handleContractClick = (contract) => {
    console.log("Selected Contract:", contract);
    if (contract !== null && contract !== undefined)
      setSelectedContract(contract);
  };

  return (
    <section className="container">
      {/* <h3>Contracts</h3> */}
      <div>
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
    </section>
  );
}
