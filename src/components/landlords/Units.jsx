import { useState, useEffect, useMemo } from "react";
import { useSortBy, useTable, useFilters } from "react-table";
import ColumnFilter from "../tables/ColumnFilter";
import "../../styles/LDashboard.css";
import Table from "../tables/Table";

export default function Units({ getChildProps, units, setIsEditMode }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const data = useMemo(() => units, [units]);
<<<<<<< Updated upstream
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const landlordName = localStorage.getItem("name");
=======
  const navigate = useNavigate();
>>>>>>> Stashed changes

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

        Cell: ({ value }) => {
          return landlordName;
        },
      },
      {
        Header: "Size",
        accessor: "size",
        Cell: ({ value }) => value + " sq ft",
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
        Cell: ({ value }) => "$" + value,
      },
      {
        Header: "Available",
        accessor: "is_available",
        Cell: ({ value }) => {
          let isAvailable = "";
          value ? (isAvailable = "True") : (isAvailable = "False");
          return isAvailable;
        },
      },
      {
        Header: "Edit",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <button
<<<<<<< Updated upstream
              onClick={() => {
                let unit = row.original;
                if (unit !== null && unit !== undefined) {
                  setIsEditMode(true);
                  setSelectedUnit(unit);
                }
              }}
              className="ldash-button"
            >
              Edit
=======
              onClick={() => handleUnitClick(row.original)}
              className="ldash-button"
            >
              View Details
>>>>>>> Stashed changes
            </button>
          );
        },
      },
    ],
    [landlordName, setIsEditMode]
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

  useEffect(() => {
<<<<<<< Updated upstream
    if (selectedUnit !== null && selectedUnit !== undefined) {
      const selectedUnitDetails = units.find(
        (unit) => unit.id === selectedUnit.id
      );

      setSelectedUnit(selectedUnitDetails);
=======
    // const clearFilters = () => {
    //   setSelectedFilterCategory("");
    //   setFilterInput("");
    //   setFilter("id", ""); // Clearing filters for all relevant categories
    //   setFilter("building_address", "");
    //   setFilter("landlord_id", "");
    //   setFilter("size", "");
    //   setFilter("bed", "");
    //   setFilter("bath", "");
    //   setFilter("rent", "");
    //   setFilter("is_available", "");
    // };

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

        // console.log("Axios Units Call: ", unitsResponse?.data);
        // console.log("Axios Users Call: ", usersResponse?.data);

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

    // const cleanup = () => {
    //   clearFilters();
    // };

    // return cleanup;
  }, [navigate]);

  const repopulateTable = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/unit/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: "include",
      });

      setUnits(response?.data);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  useEffect(() => {
    if (filterInput === "") repopulateTable();
  }, [filterInput, selectedFilterCategory]);

  // const resetTable = async () => {
  //   setSelectedFilterCategory("");
  //   setFilterInput("");
  //   fetchData();
  // };

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

  // useEffect(() => {
  //   const clearFilters = () => {
  //     setSelectedFilterCategory("");
  //     setFilterInput("");
  //     setFilter("id", ""); // Clearing filters for all relevant categories
  //     setFilter("building_address", "");
  //     setFilter("landlord_id", "");
  //     setFilter("size", "");
  //     setFilter("bed", "");
  //     setFilter("bath", "");
  //     setFilter("rent", "");
  //     setFilter("is_available", "");
  //   };

  //   const cleanup = () => {
  //     clearFilters();
  //   };

  //   return cleanup;
  // }, [setFilter]);

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
        setFilter("landlord_id", String(value));
        setFilterInput(value);
        break;
      case "Size":
        setFilter("size", String(value));
        setFilterInput(value);
        break;
      case "Bed":
        setFilter("bed", String(value));
        setFilterInput(value);
        break;
      case "Bath":
        setFilter("bath", String(value));
        setFilterInput(value);
        break;
      case "Rent":
        setFilter("rent", String(value));
        setFilterInput(value);
        break;
      case "Available":
        setFilter("is_available", String(value));
        setFilterInput(value);
        break;
      default:
        setFilter("");
        setFilterInput("");
        break;
>>>>>>> Stashed changes
    }
  }, [units, selectedUnit]);

  useEffect(() => {
    if (selectedUnit !== null && selectedUnit !== undefined) {
      getChildProps(selectedUnit);
    }
  }, [getChildProps, selectedUnit]);

  // console.log("Filter Input:", filterInput);

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
