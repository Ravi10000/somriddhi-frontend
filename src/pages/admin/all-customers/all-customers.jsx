import "./all-customers.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";
export default function AllCustomers() {
  return (
    <div className="all-customers">
      <TitleSection
        title="all customers"
        uploadBtn
        addFunction={() => {
          alert("add customer popup need to be here");
        }}
      />
      <div className="customers-table-container">
        <div className="customers-table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Joined on</th>
                <th>Total Purchase</th>
                <th>Total Payment</th>
                <th>Total Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>abs@gmail.com</td>
                <td>+91 123 456 7890</td>
                <td>06, March 2023</td>
                <td>Rs. 5000</td>
                <td>Rs. 5000</td>
                <td>Rs. 5000</td>
              </tr>
              {/* {subscriptionsList?.map(({ email, addedAt, total }, index) => (
              <tr key={index}>
                <td>{email}</td>
                <td>{addedAt}</td>
                <td>{total}</td>
                <td>
                  <img src="/check.png" alt="" />
                </td>
              </tr>
            ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
