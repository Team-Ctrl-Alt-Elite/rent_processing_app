import { useEffect, useState } from "react";
import axios from "axios";

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

  // const handleSubmit = () => {
  //   const options = {
  //     method: "POST",
  //     url: "https://cert.api.fiservapps.com/ch/payments/v1/charges",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Client-Request-Id": "CCCI",
  //       "Api-Key": "NJ9PGJA38rMUDrxij7bvDDfTQ4c5L8wo",
  //       Timestamp: "0",
  //       "Accept-Language": "Accept-Language",
  //       "Auth-Token-Type": "Auth-Token-Type",
  //       Authorization: "Authorization",
  //       "Message-Digest": "Message-Digest",
  //     },
  //     data: '{"amount":{"total":12.04,"currency":"USD"},"source":{"sourceType":"PaymentCard","encryptionData":{"encryptionType":"RSA","encryptionTarget":"MANUAL","encryptionBlock":"=s3ZmiL1SSZC8QyBpj/Wn+VwpLDgp41IwstEHQS8u4EQJ....","encryptionBlockFields":"card.cardData:16,card.nameOnCard:10,card.expirationMonth:2,card.expirationYear:4,card.securityCode:3","keyId":"88000000022"}},"transactionInteraction":{"origin":"ECOM","eciIndicator":"CHANNEL_ENCRYPTED","posConditionCode":"CARD_NOT_PRESENT_ECOM"},"merchantDetails":{"merchantId":"100008000003683","terminalId":"10000001"}}',
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

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
