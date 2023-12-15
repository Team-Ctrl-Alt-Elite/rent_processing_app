import { useEffect, useState } from "react";

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export default function PayBill({ contract }) {
  const [currMonth, setCurrMonth] = useState("");
  const date = new Date();
  const month = date.getMonth();

  useEffect(() => {
    const getCurrMonth = (m) => {
      console.log(month);
      // console.log(months);

      for (let [key, value] in months) {
        if (key === m) setCurrMonth(value);
      }
    };

    getCurrMonth(month);
  }, [month]);

  console.log(currMonth);

  return (
    <section>
      <h3>Pay Your Bill</h3>
      <p>Pay Period: {currMonth}</p>

      <p>
        <i>Rent is due on the 1st of every month.</i>
      </p>
    </section>
  );
}
