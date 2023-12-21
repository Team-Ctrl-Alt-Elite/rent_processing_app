import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/forms.css";
import CreditDebit from "../payments/CreditDebit";
import ACH from "../payments/ACH";
import { getPayMonth, getPayYear } from "../../utils/payPeriod";

export default function PayBill({ contract }) {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [rentPayment, setRentPayment] = useState("");
  const paymentMethods = ["Credit/Debit Card", "ACH/eCheck"];
  console.log(rentPayment);

  const handleDropdownChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <section>
      <h3 className="form-header">Pay Your Bill</h3>

      <fieldset>
        <legend>
          {getPayMonth()}, {getPayYear()}
        </legend>

        <div>
          <input
            type="radio"
            id="total-rent"
            name="pay-bill"
            value={contract.monthly_rent}
            defaultChecked
          />
          <label>Total Rent: ${contract.monthly_rent.toFixed(2)}</label>
        </div>
      </fieldset>

      <label>
        Select Payment Method:
        <select value={selectedPayment} onChange={handleDropdownChange}>
          <option value="">-- Payment Options --</option>
          {paymentMethods.map((payment, i) => (
            <option key={i} value={payment}>
              {payment}
            </option>
          ))}
        </select>
      </label>
      <div>
        {selectedPayment === "ACH/eCheck" ? (
          <ACH rentPayment={rentPayment} />
        ) : (
          <CreditDebit rentPayment={rentPayment} />
        )}
      </div>
      <p>
        <i className="form-footer">Rent is due on the 1st of every month!</i>
      </p>
    </section>
  );
}
