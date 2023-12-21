import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// Valid CC number:
// "number": "4111 1111 1111 1111",
// "expdate_year": "2025",
// "expdate_month": "09",
// "cvv": "123"

export default function CreditDebit({ rentPayment }) {
  const { register, handleSubmit } = useForm();
  const [paymentError, setPaymentError] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);

  const onSubmit = (values) => {
    console.log("submitted:", values);
    const { fullName, cardNumber, expM, expY, securityCode } = values;

    let my_data = {
      customer_id: 2,
      amount: 500,
      paymethods: [
        {
          number: cardNumber,
          expdate_year: expY,
          expdate_month: expM,
          cvv: securityCode,
        },
      ],
    };

    const headers = {
      Authorization:
        "Basic N3N1dFdGRU8yektWWUlHbVpNSjNOaWo1aGZMeERSYjg6OXZDSmJtZFpLU2llVmNoeXJSSXRGUXc4TUJONGxPSDM=",
      "Content-Type": "application/json",
    };

    axios
      .post("http://localhost:8080/api/v3/transaction", my_data, { headers })
      .then((response) => {
        console.log(response?.data);
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
