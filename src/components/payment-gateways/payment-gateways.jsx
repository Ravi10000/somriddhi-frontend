import Backdrop from "../backdrop/backdrop";
import styles from "./payment-gateways.module.scss";
import { IoCloseSharp } from "react-icons/io5";

function PaymentGatways({ close, setPaymentMethod, isValid }) {
  return (
    <Backdrop close={close}>
      <div
        className={styles.paymentGateways}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Select Payment Gateway</h2>
        <div className={styles.gatewayList}>
          {/* <button
            className={styles.phonepeBtn}
            onClick={() => {
              setPaymentMethod("phonepe");
            }}
          >
            <p>Checkout With </p>
            <img src="/phonepe-icon-sm.svg" alt="phonepe" />
          </button> */}
          <button
            className={styles.upiBtn}
            onClick={() => {
              setPaymentMethod("upigateway");
            }}
          >
            {/* <p>Checkout With </p> */}
            <img src="/UPI.svg" alt="" />
          </button>
          {/* <p style={{ color: "orange", padding: "5px" }}>
            Please don't use below payment method, it's in testing phase
          </p> */}
          <button
            className={styles.yespayBtn}
            onClick={() => {
              setPaymentMethod("yespay");
            }}
          >
            <img src="/yes-pay.png" alt="" />
          </button>
        </div>
        <button className={styles.close} onClick={() => close()}>
          Cancel
          <IoCloseSharp className={styles.icon} />
        </button>
      </div>
    </Backdrop>
  );
}

export default PaymentGatways;
