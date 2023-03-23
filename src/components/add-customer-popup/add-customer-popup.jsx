import "./add-customer-popup.styles.scss";

import React from "react";
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import NumInput from "../num-input/num-input";
import { createUser } from "../../api";
export default function AddCustomerPopup({ setShowPopup }) {
  async function submitAddCustomerForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await createUser(formData);
      console.log({ response });
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className="add-customer-popup">
        <PopupHead title="Add New Customer" setShowPopup={setShowPopup} />
        <form onSubmit={submitAddCustomerForm} encType="application/json">
          <TextInput
            label="First Name"
            name="fname"
            placeholder="Enter First Name"
          />
          <TextInput
            label="Last Name"
            name="lname"
            placeholder="Enter Last Name"
          />
          <NumInput
            label="Phone"
            name="phone"
            placeholder="Enter Phone Number"
            maxLength="10"
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="Enter Email Id"
            type="email"
          />

          <button className="add-customer-btn">Add customer</button>
        </form>
      </div>
    </Backdrop>
  );
}
