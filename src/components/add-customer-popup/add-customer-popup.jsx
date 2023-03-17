import "./add-customer-popup.styles.scss";

import React from "react";
import Backdrop from "../backdrop/backdrop";

export default function AddCustomerPopup({ setShowPopup }) {
  return (
    <Backdrop>
      <div className="add-customer-popup">
        <div className="head">
          <div className="head-left">
            <img src="/arrow-left-primary.png" alt="go back" />
            <h3>Add Customer</h3>
          </div>
          <button
            className="close-popup"
            onClick={() => {
              setShowPopup(false);
            }}
          >
            <img src="/close.png" alt="close popup" />
          </button>
        </div>
        <form>
          <div className="customer-name input-container">
            <label htmlFor="">Name</label>
            <input className="text-input" placeholder="Enter Customer Name" />
          </div>
          <div className="customer-name input-container">
            <label htmlFor="">Phone</label>
            <input
              className="text-input"
              placeholder="Enter Phone Number"
              maxLength={10}
              inputMode="numeric"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          </div>

          <button className="add-customer-btn">Add customer</button>
        </form>
      </div>
    </Backdrop>
  );
}
