import { useState } from "react";
import Contracts from "./Contracts";
import RentLogs from "./RentLogs";
import Units from "./Units";
import "../../styles/LDashboard.css";

export default function LDashboard() {
  const [activeTab, setActiveTab] = useState("units");
  const [childProps, setChildProps] = useState();

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
      <header className="ldash-header">
        <h1 className="ldash-header h1">TenantTracker</h1>
      </header>
      <section className="ldash-section">
        <h2>Landlord Dashboard</h2>
        <button onClick={() => handleTabClick("units")}>Units</button>
        <button onClick={() => handleTabClick("contracts")}>Contracts</button>
        <button onClick={() => handleTabClick("rentLogs")}>Rent Logs</button>

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
            <div className="ldash-div > div">{childProps && childProps}</div>
          </div>
        </div>
      </section>
    </>
  );
}
