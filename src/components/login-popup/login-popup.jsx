import "./login-popup.styles.scss";

import React, { useEffect, useState } from "react";
import PhoneNumberForm from "./phone-form/phone-form";
import OtpForm from "./otp-form/otp-form";
import UserDetailsForm from "./user-details-form/user-details-form";

import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

const loginStages = ["phone-entry", "verify-otp", "user-details"];

function LoginPopup({ closeModal }) {
  const [currentLoginStage, setCurrentLoginStage] = useState(0);
  const [phone, setPhone] = useState("");
  // const [otp, setOtp] = useState("");
  // const [referralCode, setReferralCode] = useState("");

  // console.log({ phoneNumber, otp });
  function nextStage() {
    if (currentLoginStage === loginStages.length - 1) {
      return;
    }
    setCurrentLoginStage((prevStage) => prevStage + 1);
  }
  function previousStage() {
    if (currentLoginStage === 0) {
      return;
    }
    setCurrentLoginStage((prevStage) => prevStage - 1);
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });
  return (
    <div className="backdrop">
      <div className="login">
        <div className="go-back" onClick={closeModal}>
          <img src="/go-back.png" alt="go back" />
          <p>Back</p>
        </div>
        {loginStages[currentLoginStage] === "phone-entry" && (
          <PhoneNumberForm
            nextStage={nextStage}
            setPhone={setPhone}
            phone={phone}
          />
        )}
        {loginStages[currentLoginStage] === "verify-otp" && (
          <OtpForm
            nextStage={nextStage}
            phone={phone}
            // otp={otp}
            // setOtp={setOtp}
          />
        )}
        {loginStages[currentLoginStage] === "user-details" && (
          <UserDetailsForm
            nextStage={nextStage}
            closeModal={closeModal}
            phone={phone}
            // setReferralCode={setReferralCode}
          />
        )}
      </div>
    </div>
  );
}
const mapDispatchToProp = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProp)(LoginPopup);
