import { useState, useEffect } from "react";
import Contract from "./Contract";
import History from "./History";
import PayBill from "./PayBill";
import AccountOverview from "./AccountOverview";
import "../../styles/tenants/TDashboard.css";
import { tenant, propertyInfo, landlord, contract } from "../../dummyData";
import axios from "axios";

export default function TDashboard() {
  const [counter, setCounter] = useState(0);
  const userName = localStorage.getItem("name");

  return (
    <>
      <div className="tdash-background">
        <section className="tdash-section">
          <h2>Welcome, {userName}!</h2>
          <button onClick={() => setCounter(0)} className="tdash-button">
            Account Overview
          </button>
          <button onClick={() => setCounter(1)} className="tdash-button">
            Payment History
          </button>

          <div className="tdash-modal">
            <div className="tdash-left">
              {counter === 0 && (
                <div>
                  <AccountOverview tenant={tenant} />
                  <Contract
                    contract={contract}
                    propertyInfo={propertyInfo}
                    landlord={landlord}
                  />
                </div>
              )}
              {counter === 1 && <History />}
            </div>
            <div className="tdash-right">
              <PayBill contract={contract} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
