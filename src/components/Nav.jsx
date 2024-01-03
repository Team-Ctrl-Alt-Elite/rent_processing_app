import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/Nav.css";

export default function Nav() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    setToken(null);
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-left">
        <div className="nav-link-wrapper">
          {role === "LANDLORD" ? (
            <Link to="/admin">
              <img
                src="/img/logo.png"
                style={{
                  height: "100px",
                  transform: "translate(-50px, 5px)",
                }}
              />
            </Link>
          ) : role === "TENANT" ? (
            <Link to="/tenant">
              <img
                src="/img/logo.png"
                style={{
                  height: "100px",
                  transform: "translate(-50px, 5px)",
                }}
              />
            </Link>
          ) : (
            <Link to="/">
              <img
                src="/img/logo.png"
                style={{
                  height: "100px",
                  transform: "translate(-50px, 5px)",
                }}
              />
            </Link>
          )}
        </div>
      </div>
      <div className="nav-right">
        {token ? (
          <div className="nav-link-wrapper">
            <button
              onClick={() => {
                navigate("/about");
                window.location.reload();
              }}
              className="nav-links">
              About
            </button>
            <button onClick={handleLogout} className="nav-links">
              Logout
            </button>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
        ) : (
          <div className="nav-link-wrapper">
            <button
              onClick={() => {
                navigate("/about");
                window.location.reload();
              }}
              className="nav-links">
              About
            </button>
            <button
              onClick={() => {
                navigate("/auth/login");
                window.location.reload();
              }}
              className="nav-link-login">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
