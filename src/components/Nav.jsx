import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../styles/Nav.css";

export default function Nav() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

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
          <Link to="/">
            <h1>TenantTracker</h1>
          </Link>
        </div>
      </div>
      <div className="nav-right">
        {token ? (
          <div className="nav-link-wrapper">
            <button onClick={handleLogout} className="nav-links">
              Logout
            </button>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
        ) : (
          <div className="nav-link-wrapper">
            <button
              onClick={() => {
                navigate("/auth/login");
                window.location.reload();
              }}
              className="nav-links"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
