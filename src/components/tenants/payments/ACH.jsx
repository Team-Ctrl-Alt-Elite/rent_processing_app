import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../../styles/tenants/pay/ACH.css";
import ReactLoading from "react-loading";

/* Valid ACH Info:
  "type": "chec",
  "number": "856667",
  "routing": "072403004"
  "name": "Jane Doe"
*/

export default function ACH({
  rentPayment,
  setPaymentSuccessful,
  type,
  color,
}) {
  const { register, handleSubmit } = useForm();
  const [paymentError, setPaymentError] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userID = localStorage.getItem("id");

  const onSubmit = (values) => {
    // console.log("submitted:", values);
    setIsLoading(true);
    const { fullName, accountNum, routingNum } = values;

    let my_data = {
      customer_id: userID,
      amount: rentPayment,
      paymethods: [
        {
          type: "chec",
          number: accountNum,
          routing: routingNum,
          name: fullName,
        },
      ],
    };

    const headers = {
      Authorization:
        "Basic azdZZlN0WjlNNkk1RFZiMW8yNFFsUG5KcEs4Z3UwUlg6VjhMSzRsWUJYV0ViYWtPamZHSTZzWjE3M3VGQWRnU24=",
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:8080/pay/api/v3/transaction", my_data, {
        headers,
      })
      .then((response) => {
        console.log(response?.data);
        setIsLoading(false);
        setPaymentSuccessful(true);
      });

    // Our callback function (this gets called after data is sent to ChargeOver)
    function my_callback_function(code, message, response) {
      if (code == window.ChargeOver.Core.CODE_OK) {
        setPaymentResponse(response);
        console.log(response);
      } else {
        setPaymentError(message);
        console.log("Payment Error: ", message);
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="ach-wrapper">
        <label>
          <span>Full Name: </span>
          <input
            required
            type="text"
            placeholder="ex: Jane Doe"
            {...register("fullName", {
              required: "Required",
            })}
          />
        </label>
        <label>
          <span>Account Number: </span>
          <input
            required
            type="text"
            placeholder="ex: 856667"
            {...register("accountNum", {
              required: "Required",
            })}
          />
        </label>
        <label>
          <span>Routing Number: </span>
          <input
            required
            type="text"
            placeholder="ex: 072403004"
            {...register("routingNum")}
          />
        </label>
        {!isLoading ? (
          <button type="submit" className="bill-button">
            Submit
          </button>
        ) : (
          <ReactLoading
            type={"bars"}
            color={"gray"}
            height={55}
            width={55}
            className="bill-loading-icon"
          />
        )}
      </form>
      {paymentError && <div>{paymentError}</div>}
    </section>
  );
}
