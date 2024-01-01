import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tenants/AccountOverview.css";

export default function AccountEdit({ setIsEdit, tenant }) {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const { username, firstName, lastName, phone } = values;

    try {
      const response = await axios.put(
        `http://localhost:8080/tenant/${tenant.id}`,
        {
          username: username || tenant.username,
          first_name: firstName || tenant.first_name,
          last_name: lastName || tenant.last_name,
          phone_number: phone || tenant.phone_number,
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
        console.log("Updated User: ", response.data);
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/auth/login");
      }
      console.log("AccountEdit Error: ", err);
      setErrMsg("Error Updating Account Information");
    }
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <section>
      <div className="register-user">
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
          <label htmlFor="username">
            <span>Username: </span>
            <input type="text" {...register("username")} />
          </label>
          <div className="tedit-full-name">
            <label htmlFor="firstName">
              <span>First Name: </span>
              <input type="text" {...register("firstName")} />
            </label>
            <label htmlFor="lastName">
              <span>Last Name: </span>
              <input type="text" {...register("lastName")} />
            </label>
          </div>
          <label htmlFor="phone">
            <span>Phone Number: </span>
            <input
              type="text"
              placeholder="ex: 0120120123"
              {...register("phone")}
            />
          </label>
          <button onClick={handleCancelEdit}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
        {errMsg && <div>{errMsg}</div>}
      </div>
    </section>
  );
}
