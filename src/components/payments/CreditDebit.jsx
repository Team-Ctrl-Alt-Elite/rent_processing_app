import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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

export default function CreditDebit({ rentPayment }) {
  const { register, handleSubmit } = useForm();
  const [paymentError, setPaymentError] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);

  const onSubmit = async (values) => {
    console.log("submitted:", values);
    const { fullName, cardNumber, expM, expY, securityCode } = values;

    let my_data = {
      customer_id: 2,
      amount: 4,
      applied_to: [
        {
          invoice_id: 1003,
        },
      ],
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
    // Call the signup method
    // window.ChargeOver.Signup.signup(my_data, my_callback_function);
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
        <label>
          <span>Full Name: </span>
          <input
            // required
            type="text"
            {...register("fullName", {
              required: "Required",
            })}
          />
        </label>
        <label>
          <span>Card Number: </span>
          <input
            required
            type="text"
            {...register("cardNumber", {
              required: "Required",
            })}
          />
        </label>
        <label>
          <span>Exp: </span>
          <input
            required
            type="text"
            placeholder="Month"
            {...register("expM")}
          />
          <input
            required
            type="text"
            placeholder="Year"
            {...register("expY")}
          />
        </label>
        <label>
          <span>Security Code: </span>
          <input required type="text" {...register("securityCode")} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {paymentError && <div>{paymentError}</div>}
    </section>
  );
}
