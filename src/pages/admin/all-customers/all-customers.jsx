import "./all-customers.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";
import customers from "./customers";

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
              {customers?.map(
                (
                  {
                    email,
                    phone,
                    joinedOn,
                    totalPurchase,
                    totalPayment,
                    totalPayout,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{joinedOn}</td>
                    <td>Rs. {totalPurchase}</td>
                    <td>Rs. {totalPayment}</td>
                    <td>Rs. {totalPayout}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
