import { useState, useEffect, useMemo } from "react";
import { useSortBy, useTable, useFilters } from "react-table";
import ColumnFilter from "../tables/ColumnFilter";
import "../../styles/LDashboard.css";
import Table from "../tables/Table";
import axios from "axios";

export default function Units({ getChildProps, units, setIsEditMode }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const data = useMemo(() => units, [units]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const token = localStorage.getItem("token");
  const [successMessage, setSuccessMessage] = useState("");
  const [newUnitData, setNewUnitData] = useState({
    landlord_id: 1,
    building_address: "",
    size: 0,
    bed: 0,
    bath: 0,
    rent: 0,
    is_available: true,
  });
  const handleNewUnitChange = (e) => {
    setNewUnitData({ ...newUnitData, [e.target.name]: e.target.value });
  };

  const submitNewUnit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/unit/add",
        newUnitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFormVisible(false);
      setSuccessMessage("New unit created successfully!");
    } catch (error) {
      console.error("Error creating new unit:", error);
    }
  };
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
              className="ldash-button">
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

  // console.log("Filter Input:", filterInput);

  return (
    <>
      <button onClick={() => setIsFormVisible(true)} className="ldash-button">
        Add New Unit
      </button>
      {isFormVisible && (
        <form onSubmit={submitNewUnit}>
          {/* <div className="form-wrapper">
            <label htmlFor="landlord_id">Landlord ID:</label>
            <input
              type="number"
              id="landlord_id"
              name="landlord_id"
              value={newUnitData.landlord_id}
              onChange={handleNewUnitChange}
            />
          </div> */}
          <div className="form-wrapper">
            <label htmlFor="building_address">Building Address:</label>
            <input
              type="text"
              id="building_address"
              name="building_address"
              value={newUnitData.building_address}
              onChange={handleNewUnitChange}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="size">Size (sq ft):</label>
            <input
              type="number"
              id="size"
              name="size"
              value={newUnitData.size}
              onChange={handleNewUnitChange}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="bed">Bedrooms:</label>
            <input
              type="number"
              id="bed"
              name="bed"
              value={newUnitData.bed}
              onChange={handleNewUnitChange}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="bath">Bathrooms:</label>
            <input
              type="number"
              id="bath"
              name="bath"
              value={newUnitData.bath}
              onChange={handleNewUnitChange}
            />
          </div>
          <div className="form-wrapper">
            <label htmlFor="rent">Monthly Rent ($):</label>
            <input
              type="text"
              id="rent"
              name="rent"
              value={newUnitData.rent}
              onChange={handleNewUnitChange}
            />
          </div>
          <div className="form-wrapper">
            <label>
              Available:
              <select
                name="is_available"
                value={newUnitData.is_available}
                onChange={handleNewUnitChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>
          <button type="submit" className="ldash-button">
            Create Unit
          </button>
        </form>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <Table
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
      />
    </>
  );
}
