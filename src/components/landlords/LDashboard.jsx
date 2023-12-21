import { useState } from "react";
import Contracts from "./Contracts";
import RentLogs from "./RentLogs";
import Units from "./Units";
import "../../styles/LDashboard.css";

/* LANDLORD DASHBOARD
1. Dashboard should be the "opening" page after a successful login
2. Dashboard should have landlord and building information
3. Dashboard should *potentially* have a "reminders" modal on the side (stretch goal)
*/

export default function LDashboard() {
  const [counter, setCounter] = useState(0);
  const [childProps, setChildProps] = useState(null)
  const [displayChild, setDisplayChild] = useState(false)

  const getChildProps = (props) => {
    setChildProps(props)
  }

  console.log(childProps)

  const handleCounter = (i) => {

  setCounter(i)
  }

  return (
    <>
    <header className="ldash-header">
      <h1 className="ldash-header h1">TenantTracker</h1>
    </header>
    <section className="ldash-section">
      <h2>Landlord Dashboard</h2>
      <button onClick={() => handleCounter(0)}>Units</button>
      <button onClick={() => handleCounter(1)}>Contracts</button>
      <button onClick={() => handleCounter(2)}>Rent Logs</button>

      <div className="ldash-modal">
        
        <div className="ldash-left">
          {counter === 0 && <Units getChildProps={getChildProps}/>}
          {counter === 1 && (
            <Contracts getChildProps={getChildProps}/>
          )}
          {counter === 2 && <RentLogs getChildProps={getChildProps}/>}
        </div>
        <div className="ldash-right">
        <div className="ldash-div > div">
              {childProps}
        </div>
        </div>
      </div>
    </section>
    </>
  );
}
