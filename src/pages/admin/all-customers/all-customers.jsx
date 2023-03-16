import "./all-customers.styles.scss";

import React, { useState } from "react";
import TitleSection from "../title-section/title-section";
import customers from "./customers";
import AddCustomerPopup from "../../../components/add-customer-popup/add-customer-popup";

export default function AllCustomers() {
  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);
  return (
    <>
      {showAddCustomerPopup && (
        <AddCustomerPopup setShowPopup={setShowAddCustomerPopup} />
      )}
      <div className="all-customers">
        <TitleSection
          title="all customers"
          uploadBtn
          addFunction={() => {
            setShowAddCustomerPopup(true);
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
    </>
  );
}
