import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountEdit from "./AccountEdit";
import Footer from "../Footer";
import "../../styles/tenants/AccountOverview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function AccountOverview() {
  const [tenant, setTenant] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tenant/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: "include",
        });
        console.log(response?.data);
        setTenant(response?.data);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        }
        console.error("Error fetching data:", err);
      }
    };

    fetchTenantData();
  }, [id, token, navigate]);

  const handleEdit = () => {
    console.log("handleEdit Clicked");
    setIsEdit(true);
  };

  return (
    <>
      <section className="ao-wrapper">
        <div className="ao-header">
          <h3>Account Overview</h3>
          <button onClick={handleEdit} className="ao-button">
            <FontAwesomeIcon icon={faPenToSquare} className="ao-icon" />
          </button>
        </div>
        {!isEdit ? (
          <div>
            {tenant ? (
              <div className="ao-container">
                <div className="ao-left">
                  <p>
                    Name: {tenant.first_name} {tenant.last_name}
                  </p>
                  <p>Username: {tenant.username}</p>
                  <p>
                    Phone Number:{" "}
                    {tenant.phone_number
                      ? `${tenant.phone_number.substring(
                          0,
                          3
                        )}-${tenant.phone_number.substring(
                          3,
                          6
                        )}-${tenant.phone_number.substring(6)}`
                      : "Please Update Phone Number"}
                  </p>
                </div>
                <div className="ao-right">
                  <p>Landlord: Kavish Desai</p>
                  <p>Phone Number: 123-456-7894</p>
                </div>
              </div>
            ) : (
              <p>Loading Account Information...</p>
            )}
          </div>
        ) : (
          <AccountEdit setIsEdit={setIsEdit} tenant={tenant} />
        )}
      </section>
      <Footer />
    </>
  );
}
