import React from "react";
// import { tenant } from "../../dummyData";

export default function AccountOverview({ tenant }) {
  // console.log(tenant);
  return (
    <section>
      <h3>Account Information</h3>
      <p>
        Tenant Name: {tenant.first_name} {tenant.last_name}
      </p>
      <p>Username: {tenant.username}</p>
      <p>
        Phone Number: {tenant.phone_number.substring(0, 3)}-
        {tenant.phone_number.substring(3, 6)}-{tenant.phone_number.substring(6)}
      </p>
    </section>
  );
}
