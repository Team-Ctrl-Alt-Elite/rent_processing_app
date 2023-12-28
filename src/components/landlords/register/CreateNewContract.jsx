import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const landlordId = localStorage.getItem("id");
  const newUser = JSON.parse(localStorage.getItem("New User"));

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

  const onSubmit = async (values) => {
    const { unitId, rent, leaseStart, leaseEnd } = values;

    try {
      const response = await axios.post(
        "http://localhost:8080/contract/add",
        {
          unit_id: unitId,
          monthly_rent: rent,
          tenant_id: newUser.id,
          landlord_id: landlordId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      console.log("New User: ", response?.data);
      if (response.data) {
        navigate("/admin");
      }
    } catch (err) {
      console.log("CreateNewUser Error: ", err);
      setErrMsg("Error Creating New Tenant");
    }
  };

  return (
    <section>
      <div>
        <div>Available Units:</div>
        {units.map((unit) => (
          <div key={unit.id}>
            {unit.is_available === true && <div>{unit.id}</div>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
        <label htmlFor="tenantFirstName">
          <span>Tenant First Name: {newUser?.first_name}</span>
        </label>
        <label htmlFor="tenantLastName">
          <span>Tenant Last Name: {newUser?.last_name}</span>
        </label>
        <label htmlFor="unitId">
          <span>Unit: </span>
          <input
            type="text"
            {...register("unitId", {
              required: "Required",
            })}
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
        {/* <label htmlFor="leaseStart">
          <span>Lease Start Date: </span>
          <input
            type="text"
            {...register("leaseStart", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="leaseEnd">
          <span>Lease End Date: </span>
          <input
            type="text"
            {...register("leaseEnd", {
              required: "Required",
            })}
          />
        </label> */}
        <button type="submit">Next</button>
      </form>
      {errMsg && <div>{errMsg}</div>}
    </section>
  );
}
