// import React from "react";
//
// export default function Contract({ contract, contractInfo, landlord }) {
//   // console.log(contract);
//   // console.log(contractInfo);
//   console.log(landlord);
//   return (
//     <section>
//       <h3>Contract Information</h3>
//       <p>
//         Building Address: {contractInfo.street}, {contractInfo.city}{" "}
//         {contractInfo.state}, {contractInfo.zip}
//       </p>
//       <p>Unit: {contract.unit_id}</p>
//       <p>Tenant Monthly Rent: ${contract.monthly_rent}.00</p>
//       <p>Move-In Date: {contract.lease_starting_from}</p>
//       <p>
//         Move-Out Date:{" "}
//         {contract.lease_ending_on ? contract.lease_ending_on : "N/A"}
//       </p>
//       <p>
//         Landlord Name: {landlord[0].first_name} {landlord[0].last_name}
//       </p>
//       <p>
//         Landlord Contact Information: {landlord[0].phone_number.substring(0, 3)}
//         -{landlord[0].phone_number.substring(3, 6)}-
//         {landlord[0].phone_number.substring(6)}
//       </p>
//     </section>
//   );
// }
         import React, { useState, useEffect } from "react";
         import axios from "axios";

         export default function Contract({ contract }) {
           const [contractList, setContractList] = useState([]);
           const id = localStorage.getItem("id");
           const jwtToken = localStorage.getItem("token");

           useEffect(() => {
             const fetchContractInfo = async () => {
               try {
                 // Fetch contract info based on tenant ID or any relevant identifier
                 const contractResponse = await axios.get(
                   `http://localhost:8080/tenant/tenantContracts/${id}`,
                   {
                     headers: {
                       Authorization: `Bearer ${jwtToken}`,
                     },
                     withCredentials: "include",
                   }
                 );
                 setContractList(contractResponse.data);
               } catch (error) {
                 console.error("Error fetching contract information:", error);
               }
             };
             fetchContractInfo();
           }, [id, jwtToken]);

            const formatDate = (unixTimestamp) => {
                const date = new Date(unixTimestamp);
                return date.toLocaleDateString(); // Adjust date format as needed
              };// Make sure to include dependencies if needed
           return (
             <section>
               <h3>Contract Information</h3>
               {/* Display tenant information */}
               {contractList.length > 0 ? (
                 contractList.map((contractInfo) => (
                   <div key={contractInfo.contract_id}>
                     <p>Contract ID: {contractInfo.contract_id}</p>
                     <p>Unit: {contractInfo.unit}</p>
                     <p>Monthly Rent: ${contractInfo.monthly_rent}</p>
                     <p>Lease Start Date: {formatDate(contractInfo.lease_starting_date)}</p>
                                <p>Lease End Date: {contractInfo.lease_ending_on ? formatDate(contractInfo.lease_ending_on) : "N/A"}</p>
                     <p>Tenant ID: {contractInfo.tenant_Id}</p>
                     <p>
                       Tenant Name: {contractInfo.Tenant_first_name}{" "}
                       {contractInfo.Tenant_last_name}
                     </p>
                     <p>
                       Phone Number:{" "}
                       {`${contractInfo.Tenant_phonenumber.substring(0, 3)}-
                       ${contractInfo.Tenant_phonenumber.substring(3, 6)}-
                       ${contractInfo.Tenant_phonenumber.substring(6)}`}
                     </p>
                     {/* Other contract information */}
                   </div>
                 ))
               ) : (
                 <p>No contract information available</p>
               )}
             </section>
           );
         }

