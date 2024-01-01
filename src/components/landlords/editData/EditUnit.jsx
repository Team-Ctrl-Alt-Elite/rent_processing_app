import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../../styles/LDashboard.css";
import "../../../styles/EditUnit.css";
// import "../../../styles/forms.css";
import axios from "axios";

export default function EditUnit({ unitID, isActiveUnit }) {
  const token = localStorage.getItem("token");
  const { register, handleSubmit, control } = useForm({
    defaultValues: { available: isActiveUnit },
  });
  const navigate = useNavigate();

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
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      console.log(response?.data);
      if (response.status === 200) {
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
      <h3>Edit Unit #{unitID}</h3>
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
            <Controller
              control={control}
              name="available"
              render={({ field }) => <input type="checkbox" {...field} />}
            />
          </span>
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
