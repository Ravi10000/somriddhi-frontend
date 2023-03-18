import "./all-newsletters.styles.scss";

import React, { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import subscriptionsList from "./subscriptionsList";
import { getAllNewLetter } from "../../../api";

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
    <div className="all-newsletters">
      <TitleSection
        noAddButton
        title="all subscriptions"
        addFunction={() => {
          alert("add newsletters popup need to be here");
        }}
      />
      <table className="subscription-table">
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
  );
}
