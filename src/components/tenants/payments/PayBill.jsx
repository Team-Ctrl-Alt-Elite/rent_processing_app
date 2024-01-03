import { useState } from "react";
import CreditDebit from "./CreditDebit";
import ACH from "./ACH";
import PaymentSuccess from "./PaymentSuccess";
import { getPayMonth, getPayYear } from "../../../utils/payPeriod";
import "../../../styles/tenants/pay/PayBill.css";

export default function PayBill({ monthly_rent }) {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const paymentMethods = ["Credit/Debit Card", "ACH/eCheck"];

  return (
    <section className="bill-wrapper">
      {!paymentSuccessful ? (
        <>
          <h3 className="bill-header">Pay Your Bill</h3>

          <fieldset className="bill-fieldset">
            <legend>
              {getPayMonth()}, {getPayYear()}
            </legend>

            <div>
              <input
                type="radio"
                id="total-rent"
                name="pay-bill"
                value={monthly_rent}
                defaultChecked
              />
              <label>Total Due: ${monthly_rent}.00</label>
            </div>
          </fieldset>

          <div className="contract-pay-method">
            <label>
              Select Payment Method:
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
              >
                <option value="">-- Payment Options --</option>
                {paymentMethods.map((payment, i) => (
                  <option key={i} value={payment}>
                    {payment}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            {selectedPayment && selectedPayment === "ACH/eCheck" ? (
              <ACH
                rentPayment={monthly_rent}
                setPaymentSuccessful={setPaymentSuccessful}
              />
            ) : (
              <CreditDebit
                rentPayment={monthly_rent}
                setPaymentSuccessful={setPaymentSuccessful}
              />
            )}
          </div>
          <p>
            <i className="bill-footer">
              Rent is due before the 1st of every month!
            </i>
          </p>
        </>
      ) : (
        <PaymentSuccess />
      )}
    </section>
  );
}
