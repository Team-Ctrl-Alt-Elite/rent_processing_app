import { useState, useEffect, useMemo } from "react";
import { useSortBy, useTable, useFilters } from "react-table";
import ColumnFilter from "../tables/ColumnFilter";
import "../../styles/LDashboard.css";
import Table from "../tables/Table";

export default function Units({ getChildProps, units, setIsEditMode }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const data = useMemo(() => units, [units]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const landlordName = localStorage.getItem("name");

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
    if (selectedUnit !== null && selectedUnit !== undefined) {
      const selectedUnitDetails = units.find(
        (unit) => unit.id === selectedUnit.id
      );

      setSelectedUnit(selectedUnitDetails);
    }
  }, [units, selectedUnit]);

  useEffect(() => {
    if (selectedUnit !== null && selectedUnit !== undefined) {
      getChildProps(selectedUnit);
    }
  }, [getChildProps, selectedUnit]);

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
