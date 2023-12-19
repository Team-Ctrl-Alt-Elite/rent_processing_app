import { useState } from "react";
import Contracts from "./Contracts";
import RentLogs from "./RentLogs";
import Units from "./Units";

/* LANDLORD DASHBOARD
1. Dashboard should be the "opening" page after a successful login
2. Dashboard should have landlord and building information
3. Dashboard should *potentially* have a "reminders" modal on the side (stretch goal)
*/

export default function LDashboard() {
  const [counter, setCounter] = useState(0);

  return (
    <section>
      <h2>Landlord Dashboard</h2>
      <button onClick={() => setCounter(0)}>Units</button>
      <button onClick={() => setCounter(1)}>Contracts</button>
      <button onClick={() => setCounter(2)}>Rent Logs</button>

      <div className="ldash-modal">
        <div className="ldash-left">
          {counter === 0 && <Units />}
          {counter === 1 && (
            <Contracts/>
          )}
          {counter === 2 && <RentLogs />}
        </div>
        {/* <div className="tdash-right"> */}
        {/* </div> */}
      </div>
    </section>
  );
}
