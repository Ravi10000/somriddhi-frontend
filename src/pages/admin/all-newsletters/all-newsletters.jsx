import "./all-newsletters.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";
import subscriptionsList from "./subscriptionsList";

export default function AllNewsletters() {
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
          {subscriptionsList?.map(({ email, addedAt, total }, index) => (
            <tr key={index}>
              <td>{email}</td>
              <td>{addedAt}</td>
              <td>{total}</td>
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
