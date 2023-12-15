import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          required
          type="password"
          name="password"
          onChange={(e) => setPw(e.target.value)}
        />
        {errMsg && { errMessage: errMsg }}
        <button>Login</button>
      </form>

      <div>
        <div>New Here?</div>
        <div>
          <Link to="/auth/signup">SIGN UP</Link>
        </div>
      </div>
    </section>
  );
}
