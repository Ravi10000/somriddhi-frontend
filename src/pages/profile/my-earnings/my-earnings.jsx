import { getCashbackDetails } from "../../../api";
import "./my-earnings.styles.scss";

import React, { useEffect, useState } from "react";

export default function MyEarnings() {
  const [totalCashback, setTotalCashback] = useState("-");
  const [redemeedCashback, setRedemeedCashback] = useState("-");
  const [redemableCashback, setRedemableCashback] = useState("-");

  async function fetchEarnings() {
    try {
      const cashbackResponse = await getCashbackDetails();
      if (cashbackResponse.data.status === "success") {
        console.log({ cashbackResponse });
        setTotalCashback(cashbackResponse.data.totalCashback);
        setRedemeedCashback(cashbackResponse.data.redemeedCashback);
        setRedemableCashback(cashbackResponse.data.redemableCashback);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEarnings();
  }, []);
  return (
    <div className="my-earnings">
      <h2>My Earnings</h2>
      <div className="earnings-section">
        <p>Total Earnings</p>
        <h3>Rs. {totalCashback}</h3>
        <div className="dashed-line"></div>
        <p>
          Earnings will show here with 72 hours of your shopping via Somriddhi
        </p>
      </div>
      <div className="other-status">
        <div className="status-card">
          <img src="/request-payment.png" alt="request payment" />
          <h4>Request Payment</h4>
          {/* <div className="dashed-line"></div> */}
          <div className="link">
            <p>Get Paid</p>
            <img src="/arrow-go.png" alt="go" />
          </div>
        </div>
        <div className="status-card">
          <div className="status-data">
            <img src="/redeemable-earnings.png" alt="request payment" />
            <p>Rs. {redemableCashback}</p>
          </div>
          <h4>Redeemable Earnings</h4>
          {/* <div className="dashed-line"></div> */}
          <div className="link">
            <p>Learn More</p>
            <img src="/arrow-go.png" alt="go" />
          </div>
        </div>
        <div className="status-card">
          <div className="status-data">
            <img src="/my-orders.png" alt="request payment" />
            <p className="redemeed">Rs. {redemeedCashback}</p>
          </div>
          <h4>Redeemed Earnings</h4>
          {/* <div className="dashed-line"></div> */}
          <div className="link">
            <p>View More</p>
            <img src="/arrow-go.png" alt="go" />
          </div>
        </div>
      </div>
    </div>
  );
}
