import { useState, useEffect } from "react";
import Contracts from "./Contracts";
import RentLogs from "./RentLogs";
import Units from "./Units";
import EditUnit from "./editData/EditUnit";
import User from "./User";
import "../../styles/LDashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function LDashboard() {
  const [units, setUnits] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("units");
  const [childProps, setChildProps] = useState(null);
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllUnits = async () => {
      try {
        const response = await axios.get("http://localhost:8080/unit/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: "include",
        });

        setUnits(response?.data);
      } catch (err) {
        if (err.response.status === 401) {
          navigate("/auth/login");
        }
        console.error("Units Component Error: ", err);
      }
    };

    getAllUnits();
  }, [navigate, token]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setChildProps(null);
  };

  const getChildProps = (props) => {
    // console.log("Props :", props);
    setChildProps(props);
  };

  return (
    <>
      <div className="ldash-background">
        <section className="ldash-section">
          <h2>Welcome Back, {userName}</h2>
          <button
            onClick={() => handleTabClick("units")}
            className="ldash-button">
            Units
          </button>
          <button
            onClick={() => handleTabClick("contracts")}
            className="ldash-button">
            Contracts
          </button>
          <button
            onClick={() => handleTabClick("rentLogs")}
            className="ldash-button">
            Rent Logs
          </button>
          <button onClick={() => handleTabClick("user")} className="ldash-button">
            User
          </button>
          <button
            onClick={() => navigate("/register/new-user")}
            className="ldash-button">
            Create Contract
          </button>

          <div className="ldash-modal">
            <div className="ldash-left">
              {activeTab === "units" && (
                <Units
                  getChildProps={getChildProps}
                  units={units}
                  setIsEditMode={setIsEditMode}
                />
              )}
              {activeTab === "contracts" && (
                <Contracts getChildProps={getChildProps} />
              )}
              {activeTab === "rentLogs" && (
                <RentLogs getChildProps={getChildProps} />
              )}
              {activeTab === "user" && (
                <User getChildProps={getChildProps} />
              )}
            </div>
            <div className="ldash-right">
              <div className="ldash-div > div">
                {childProps && activeTab === "units" && (
                  <div>
                    {isEditMode && (
                      <EditUnit
                        unit={childProps}
                        isActiveUnit={childProps.is_available}
                      />
                    )}
                  </div>
                )}
                {/* {childProps && activeTab === "contracts" && (
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
                )} */}
                {/* {childProps && activeTab === "rentLogs" && (
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
                )} */}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
