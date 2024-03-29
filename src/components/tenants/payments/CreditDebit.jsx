import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../../styles/tenants/pay/CreditDebit.css";
import ReactLoading from "react-loading";

// Valid CC number:
// "number": "4111 1111 1111 1111",
// "expdate_year": "2025",
// "expdate_month": "09",
// "cvv": "123"

function authenticateUser(user, password) {
  var token = user + ":" + password;
  var hash = btoa(token);
  return "Basic " + hash;
}

console.log(
  authenticateUser(
    "k7YfStZ9M6I5DVb1o24QlPnJpK8gu0RX",
    "V8LK4lYBXWEbakOjfGI6sZ173uFAdgSn"
  )
);

export default function CreditDebit({
  rentPayment,
  setPaymentSuccessful,
  type,
  color,
}) {
  const { register, handleSubmit } = useForm();
  const [paymentError, setPaymentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const userID = localStorage.getItem("id");
  console.log("rent payment: ", rentPayment);

  const onSubmit = async (values) => {
    // console.log("submitted:", values);
    setIsLoading(true);
    const { cardNumber, expM, expY, securityCode } = values;

    let my_data = {
      customer_id: userID,
      amount: rentPayment,
      // applied_to: [
      //   {
      //     invoice_id: 1003,
      //   },
      // ],
      paymethods: [
        {
          number: cardNumber,
          expdate_year: expY,
          expdate_month: expM,
          cvv: securityCode,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/pay/api/v3/transaction",
        my_data,
        {
          headers: {
            Authorization:
              "Basic azdZZlN0WjlNNkk1RFZiMW8yNFFsUG5KcEs4Z3UwUlg6VjhMSzRsWUJYV0ViYWtPamZHSTZzWjE3M3VGQWRnU24=",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("response: ", response);

      if (response?.data.code === 200) {
        setPaymentSuccessful(true);
      } else if (response?.data.code === 400) {
        setPaymentError("Transaction Could Not Be Processed. Declined.");
      } else {
        setPaymentError("Error Occurred During Payment");
      }

      setIsLoading(false);
      // Handle the redirect manually
      // if (response.status === 302) {
      //   const redirectResponse = await axios.get(response.headers.location);
      //   console.log("Redirect Response:", redirectResponse.data);
      // } else {
      //   console.log("Response:", response.data);
      // }
    } catch (error) {
      setPaymentError("Error occurred during payment.");
      console.error("Payment Error:", error);
    }

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
      <form onSubmit={handleSubmit(onSubmit)} className="card-wrapper">
        <label>
          <span>Card Number: </span>
          <div className="card-num">
            <input
              required
              type="text"
              placeholder="4111 1111 1111 1111"
              className="card-num-input"
              {...register("cardNumber", {
                required: "Required",
              })}
            />
          </div>
        </label>
        <label>
          <span>Exp Date: </span>
          <div className="card-num">
            <input
              required
              type="text"
              className="card-exp-input"
              placeholder="Month"
              {...register("expM")}
            />
            <input
              required
              type="text"
              className="card-exp-input"
              placeholder="Year"
              {...register("expY")}
            />
          </div>
        </label>
        <label>
          <span>Security Code: </span>
          <div className="card-num">
            <input
              required
              type="text"
              placeholder="123"
              className="card-exp-input"
              {...register("securityCode")}
            />
          </div>
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
      {paymentError && <div className="payment-error">{paymentError}</div>}
    </section>
  );
}
