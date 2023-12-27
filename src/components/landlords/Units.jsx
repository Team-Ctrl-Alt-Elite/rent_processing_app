import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSortBy, useTable, useFilters } from "react-table";
import "../../styles/LDashboard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const filterCategories = [
  "Unit ID",
  "Building",
  "Landlord",
  "Size",
  "Bed",
  "Bath",
  "Rent",
  "Available",
];

export default function Units({ getChildProps }) {
  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitDetails, setUnitDetails] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
  const data = useMemo(() => units, [units]);
  const navigate = useNavigate();

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
        if (err.response.status === 401) {
          navigate("/auth/login");
        }
        console.error("Units Component Error: ", err);
      }
    };

    fetchData();
  }, [navigate]);

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

  useEffect(() => {
    if (unitDetails !== null && unitDetails !== undefined) {
      getChildProps(unitDetails);
    }
  }, [getChildProps, unitDetails]);

  // const getLandlordDetails = (id) => {
  //   const landlord = users.find((user) => user.id === id);
  //   return landlord
  //     ? `${landlord.first_name} ${landlord.last_name}`
  //     : "Unknown Landlord";
  // };

  // console.log("Unit Details: ", unitDetails);

  const handleUnitClick = (unit) => {
    console.log("Unit: ", unit);
    if (unit !== null && unit !== undefined) setSelectedUnit(unit);
  };

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
        Cell: ({ value }) => {
          let isAvailable = "";
          value ? (isAvailable = "Yes") : (isAvailable = "No");
          return isAvailable;
        },
      },
      {
        Header: "More Information",
        Cell: ({ row }) => {
          return (
            <button onClick={() => handleUnitClick(row.original)} className="ldash-button">
              View Details
            </button>
          );
        },
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

  const handleFilterDropDown = (e) => {
    setSelectedFilterCategory(e.target.value);
  };

  const handleFilter = (e) => {
    const value = e.target.value || undefined;

    switch (selectedFilterCategory) {
      case "Unit ID":
        setFilter("id", String(value));
        setFilterInput(value);
        break;
      case "Building":
        setFilter("building_address", String(value));
        setFilterInput(value);
        break;
      case "Landlord":
        setFilter("building_address", String(value));
        setFilterInput(value);
        break;
      case "Size":
        setFilter("building_address", String(value));
        setFilterInput(value);
        break;
      case "Bed":
        setFilter("building_address", String(value));
        setFilterInput(value);
        break;
      case "Bath":
        setFilter("building_address", String(value));
        setFilterInput(value);
        break;
      case "Rent":
        setFilter("building_address", String(value));
        setFilterInput(value);
        break;
      case "Available":
        setFilter("building_address", String(value));
        setFilterInput(value);
        break;
      default:
        break;
    }
  };

  return (
    <section className="container">
      {/* <h3>Units</h3> */}
      <div>
        <label>
          Filter Category:
          <select
            value={selectedFilterCategory}
            onChange={handleFilterDropDown}
          >
            <option value="">-- Select Filter Category --</option>
            {filterCategories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

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
