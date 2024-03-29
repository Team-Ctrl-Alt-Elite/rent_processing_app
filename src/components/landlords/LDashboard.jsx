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
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getAllUnits = async () => {
      try {
        const response = await axios.get("http://localhost:8080/unit/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: "include",
        });

        setUnits(response?.data);
        setIsLoading(false);
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
    setChildProps(props);
  };

  return (
    <>
      <div className="ldash-background">
        <section className="ldash-section">
          <h2>Welcome Back, {userName}</h2>
          <button
            onClick={() => handleTabClick("units")}
            className="ldash-button"
          >
            Units
          </button>
          <button
            onClick={() => handleTabClick("contracts")}
            className="ldash-button"
          >
            Contracts
          </button>
          <button
            onClick={() => handleTabClick("rentLogs")}
            className="ldash-button"
          >
            Rent Logs
          </button>
          <button
            onClick={() => handleTabClick("user")}
            className="ldash-button"
          >
            User
          </button>
          <button
            onClick={() => navigate("/register/new-user")}
            className="ldash-button"
          >
            Create Contract
          </button>

          <div className="ldash-modal">
            <div className="ldash-left">
              {activeTab === "units" && (
                <Units
                  getChildProps={getChildProps}
                  units={units}
                  setIsEditMode={setIsEditMode}
                  isLoading={isLoading}
                />
              )}
              {activeTab === "contracts" && (
                <Contracts getChildProps={getChildProps} />
              )}
              {activeTab === "rentLogs" && (
                <RentLogs getChildProps={getChildProps} />
              )}
              {activeTab === "user" && <User getChildProps={getChildProps} />}
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
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
