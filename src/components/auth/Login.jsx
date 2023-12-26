import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../styles/LoginSignup.css";

export default function Login() {
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    try {
      // axios.post(/* HTTP REQUEST */, {
      //   email: email,
      //   password: pw
      // })
      console.log("Login Click Successful");
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
