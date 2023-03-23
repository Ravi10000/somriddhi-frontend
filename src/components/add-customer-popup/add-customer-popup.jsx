import "./add-customer-popup.styles.scss";

import React from "react";
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import NumInput from "../num-input/num-input";
import { createUserByAdmin } from "../../api";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function AddCustomerPopup({ setShowPopup, setFlash }) {
  async function submitAddCustomerForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("usertype", "customer");
    formData.append("isContactVerified", false);
    try {
      const response = await createUserByAdmin(formData);
      console.log({ response });
      setFlash({
        type: "success",
        message: "Customer added successfully",
      });
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
const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddCustomerPopup);
