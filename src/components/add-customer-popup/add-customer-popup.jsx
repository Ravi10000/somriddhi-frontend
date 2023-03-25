import "./add-customer-popup.styles.scss";

// react hooks
import { useState } from "react";

// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import NumInput from "../num-input/num-input";
import Button from "../button/button";

// api calls
import { createUserByAdmin } from "../../api";

// redux
import { setFlash } from "../../redux/flash/flash.actions";

function AddCustomerPopup({ setShowPopup, setFlash }) {
  const [isLoading, setIsLoading] = useState(false);

  async function submitAddCustomerForm(e) {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      setShowPopup(false);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
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

          <Button isLoading={isLoading}>Add customer</Button>
        </form>
      </div>
    </Backdrop>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddCustomerPopup);
