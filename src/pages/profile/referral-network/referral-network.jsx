import styles from "./referral-network.module.scss";

import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";
import { fetchReferredUsers } from "../../../api/index";

export default function ReferralNetwork() {
  const [referredUsers, setReferredUsers] = useState([]);
  async function getReferredUsers() {
    try {
      const response = await fetchReferredUsers();
      console.log({ response });
      if (response.data.status === "success")
        setReferredUsers(response.data.users);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getReferredUsers();
  }, []);
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
        {!(referredUsers?.length > 0) ? (
          <p className={styles["no-referral"]}>"No Referrals"</p>
        ) : (
          referredUsers?.map((user, index) => (
            <div className={styles["referral-item"]} key={index}>
              <div className={styles.left}>
                <img src="/user.png" alt="" />
                <div className={styles["name-and-status"]}>
                  <h4>{user?.phone}</h4>
                  <p className={`${styles.status} ${styles["completed"]}`}>
                    Completed
                  </p>
                </div>
              </div>
              <img className={styles.check} src="/check.png" alt="" />
              {/* {amount && <Button>{amount}</Button>} */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
