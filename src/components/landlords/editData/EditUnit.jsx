import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../../styles/LDashboard.css";
import "../../../styles/forms.css";
import axios from "axios";

export default function EditUnit({ unitID, isActiveUnit }) {
  const token = localStorage.getItem("token");
  const { register, handleSubmit, control } = useForm({
    defaultValues: { available: isActiveUnit },
  });

  const onSubmit = async (values) => {
    const { bed, bath, size, rent, available } = values;
    try {
      const response = await axios.put(
        `http://localhost:8080/unit/${unitID}`,
        {
          bed,
          bath,
          size,
          rent,
          is_available: available,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: "include",
        }
      );
      console.log(response?.data);
    } catch (error) {
      console.log("Edit unit error", error);
    }
  };

  return (
    <section>
      Edit Unit
      <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
        <label htmlFor="bed">
          <span>Bed: </span>
          <input
            type="text"
            {...register("bed", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="bath">
          <span>Bath: </span>
          <input
            type="text"
            {...register("bath", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="size">
          <span>Size: </span>
          <input
            type="text"
            {...register("size", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="rent">
          <span>Rent: </span>
          <input
            type="text"
            {...register("rent", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="available">
          <span>Available: </span>
          <Controller
            control={control}
            name="available"
            render={({ field }) => <input type="checkbox" {...field} />}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
