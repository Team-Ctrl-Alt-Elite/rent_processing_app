import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/LoginSignup.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    try {
      console.log("Signup Click Successful");
    } catch (err) {
      console.log("Signup Error: ", err);
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
        <button>Sign up</button>
      </form>

      <div className="login-div">
        <div>Already A Member?</div>
        <div>
          <Link className="login-a" to="/auth/login">LOGIN</Link>
        </div>
      </div>
    </section>
    </>
  );
}
