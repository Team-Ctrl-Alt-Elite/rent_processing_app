import { useState, useEffect } from "react";
import Contract from "./Contract";
import History from "./History";
import PayBill from "./PayBill";
import AccountOverview from "./AccountOverview";
import "../../styles/TDashboard.css";
import { tenant, propertyInfo, landlord, contract } from "../../dummyData";
import axios from "axios";

export default function TDashboard() {
  const [counter, setCounter] = useState(0);

  return (
    <section>
      <h2>Tenant Dashboard</h2>
      <button onClick={() => setCounter(0)}>Account Overview</button>
      <button onClick={() => setCounter(1)}>Contract</button>
      <button onClick={() => setCounter(2)}>History</button>

      <div className="tdash-modal">
        <div className="tdash-left">
          {counter === 0 && <AccountOverview tenant={tenant} />}
          {counter === 1 && (
            <Contract
              contract={contract}
              propertyInfo={propertyInfo}
              landlord={landlord}
            />
          )}
          {counter === 2 && <History />}
        </div>
        <div className="tdash-right">
          <PayBill contract={contract} />
        </div>
      </div>
    </section>
  );
}
