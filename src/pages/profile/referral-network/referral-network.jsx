import styles from "./referral-network.module.scss";

import React from "react";
import Button from "../../../components/button/button";

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
    <div className={styles["referral-network"]}>
      <h2>Referral Network</h2>
      <div className={styles["referral-list"]}>
        {arrayOfReferrals.map(({ name, status, amount }, index) => (
          <div className={styles["referral-item"]} key={index}>
            <div className={styles.left}>
              <img src="/refer.png" alt="" />
              <div className={styles["name-and-status"]}>
                <h4>{name}</h4>
                <p className={`${styles.status} ${styles[status]}`}>{status}</p>
              </div>
            </div>
            {amount && <Button>{amount}</Button>}
          </div>
        ))}
      </div>
    </div>
  );
}
