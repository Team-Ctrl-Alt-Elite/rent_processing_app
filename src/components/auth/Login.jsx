import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../styles/LoginSignup.css";

export default function Login() {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, pw } = values;
    try {
      await axios
        .post(
          "http://localhost:8080/auth/login",
          {
            username,
            password: pw,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: "include",
          }
        )
        .then((response) => {
          const user = response?.data.user;
          const jwtToken = response?.data.jwt;
          localStorage.setItem("token", jwtToken);

          return user;
        })
        .then(async function (user) {
          const jwtToken = localStorage.getItem("token");
          // console.log("User: ", user.id);
          // console.log(jwtToken);

          const response = await axios.get(
            `http://localhost:8080/landlord/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              withCredentials: "include",
            }
          );

          console.log(response.data);
          if (response.data) {
            response.data.authorities.length > 1
              ? navigate("/admin")
              : navigate("/tenant");
          }
        });
    } catch (err) {
      console.log("Login Error: ", err);
      setErrMsg("Login Error");
    }
  };

  return (
    <>
      <header>
        <h1>TenantTracker</h1>
      </header>
      <section className="login-section">
        <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
          <label>
            <span>Username: </span>
            <input
              type="text"
              {...register("username", {
                required: "Required",
              })}
            />
          </label>
          <label>
            <span>Password: </span>
            <input
              type="text"
              {...register("pw", {
                required: "Required",
              })}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {errMsg && <div>{errMsg}</div>}
        {/* <div className="login-div">
          <div>New Here?</div>
          <div>
            <Link className="login-a" to="/auth/signup">
              SIGN UP
            </Link>
          </div>
        </div> */}
      </section>
    </>
  );
}
