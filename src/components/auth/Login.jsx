import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Footer from "../Footer";
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
          console.log(response?.data);
          const user = response?.data.user;
          const jwtToken = response?.data.jwt;
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("id", user.id);
          localStorage.setItem("username", user.username);
          localStorage.setItem("role", user.authorities[0].authority);
          localStorage.setItem("name", user.first_name + " " + user.last_name);

          return user;
        })
        .then(async function (user) {
          const jwtToken = localStorage.getItem("token");
          // console.log("User: ", user.id);
          // console.log(jwtToken);

          const response = await axios.get(
            `http://localhost:8080/tenant/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
              withCredentials: "include",
            }
          );

          if (response.data) {
            const role = response.data.authorities[0].authority;

            if (role === "LANDLORD") {
              navigate("/admin");
              window.location.reload();
            } else if (role === "TENANT") {
              navigate("/tenant");
              window.location.reload();
            } else {
              navigate("/auth/login");
            }
          }
        });
    } catch (err) {
      console.log("Login Error: ", err);
      setErrMsg("Login Error");
    }
  };

  return (
    <>
      <div className="login-background">
        <section className="login-section">
          <form onSubmit={handleSubmit(onSubmit)} className="login-wrapper">
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
                required
                type="password"
                {...register("pw", {
                  required: "Required",
                })}
              />
            </label>
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
          {errMsg && <div className="error">{errMsg}</div>}
          {/* <div className="login-div">
          <div>New Here?</div>
          <div>
            <Link className="login-a" to="/auth/signup">
              SIGN UP
            </Link>
          </div>
        </div> */}
        </section>
      </div>
      <Footer />
    </>
  );
}
