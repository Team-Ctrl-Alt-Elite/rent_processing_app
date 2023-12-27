import { useState } from "react";
import Contracts from "./Contracts";
import RentLogs from "./RentLogs";
import Units from "./Units";
import "../../styles/LDashboard.css";
import { Link } from "react-router-dom";

export default function LDashboard() {
  const [activeTab, setActiveTab] = useState("units");
  const [childProps, setChildProps] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setChildProps(null);
  };

  const getChildProps = (props) => {
    console.log("Props :", props);
    setChildProps(props);
  };

  console.log("Child Props: ", childProps);

  return (
    <>
      <nav>
              <Link to="/" className="home-link">
                <h1>TenantTracker</h1>
              </Link>
              <div className="nav-links">
                <Link to="/auth/login">Login</Link>
              </div>
            </nav>
            <body className="ldash-background">
      <section className="ldash-section">
        <h2>Landlord Dashboard</h2>
        <button onClick={() => handleTabClick("units")} className="ldash-button">Units</button>
        <button onClick={() => handleTabClick("contracts")} className="ldash-button">Contracts</button>
        <button onClick={() => handleTabClick("rentLogs")} className="ldash-button">Rent Logs</button>

        <div className="ldash-modal">
          <div className="ldash-left">
            {activeTab === "units" && <Units getChildProps={getChildProps} />}
            {activeTab === "contracts" && (
              <Contracts getChildProps={getChildProps} />
            )}
            {activeTab === "rentLogs" && (
              <RentLogs getChildProps={getChildProps} />
            )}
          </div>
          <div className="ldash-right">
            <div className="ldash-div > div">
              {childProps && activeTab === "units" && (
                <div>
                  <h2>Unit Details</h2>
                  <p>Unit: {childProps.id}</p>
                  <p>Bed: {childProps.bed}</p>
                  <p>Bath: {childProps.bath}</p>
                  <p>Size: {childProps.size} sq. ft.</p>
                  <p>Monthly Rent: ${childProps.rent}.00</p>
                </div>
              )}
              {childProps && activeTab === "contracts" && (
                <div>
                  <h2>Contract Details</h2>
                  <p>Contract ID: {childProps.contract_id}</p>
                  <p>Unit: {childProps.unit}</p>
                  <p>Tenant ID: {childProps.tenant_id}</p>
                  <p>Tenant First Name: {childProps.Tenant_first_name}</p>
                  <p>Tenant Last Name: {childProps.Tenant_last_name}</p>
                  <p>Lease Start Date: {childProps.lease_starting_date}</p>
                  <p>Lease End Date: {childProps.lease_ending_on}</p>
                  <p>Monthly Rent: {childProps.monthly_rent}</p>
                  <p>Tenant Email: {childProps.Tenant_username}</p>
                  <p>Tenant Phone Number: {childProps.phonenumber}</p>
                </div>
              )}
              {childProps && activeTab === "rentLogs" && (
                <div>
                  <h2>Rent Payment Log</h2>
                  <p>Payment ID: {childProps.id}</p>
                  <p>Contract ID: {childProps.contract_id}</p>
                  <p>Amount Paid: {childProps.amount_paid}</p>
                  <p>Payment Date: {childProps.payment_date}</p>
                  <p>Payment Medium: {childProps.payment_medium}</p>
                  <p>
                    {childProps.check_number
                      ? `Check Number: ${childProps.check_number}`
                      : "Check Number: N/A"}
                  </p>
                  <p>
                    {childProps.online_transaction_number
                      ? `Online Transaction Number: ${childProps.online_transaction_number}`
                      : "Online Transaction Number: N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </body>
    </>
  );
}
