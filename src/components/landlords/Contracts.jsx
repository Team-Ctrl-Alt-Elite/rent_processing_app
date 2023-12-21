import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "../../styles/LDashboard.css";

/* LANDLORD DASHBOARD FOR CONTRACTS:
1. Landlord should be able to see the contracts for every tenant on the property
2. Landlord should be able to see more information about each contract when clicked
*/

export default function Contracts({ getChildProps }) {
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([]);
  const data = useMemo(() => contracts, [contracts]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const users = await axios.get(
          "http://localhost:8080/tenant/tenantContracts"
        );
        setContracts(users?.data);
      } catch (err) {
        console.log("TDashboard Error:", err);
      }
    };

    getAllUsers();
  }, []);

  console.log(contracts);

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  useEffect(() => {
    // Update contract details when selectedContract changes
    if (selectedContract !== null && selectedContract !== undefined) {
      // Find the selected contract details from the contracts array
      const selectedContractDetails = contracts.find(
        (contract) => contract.id === selectedContract.id
      );

      // Update the state with the selected contract details
      setContractDetails(selectedContractDetails);
    }
  }, [selectedContract]);

  const handleContractClick = (contract) => {
    console.log("Selected Contract:", contract);
    setSelectedContract(contract);
  };

  return (
    <section className="container">
      {/* <h3>Contracts</h3> */}
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
      {selectedContract !== null && contractDetails && (
        <div>
          <h2>Contract Details</h2>
          <p>Contract ID: {selectedContract.id}</p>
          <p>Unit: {selectedContract.unit}</p>
          <p>Tenant ID: {selectedContract.tenant_id}</p>
          <p>Tenant First Name: {selectedContract.Tenant_first_name}</p>
          <p>Tenant Last Name: {selectedContract.Tenant_last_name}</p>
          <p>Lease Start Date: {selectedContract.lease_starting_date}</p>
          <p>Lease End Date: N/A</p>
          <p>Monthly Rent: {selectedContract.monthly_rent}</p>
          <p>Tenant Email: {selectedContract.Tenant_username}</p>
          <p>Tenant Phone Number: {selectedContract.phonenumber}</p>
        </div>
      )}{" "}
      */}
    </section>
  );
}
