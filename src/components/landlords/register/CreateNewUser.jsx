import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function CreateNewUser() {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const { username, pw, firstName, lastName } = values;

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        {
          username,
          password: pw,
          first_name: firstName,
          last_name: lastName,
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
        localStorage.setItem("New User", JSON.stringify(response.data));
        navigate("/register/new-contract");
      }
    } catch (err) {
      console.log("CreateNewUser Error: ", err);
      setErrMsg("Error Creating New Tenant");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
        <label htmlFor="email">
          <span>Username: </span>
          <input
            type="text"
            required
            {...register("username", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="password">
          <span> Password: </span>
          <input
            type="text"
            required
            {...register("pw", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="firstName">
          <span>First Name: </span>
          <input
            type="text"
            required
            {...register("firstName", {
              required: "Required",
            })}
          />
        </label>
        <label htmlFor="lastName">
          <span>Last Name: </span>
          <input
            required
            type="text"
            {...register("lastName", {
              required: "Required",
            })}
          />
        </label>
        <button type="submit">Next</button>
      </form>
      {errMsg && <div>{errMsg}</div>}
    </section>
  );
}
