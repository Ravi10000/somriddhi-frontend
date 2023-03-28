import styles from "./all-newsletters.module.scss";

import React, { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import subscriptionsList from "./subscriptionsList";
import { getAllNewLetter } from "../../../api/index";

export default function AllNewsletters() {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await getAllNewLetter();
        setSubscriptions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className={styles["all-newsletters"]}>
      <TitleSection
        noAddButton
        title="all subscriptions"
        addFunction={() => {
          alert("add newsletters popup need to be here");
        }}
      />
      <div className={styles["newslettes-table-container"]}>
        <table className={styles["subscription-table"]}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Added At</th>
              <th>Total</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions?.map(({ email, addedAt, total }, index) => (
              <tr key={index}>
                <td>{email}</td>
                <td>{addedAt ? addedAt : "unavailable"}</td>
                <td>{total ? total : "unavailable"}</td>
                <td>
                  <img src="/check.png" alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
