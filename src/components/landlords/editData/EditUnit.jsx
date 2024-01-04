import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../../styles/LDashboard.css";
import "../../../styles/EditUnit.css";
import axios from "axios";
import ReactLoading from "react-loading";

export default function EditUnit({ unit, isActiveUnit, type, color }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(unit.is_available);
  const token = localStorage.getItem("token");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { bed, bath, size, rent, available } = values;

    console.log(available);
    try {
      const response = await axios.put(
        `http://localhost:8080/unit/${unit.id}`,
        {
          bed: bed || unit.bed,
          bath: bath || unit.bath,
          size: size || unit.size,
          rent: rent || unit.rent,
          is_available: isChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      console.log(response?.data);
      if (response.status === 200) {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/auth/login");
      }
      console.log("Edit unit error", err);
    }
  };

  return (
    <section className="eu-wrapper">
      <h3>Edit Unit #{unit.id}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="eu-form-wrapper">
        <label htmlFor="bed">
          <span>Bed: </span>
          <input type="text" {...register("bed")} />
        </label>
        <label htmlFor="bath">
          <span>Bath: </span>
          <input type="text" {...register("bath")} />
        </label>
        <label htmlFor="size">
          <span>Size: </span>
          <input type="text" {...register("size")} />
        </label>
        <label htmlFor="rent">
          <span>Monthly Rent: </span>
          <input type="text" {...register("rent")} />
        </label>
        <label htmlFor="available">
          <span>Available: </span>
          <span className="eu-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            />
          </span>
        </label>
        {!isLoading ? (
          <button type="submit">Submit</button>
        ) : (
          <ReactLoading
            type={"bars"}
            color={"gray"}
            height={55}
            width={55}
            className="bill-loading-icon"
          />
        )}
      </form>
    </section>
  );
}
