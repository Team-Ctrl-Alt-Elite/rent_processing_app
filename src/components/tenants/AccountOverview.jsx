// import React from "react";
// // import { tenant } from "../../dummyData";
//
// export default function AccountOverview({ tenant }) {
//   // console.log(tenant);
//   return (
//     <section>
//       <h3>Account Information</h3>
//       <p>
//         Tenant Name: {tenant.first_name} {tenant.last_name}
//       </p>
//       <p>Username: {tenant.username}</p>
//       <p>
//         Phone Number: {tenant.phone_number.substring(0, 3)}-
//         {tenant.phone_number.substring(3, 6)}-{tenant.phone_number.substring(6)}
//       </p>
//     </section>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AccountOverview() {
  const [tenant, setTenant] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
   const id = localStorage.getItem("id");
   const jwtToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        // Make an initial API request to get tenant data
        const response = await axios.get(
                    `http://localhost:8080/tenant/${id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${jwtToken}`,
                      },
                      withCredentials: "include",
                    }
                  );
            setTenant(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchTenantData();
  }, []);

  return (
    <section>
      <h3>Account Information</h3>
      {/* Display tenant information */}
      {tenant ? (
        <>
          <p>
            Tenant Name: {tenant.first_name} {tenant.last_name}
          </p>
          <p>
          Username: {tenant.username}
          </p>
          <p>
          Phone Number: {tenant.phone_number.substring(0, 3)}-
          {tenant.phone_number.substring(3, 6)}-{tenant.phone_number.substring(6)}
          </p>
          {/* Other tenant information */}
        </>
      ) : (
        <p>Loading tenant data...</p>
      )}
    </section>
  );
}