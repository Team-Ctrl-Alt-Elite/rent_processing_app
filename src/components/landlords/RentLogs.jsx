import React, { useState } from "react";
import { rent_payment_log } from "../../dummyData";

/* LANDLORD PAYMENT REPORTS:
1. Landlord should be able to view all payments within each pay period (monthly)
2. Landlord should be able to see what rent payments are on-time and what payments are late
*/

const RentLogs = () => {
  const paymentLogs = rent_payment_log;

  // Extract unique months and years from payment logs
  const uniqueMonths = Array.from(new Set(paymentLogs.map((log) => log.payment_date.slice(0, 7))));
  
  const [selectedMonthYear, setSelectedMonthYear] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedMonthYear(e.target.value);
  };

  const filteredLogs = paymentLogs.filter((log) =>
    log.payment_date.startsWith(selectedMonthYear)
  );

  return (
    <section className="container">
      <h3>Rent Log</h3>

      <label>
        Select Month and Year:
        <select
          value={selectedMonthYear}
          onChange={handleDropdownChange}
        >
          <option value="">-- Select Month and Year --</option>
          {uniqueMonths.map((monthYear) => (
            <option key={monthYear} value={monthYear}>
              {new Date(`${monthYear}-1`).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </option>
          ))}
        </select>
      </label>

      <div>
        <h4>Payment Logs</h4>
        <ul>
          {filteredLogs.map((log) => (
            <li key={log.id}>
              <p>Payment Date: {log.payment_date}</p>
              <p>Amount: ${log.amount_paid}</p>
              <p>Medium: {log.payment_medium} </p>
              <p>
              {log.check_number && <span>Check Number: {log.check_number}</span>}
              {log.online_transaction_number && <span>Transaction Number: {log.online_transaction_number}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RentLogs;