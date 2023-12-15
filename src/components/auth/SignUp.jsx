import { useState } from "react";
import { Link } from "react-router-dom";

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
        <button>Signup</button>
      </form>

      <div>
        <div>Already A Member?</div>
        <div>
          <Link to="/auth/login">LOGIN</Link>
        </div>
      </div>
    </section>
  );
}
