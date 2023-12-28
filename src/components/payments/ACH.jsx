import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

/* Valid ACH Info:
  "type": "chec",
  "number": "856667",
  "routing": "072403004",
  "name": "Jane Doe"
*/

export default function ACH({ rentPayment }) {
  const { register, handleSubmit } = useForm();
  const [paymentError, setPaymentError] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);

  const onSubmit = (values) => {
    console.log("submitted:", values);
    const { fullName, accountNum, routingNum } = values;

    let my_data = {
      customer_id: 2,
      amount: 500,
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
      .post("http://localhost:8080/pay/api/v3/transaction", my_data, { headers })
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
          <span>Account Number: </span>
          <input
            required
            type="text"
            {...register("accountNum", {
              required: "Required",
            })}
          />
        </label>
        <label>
          <span>Routing Number: </span>
          <input required type="text" {...register("routingNum")} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {paymentError && <div>{paymentError}</div>}
    </section>
  );
}
