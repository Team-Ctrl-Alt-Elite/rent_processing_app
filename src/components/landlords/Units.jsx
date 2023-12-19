import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { unit, landlord } from "../../dummyData";

/* UNITS:
1. Landlord should be able to see all units within the property
2. Landlord should be able to see more details about each unit whenever clicked
3. Landlord should be able to see what units are available and what units are occupied by tenants
4. Landlord should be able to sort the units by availability
*/

export default function Units() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitDetails, setUnitDetails] = useState(null);

  const data = useMemo(() => unit, []);

  const columns = useMemo(
    () => [
      {
        Header: "Unit ID",
        accessor: "id",
      },
      {
        Header: "Landlord Name",
        accessor: "landlord_id",
        Cell: ({ value }) => {
          const Landlord = landlord.find((landlord) => landlord.id === value);
          return Landlord ? `${Landlord.first_name} ${Landlord.last_name}` : "Unknown Landlord";
        },
      },
      {
        Header: "More Information",
        Cell: ({ row }) => (
          <button onClick={() => handleUnitClick(row.original)}>View Details</button>
        ),
      },
    ],
    [] // Empty array as the dependency list since there are no external dependencies
  );

  console.log(typeof landlord);
  console.log(landlord);
  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  useEffect(() => {
    // Update unit details when selectedUnit changes
    if (selectedUnit !== null && selectedUnit !== undefined) {
      // Find the selected unit details from the units array
      const selectedUnitDetails = unit.find((unit) => unit.id === selectedUnit.id);

      // Update the state with the selected unit details
      setUnitDetails(selectedUnitDetails);
    }
  }, [selectedUnit]);

  const handleUnitClick = (unit) => {
    console.log("Selected Unit:", unit);
    setSelectedUnit(unit);
  };

  return (
    <section className="container">
      <h3>Units</h3>
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

      {selectedUnit !== null && unitDetails && (
        <div>
          <h2>Unit Details</h2>
          <p>Unit ID: {unitDetails?.id}</p>
          <p>Availability: {String(unitDetails?.is_available)}</p>
          <p>Landlord ID: {unitDetails?.landlord_id}</p>
        </div>
      )}
    </section>
  );
}
