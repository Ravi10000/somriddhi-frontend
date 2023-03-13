import "./my-earnings.styles.scss";

import React from "react";

export default function MyEarnings() {
  return (
    <div className="my-earnings">
      <h2>My Earnings</h2>
      <div className="earnings-section">
        <p>Total Earnings</p>
        <h3>Rs. 5000</h3>
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
            <p>500</p>
          </div>
          <h4>Redeemable Earnings</h4>
          {/* <div className="dashed-line"></div> */}
          <div className="link">
            <p>Learn More</p>
            <img src="/arrow-go.png" alt="go" />
          </div>
        </div>
        <div className="status-card">
          <img src="/my-orders.png" alt="request payment" />
          <h4>My Orders</h4>
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
