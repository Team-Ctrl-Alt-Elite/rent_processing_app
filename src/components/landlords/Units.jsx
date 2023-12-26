import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import "../../styles/LDashboard.css";
import axios from "axios";

export default function Units({ getChildProps }) {
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitDetails, setUnitDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [unitsResponse, usersResponse] = await Promise.all([
          axios.get("http://localhost:8080/unit/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: "include",
          }),
          axios.get("http://localhost:8080/landlord/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: "include",
          }),
        ]);

        console.log("Axios Units Call: ", unitsResponse?.data);
        console.log("Axios Users Call: ", usersResponse?.data);

        setUnits(unitsResponse?.data);
        setUsers(usersResponse?.data);
      } catch (err) {
        console.error("Units Component Error: ", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update unit details when selectedUnit changes
    if (selectedUnit !== null && selectedUnit !== undefined) {
      // Find the selected unit details from the units array
      const selectedUnitDetails = units.find(
        (unit) => unit.id === selectedUnit.id
      );

      // Update the state with the selected unit details
      setUnitDetails(selectedUnitDetails);
    }
  }, [units, selectedUnit]);

  // const getLandlordDetails = (id) => {
  //   const landlord = users.find((user) => user.id === id);
  //   return landlord
  //     ? `${landlord.first_name} ${landlord.last_name}`
  //     : "Unknown Landlord";
  // };

  console.log("Unit Details: ", unitDetails);

  // useEffect(() => {
  //   if (unitDetails) {
  //     getChildProps(
  //       unitDetails
  //       // <div>
  //       //   <h2>Unit Details</h2>
  //       //   <p>Unit: {unitDetails.id}</p>
  //       //   <p>Bed: {unitDetails.bed}</p>
  //       //   <p>Bath: {unitDetails.bath}</p>
  //       //   <p>Size: {unitDetails.size} sq. ft.</p>
  //       //   <p>Monthly Rent: ${unitDetails.rent}</p>
  //       // </div>
  //     );
  //   }
  // }, []);

  const handleUnitClick = (unit) => {
    console.log("Unit: ", unit);

    if (unitDetails) {
      getChildProps(
        <div>
          <h2>Unit Details</h2>
          <p>Unit: {unitDetails.id}</p>
          <p>Bed: {unitDetails.bed}</p>
          <p>Bath: {unitDetails.bath}</p>
          <p>Size: {unitDetails.size} sq. ft.</p>
          <p>Monthly Rent: ${unitDetails.rent}</p>
        </div>
      );
    }
    setSelectedUnit(unit);
  };

  const data = useMemo(() => units, [units]);
  const columns = useMemo(
    () => [
      {
        Header: "Unit ID",
        accessor: "id",
      },
      {
        Header: "Building",
        accessor: "building_address",
      },
      {
        Header: "Landlord",
        accessor: "landlord_id",
        // Cell: ({ value }) => {
        //   return getLandlordDetails(value);
        // },
      },
      {
        Header: "Size",
        accessor: "size",
      },
      {
        Header: "Bed",
        accessor: "bed",
      },
      {
        Header: "Bath",
        accessor: "bath",
      },
      {
        Header: "Rent",
        accessor: "rent",
      },
      {
        Header: "Available",
        accessor: "is_available",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "More Information",
        Cell: ({ row }) => {
          return (
            <button onClick={() => handleUnitClick(row.original)}>
              View Details
            </button>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

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
    </section>
  );
}
