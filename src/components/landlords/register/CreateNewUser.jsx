import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/CreateUser.css";

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
      if (response.data) {
        console.log("Created User: ", response.data);
        localStorage.setItem("New User", JSON.stringify(response.data));
        navigate("/register/new-contract");
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/auth/login");
      }
      console.log("CreateNewUser Error: ", err);
      setErrMsg("Error Creating New Tenant");
    }
  };

  return (
    <section>
      <Link to="/admin" className="return-link">
        <FontAwesomeIcon icon={faChevronLeft} className="return-icon" />
        <span>Return</span>
      </Link>
      <div className="register-user">
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
          <h2>Register New User:</h2>
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
      </div>
    </section>
  );
}
