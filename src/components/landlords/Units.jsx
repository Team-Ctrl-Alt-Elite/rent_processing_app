import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { unit, landlord, unit_details } from "../../dummyData";
import "../../styles/LDashboard.css";
import axios from "axios";

/* UNITS:
1. Landlord should be able to see all units within the property
2. Landlord should be able to see more details about each unit whenever clicked
3. Landlord should be able to see what units are available and what units are occupied by tenants
4. Landlord should be able to sort the units by availability
*/

export default function Units({ getChildProps }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [units, setUnits] = useState([]);
  const data = useMemo(() => units, [units]);

  useEffect(() => {
    const getAllUnits = async () => {
      try {
        const response = await axios.get("http://localhost:8080/unit/all");
        setUnits(response?.data);
      } catch (err) {
        console.log("Units Get Request Error: ", err);
      }
    };

    getAllUnits();
  }, []);

  useEffect(() => {
    selectedUnit &&
      getChildProps(
        <div>
          <h2>Unit Details</h2>
          <p>Unit: {selectedUnit.id}</p>
          <p>
            Monthly Rent: ${selectedUnit.rent.substring(0, 1)},
            {selectedUnit.rent.substring(1)}.00
          </p>
          <p>
            Size: {selectedUnit.size.substring(0, 1)},
            {selectedUnit.size.substring(1)} sq ft
          </p>
          <p>Bed: {selectedUnit.bed}</p>
          <p>Bath: {selectedUnit.bath}</p>
        </div>
      );
  }, [getChildProps, selectedUnit]);

  // WAIT FOR LANDLORD CONTROLLER TO BE FINALIZED. GET LANDLORD NAME FROM LANDLORDCONTRACT MAPPING REQUEST
  // useEffect(() => {
  //   const getLandLordById = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/landlord/`)
  //     } catch (err) {
  //       console.log("Units Get Landlord By Id Error: ", err)
  //     }
  //   }

  //   getLandLordById()
  // }, [])

  const columns = useMemo(
    () => [
      {
        Header: "Unit ID",
        accessor: "id",
      },
      {
        Header: "Landlord",
        accessor: "landlord_id",
        // Cell: ({ value }) => {

        // const Landlord = landlord.find((landlord) => landlord.id === value);
        // return Landlord
        //   ? `${Landlord.first_name} ${Landlord.last_name}`
        //   : "Unknown Landlord";
        // },
      },
      {
        Header: "Available",
        accessor: "is_available",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "More Information",
        Cell: ({ row }) => (
          <button onClick={() => handleUnitClick(row.original)}>
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

  const handleUnitClick = (unit) => {
    // console.log("Selected Unit:", unit);
    const findUnit = unit_details.find((u) => u.id === unit.id);
    setSelectedUnit(findUnit);

    // getChildProps(
    //   <div>
    //     <h2>Unit Details</h2>
    //     <p>Unit: {selectedUnit.id}</p>
    //     <p>
    //       Monthly Rent: ${selectedUnit.rent.substring(0, 1)},
    //       {selectedUnit.rent.substring(1)}.00
    //     </p>
    //     <p>
    //       Size: {selectedUnit.size.substring(0, 1)},
    //       {selectedUnit.size.substring(1)} sq ft
    //     </p>
    //     <p>Bed: {selectedUnit.bed}</p>
    //     <p>Bath: {selectedUnit.bath}</p>
    //   </div>
    // );
  };

  return (
    <section className="container">
      {/* <h3>Units</h3> */}
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
      {/* {selectedUnit && (
        <div>
          <h2>Unit Details</h2>
          <p>Unit: {selectedUnit.id}</p>
          <p>
            Monthly Rent: ${selectedUnit.rent.substring(0, 1)},
            {selectedUnit.rent.substring(1)}.00
          </p>
          <p>
            Size: {selectedUnit.size.substring(0, 1)},
            {selectedUnit.size.substring(1)} sq ft
          </p>
          <p>Bed: {selectedUnit.bed}</p>
          <p>Bath: {selectedUnit.bath}</p>
        </div>
      )} */}
    </section>
  );
}
