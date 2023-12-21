import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { contracts, tenants } from "../../dummyData";
import "../../styles/LDashboard.css";

/* LANDLORD DASHBOARD FOR CONTRACTS:
1. Landlord should be able to see the contracts for every tenant on the property
2. Landlord should be able to see more information about each contract when clicked
*/

export default function Contracts({getChildProps}) {
  const [selectedContract, setSelectedContract] = useState(null);
  const [contractDetails, setContractDetails] = useState(null);

  const data = useMemo(() => contracts, []);
  const columns = useMemo(
    () => [
      {
        Header: "Contract ID",
        accessor: "id",
      },
      {
        Header: "Tenant Name",
        accessor: "tenant_id",
        Cell: ({ value }) => {
        const tenant = tenants.find(tenant => tenant.id === value);
        return tenant ? `${tenant.first_name} ${tenant.last_name}` : "Unknown Tenant";
      },
      },
      {
        Header: "More Information",
        Cell: ({ row }) => (
          <button onClick={() => handleContractClick(row.original)}>View Details</button>
          ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  useEffect(() => {
    if (selectedContract !== null && selectedContract !== undefined) {
      const selectedContractDetails = contracts.find(contract => contract.id === selectedContract.id);
      setContractDetails(selectedContractDetails);
    }
  }, [selectedContract]);

  const handleContractClick = (contract) => {
    // console.log("Selected Contract:", contract);
    getChildProps(
      <div>
          <h2>Contract Details</h2>
          <p>Contract ID: {contract.id}</p>
          <p>Unit ID: {contract.unit_id}</p>
          <p>Monthly Rent: {contract.monthly_rent}</p>
          <p>Lease Start: {contract.lease_starting_from}</p>
          <p>Lease End: {contract.lease_ending_on}</p>
          <p>Tenant ID: {contract.tenant_id}</p>
          <p>Landlord ID: {contract.landlord_id}</p>
        </div>
    )
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
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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

      {/* {selectedContract !== null && contractDetails && (
        <div>
          <h2>Contract Details</h2>
          <p>Contract ID: {contractDetails?.id}</p>
          <p>Unit ID: {contractDetails?.unit_id}</p>
          <p>Monthly Rent: {contractDetails?.monthly_rent}</p>
          <p>Lease Start: {contractDetails?.lease_starting_from}</p>
          <p>Lease End: {contractDetails?.lease_ending_on}</p>
          <p>Tenant ID: {contractDetails?.tenant_id}</p>
          <p>Landlord ID: {contractDetails?.landlord_id}</p>
        </div>
      )} */}
    </section>
  );
}
