import { useState, useEffect } from "react";
import axios from "axios";
import AccountEdit from "./AccountEdit";
import "../../styles/tenants/AccountOverview.css";

export default function AccountOverview() {
  const [tenant, setTenant] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTenantData();
  }, [id, token]);

  const handleEdit = () => {
    console.log("handleEdit Clicked");
    setIsEdit(true);
  };

  return (
    <section className="ao-wrapper">
      <h3>Account Overview</h3>
      {!isEdit ? (
        <div>
          <button onClick={handleEdit}>Edit</button>
          {tenant ? (
            <div>
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
          ) : (
            <p>Loading Account Information...</p>
          )}
        </div>
      ) : (
        <AccountEdit setIsEdit={setIsEdit} tenant={tenant} />
      )}
    </section>
  );
}
