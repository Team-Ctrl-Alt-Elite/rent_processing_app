import "../../../styles/tenants/pay/PaymentSuccess.css";

export default function PaymentSuccess() {
  return (
    <section className="success-wrapper">
      <h3>Payment Successful!</h3>
      <div className="success-body">
        <div>Thank you for your payment.</div>
        <div>
          Please allow 2-3 business days for the payment to be processed.
        </div>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="success-button"
      >
        Return
      </button>
    </section>
  );
}
