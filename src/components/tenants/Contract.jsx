import "../../styles/tenants/Contract.css";

export default function Contract({
  contract_id,
  tenant_Id,
  unit,
  monthly_rent,
  lease_starting_date,
  lease_ending_on,
}) {
  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp);
    return date.toLocaleDateString();
  };

  return (
    <section className="contract-wrapper">
      <h3>Contract Information</h3>
      <div className="contract-info-wrapper">
        <div className="contract-child-1">
          <p>Contract ID: {contract_id}</p>
          <p>Tenant ID: {tenant_Id}</p>
          <p>Unit: #{unit}</p>
        </div>
        <div className="contract-child-2">
          <p>Monthly Rent: ${monthly_rent}.00</p>
          <p>Lease Start Date: {formatDate(lease_starting_date)}</p>
          <p>
            Lease End Date:{" "}
            {lease_ending_on ? formatDate(lease_ending_on) : "N/A"}
          </p>
        </div>
      </div>
    </section>
  );
}
