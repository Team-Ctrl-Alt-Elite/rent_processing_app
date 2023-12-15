import React from "react";

export default function Contract({ contract, propertyInfo, landlord }) {
  // console.log(contract);
  // console.log(propertyInfo);
  // console.log(landlord);
  return (
    <section>
      <h3>Contract Information</h3>
      <p>
        Building Address: {propertyInfo.street}, {propertyInfo.city}{" "}
        {propertyInfo.state}, {propertyInfo.zip}
      </p>
      <p>Unit: {contract.unit_id}</p>
      <p>Tenant Monthly Rent: ${contract.monthly_rent}.00</p>
      <p>Move-In Date: {contract.lease_starting_from}</p>
      <p>
        Move-Out Date:{" "}
        {contract.lease_ending_on ? contract.lease_ending_on : "N/A"}
      </p>
      <p>
        Landlord Name: {landlord.first_name} {landlord.last_name}
      </p>
      <p>
        Landlord Contact Information: {landlord.phone_number.substring(0, 3)}-
        {landlord.phone_number.substring(3, 6)}-
        {landlord.phone_number.substring(6)}
      </p>
    </section>
  );
}
