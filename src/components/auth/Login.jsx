import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/LoginSignup.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
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
    }
  };
      
  return (
    <>      
      <header>
        <h1>TenantTracker</h1>
      </header>
    <section className="login-section">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="email">Email: </label>
        <input 
          required
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login-label" htmlFor="password">Password: </label>
        <input 
          required
          type="password"
          name="password"
          onChange={(e) => setPw(e.target.value)}
        />
        {errMsg && { errMessage: errMsg }}
        <button>Login</button>
      </form>

      <div className="login-div">
        <div>New Here?</div>
        <div>
          <Link className="login-a" to="/auth/signup">SIGN UP</Link>
        </div>
      </div>
    </section>
    </>
  );
}
