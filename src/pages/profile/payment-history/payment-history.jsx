import "./payment-history.styles.scss";

import React from "react";

export default function PaymentHistory() {
  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      <div className="transactions-container">
        <div className="transaction">
          <div className="company-info">
            <img src="/amazon-round.png" alt="amazon" />
            <div className="name">
              <h4>Amazon</h4>
              <p>Amazon</p>
            </div>
          </div>
          <div className="price-and-status">
            <h4>Rs. 200</h4>
            <p>completed</p>
          </div>
        </div>
        <div className="transaction">
          <div className="company-info">
            <img src="/amazon-round.png" alt="amazon" />
            <div className="name">
              <h4>Amazon</h4>
              <p>Amazon</p>
            </div>
          </div>
          <div className="price-and-status">
            <h4>Rs. 200</h4>
            <p>completed</p>
          </div>
        </div>
        <div className="transaction">
          <div className="company-info">
            <img src="/amazon-round.png" alt="amazon" />
            <div className="name">
              <h4>Amazon</h4>
              <p>Amazon</p>
            </div>
          </div>
          <div className="price-and-status">
            <h4>Rs. 200</h4>
            <p>completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
