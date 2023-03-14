import "./referral-network.styles.scss";

import React from "react";

export default function ReferralNetwork() {
  const arrayOfReferrals = [
    {
      name: "John Doe",
      status: "completed",
        amount: "Rs.100",
    },
    {
      name: "John Doe",
      status: "completed",
      amount: "Rs.100",
    },
    {
      name: "John Doe",
      status: "completed",
      amount: "Rs.100",
    },
    {
      name: "John Doe",
      status: "pending",
      //   amount: "Rs.100",
    },
    {
      name: "John Doe",
      status: "completed",
      amount: "Rs.100",
    },
  ];
  return (
    <div className="referral-network">
      <h2>Referral Network</h2>
      <div className="referral-list">
        {arrayOfReferrals.map(({ name, status, amount }, index) => (
          <div className="referral-item" key={index}>
            <div className="left">
              <img src="/refer.png" alt="" />
              <div className="name-and-status">
                <h4>{name}</h4>
                <p className={`status ${status}`}>{status}</p>
              </div>
            </div>
            {amount && <button>{amount}</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
