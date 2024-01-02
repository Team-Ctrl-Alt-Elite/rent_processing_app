import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/landlord/register/Create.css";

/*
private int unit_id;
private int monthly_rent;
private Date lease_starting_from;
private Date lease_ending_on;
private int tenant_id;
private int landlord_id;
*/

export default function CreateNewContract() {
  const [units, setUnits] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [newUser, setNewUser] = useState();
  // const [selectedFilter, setSelectedFilter] = useState("");
  const { register, handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const landlordId = localStorage.getItem("id");

  useEffect(() => {
    setNewUser(JSON.parse(localStorage.getItem("New User")));
  }, []);

  useEffect(() => {
    const getAllUnits = async () => {
      try {
        const response = await axios.get("http://localhost:8080/unit/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: "include",
        });

        setUnits(response?.data);
      } catch (err) {
        console.log("CreateNewContract Units Error: ", err);
      }
    };

    getAllUnits();
  }, [token]);

  console.log("Units: ", units);
  console.log(newUser);

  const convertDateToUnix = (inputDate) => {
    const date = new Date(inputDate);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
  };

  const onSubmit = async (values) => {
    const { unitId, rent, leaseStart, leaseEnd } = values;
    // console.log(unitId);

    const unixLeaseStart = convertDateToUnix(leaseStart);
    const unixLeaseEnd = convertDateToUnix(leaseEnd);

    // console.log(leaseStart);
    // console.log(leaseEnd);
    // console.log(unixLeaseStart);
    // console.log(unixLeaseEnd);

    try {
      if (newUser) {
        await axios
          .post(
            "http://localhost:8080/contract/add",
            {
              unit_id: unitId,
              monthly_rent: rent,
              tenant_id: newUser.id,
              landlord_id: landlordId,
              lease_starting_from: unixLeaseStart,
              lease_ending_on: unixLeaseEnd,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: "include",
            }
          )
          .then(async function (response) {
            console.log("New Contract: ", response?.data);

            if (response.data) {
              const getSelectedUnit = units.find(
                (u) => u.id === response.data.unit_id
              );

              console.log("getSelectedUnit: ", getSelectedUnit);
              if (getSelectedUnit !== null && getSelectedUnit !== undefined) {
                await axios.put(
                  `http://localhost:8080/unit/${getSelectedUnit.id}`,
                  {
                    bed: getSelectedUnit.bed,
                    bath: getSelectedUnit.bath,
                    size: getSelectedUnit.size,
                    rent: response.data.monthly_rent,
                    is_available: getSelectedUnit.is_available,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    withCredentials: "include",
                  }
                );
                navigate("/admin");
              }
            }
          });
      }
    } catch (err) {
      // if (err.response.status === 401) {
      //   navigate("/auth/login");
      // }
      console.log("CreateNewContract Error: ", err);
      setErrMsg("Error Creating New Contract");
    }
  };

  return (
    <section>
      <Link to="/admin" className="return-link">
        <FontAwesomeIcon icon={faChevronLeft} className="return-icon" />
        <span>Return</span>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
        <h2>Register New Contract:</h2>
        <div className="register-contract-tenant-names">
          <span>Tenant First Name: {newUser?.first_name}</span>
          <span>Tenant Last Name: {newUser?.last_name}</span>
        </div>
        <label htmlFor="unitId">
          <span>Unit: </span>
          <Controller
            name="unitId"
            control={control}
            render={({ field }) => (
              <select {...field} className="register-contract-unit">
                <option value="">-- Available Units --</option>
                {units.map((unit, i) => (
                  <option key={i} value={unit.id}>
                    {unit.id}
                  </option>
                ))}
              </select>
            )}
          />
        </label>
        <label htmlFor="rent">
          <span>Monthly Rent: </span>
          <input
            type="text"
            {...register("rent", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="leaseStart">
          <span>Lease Start Date: </span>
          <Controller
            name="leaseStart"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                placeholderText="Select Lease Start Date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="MM/dd/yyyy"
              />
            )}
          />
        </label>
        <label htmlFor="leaseEnd">
          <span>Lease End Date: </span>
          <Controller
            name="leaseEnd"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                placeholderText="Select Lease End Date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="MM/dd/yyyy"
              />
            )}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {errMsg && <div>{errMsg}</div>}
    </section>
  );
}
