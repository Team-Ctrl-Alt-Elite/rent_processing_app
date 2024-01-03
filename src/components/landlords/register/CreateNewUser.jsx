import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/landlord/register/Create.css";

export default function CreateNewUser() {
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get("http://localhost:8080/tenant/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: "include",
      });
      console.log("Users: ", response?.data);
      setUsers(response?.data);
    };

    getAllUsers();
  }, [token]);

  const onSubmit = async (values) => {
    const { username, pw, firstName, lastName } = values;

    try {
      // if (users && users.length > 0) {
      //   const findUser = users.find((user) => user.username === username);

      //   if (findUser === null || findUser === undefined) {
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
      //} else {
      //  setErrMsg("User Already Exists");
      // }
      //}
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
      <div className="create-background">
        <Link to="/admin" className="return-link">
          <span className="return-content">
            <FontAwesomeIcon icon={faChevronLeft} className="return-icon" />
            <span>Return</span>
          </span>
        </Link>
        <div className="register-user">
          <form onSubmit={handleSubmit(onSubmit)} className="create-form">
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
      </div>
    </section>
  );
}
