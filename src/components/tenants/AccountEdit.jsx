import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import "../../styles/tenants/AccountEdit.css";

export default function AccountEdit({ setIsEdit, tenant, type, color }) {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setIsLoading(true);
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
        setIsLoading(false);
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
      <form onSubmit={handleSubmit(onSubmit)} className="ae-wrapper">
        <div className="ae-full-name">
          <label htmlFor="firstName">
            <span>First Name: </span>
            <input
              type="text"
              placeholder="ex: John"
              className="ae-input"
              {...register("firstName")}
            />
          </label>
          <label htmlFor="lastName">
            <span>Last Name: </span>
            <input
              type="text"
              placeholder="ex: Doe"
              className="ae-input"
              {...register("lastName")}
            />
          </label>
        </div>
        <div className="ae-email-phone">
          <label htmlFor="username">
            <span>Username/Email: </span>
            <input
              type="text"
              placeholder="ex: johndoe@email.com"
              className="ae-input"
              {...register("username")}
            />
          </label>
          <label htmlFor="phone">
            <span>Phone Number: </span>
            <input
              type="text"
              placeholder="ex: 0120120123"
              className="ae-input"
              {...register("phone")}
            />
          </label>
        </div>
        {!isLoading ? (
          <div className="ae-buttons">
            <button onClick={handleCancelEdit} className="ae-button">
              Cancel
            </button>
            <button type="submit" className="ae-button">
              Submit
            </button>
          </div>
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
      {errMsg && <div>{errMsg}</div>}
    </section>
  );
}
