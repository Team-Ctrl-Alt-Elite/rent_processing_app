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
          console.log(response?.data);
          const user = response?.data.user;
          const jwtToken = response?.data.jwt;
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("id", user.id);
          localStorage.setItem("username", user.username);
          localStorage.setItem("role", user.authorities[0].authority);
<<<<<<< Updated upstream
          localStorage.setItem("name", user.first_name + " " + user.last_name);
=======
>>>>>>> Stashed changes

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

          console.log(response.data);
          //           if (response.data) {
          //             response.data.authorities.length > 1
          //               ? navigate("/admin")
          //               : navigate("/tenant");
          //           }
          if (response.data) {
            const role = response.data.authorities[0].authority;

            if (role === "LANDLORD") {
              navigate("/admin");
<<<<<<< Updated upstream
              window.location.reload();
            } else if (role === "TENANT") {
              navigate("/tenant");
              window.location.reload();
=======
            } else if (role === "TENANT") {
              navigate("/tenant");
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      <div className="login-background">
=======
      <nav>
        <Link to="/" className="home-link">
          <h1>TenantTracker</h1>
        </Link>
        <div className="nav-links">
          <Link to="/auth/login">Login</Link>
        </div>
      </nav>
      <body className="login-background">
>>>>>>> Stashed changes
        <section className="login-section">
          <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
            <label htmlFor="email">
              <span>Username: </span>
              <input
                type="text"
                {...register("username", {
                  required: "Required",
                })}
              />
            </label>
            <label htmlFor="password">
              <span> Password: </span>
              <input
<<<<<<< Updated upstream
                type="password"
=======
                type="text"
>>>>>>> Stashed changes
                {...register("pw", {
                  required: "Required",
                })}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
<<<<<<< Updated upstream
          {errMsg && <div className="error">{errMsg}</div>}
=======
          {errMsg && <div>{errMsg}</div>}
>>>>>>> Stashed changes
          {/* <div className="login-div">
          <div>New Here?</div>
          <div>
            <Link className="login-a" to="/auth/signup">
              SIGN UP
            </Link>
          </div>
        </div> */}
        </section>
<<<<<<< Updated upstream
      </div>
=======
      </body>
>>>>>>> Stashed changes
    </>
  );
}
