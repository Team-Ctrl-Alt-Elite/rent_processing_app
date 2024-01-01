import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/tenants/Contract.css";

export default function Contract({ contract }) {
  const [contractList, setContractList] = useState([]);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchContractInfo = async () => {
      try {
        const contractResponse = await axios.get(
          `http://localhost:8080/tenant/tenantContracts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [id, token]);

  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp);
    return date.toLocaleDateString();
  };

  return (
    <section className="contract-wrapper">
      <h3>Contract Information</h3>
      {contractList.length > 0 ? (
        contractList.map((contractInfo) => (
          <div key={contractInfo.contract_id}>
            <p>Contract ID: {contractInfo.contract_id}</p>
            <p>Tenant ID: {contractInfo.tenant_Id}</p>
            <p>Unit: {contractInfo.unit}</p>
            <p>Monthly Rent: ${contractInfo.monthly_rent}.00</p>
            <p>
              Lease Start Date: {formatDate(contractInfo.lease_starting_date)}
            </p>
            <p>
              Lease End Date:{" "}
              {contractInfo.lease_ending_on
                ? formatDate(contractInfo.lease_ending_on)
                : "N/A"}
            </p>
            {/* <p>
                       Tenant Name: {contractInfo.Tenant_first_name}{" "}
                       {contractInfo.Tenant_last_name}
                     </p> */}
            {/* <p>
              Phone Number:{" "}
              {`${contractInfo.Tenant_phonenumber.substring(
                0,
                3
              )}-${contractInfo.Tenant_phonenumber.substring(
                3,
                6
              )}-${contractInfo.Tenant_phonenumber.substring(6)}`}
            </p> */}
          </div>
        ))
      ) : (
        <p>No Contract Details To Display...</p>
      )}
    </section>
  );
}
