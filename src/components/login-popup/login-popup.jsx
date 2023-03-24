import "./login-popup.styles.scss";

import React, { useEffect, useState } from "react";
import PhoneNumberForm from "./phone-form/phone-form";
import OtpForm from "./otp-form/otp-form";
import UserDetailsForm from "./user-details-form/user-details-form";
import Backdrop from "../backdrop/backdrop";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import SubscribeForm from "../subscribe-form/subscribe-form";

const loginStages = ["phone-entry", "verify-otp", "user-details", "subscribe"];

function LoginPopup({ closeModal }) {
  const [currentLoginStage, setCurrentLoginStage] = useState(0);
  const [phone, setPhone] = useState("");
  // const [otp, setOtp] = useState("");
  // const [referralCode, setReferralCode] = useState("");

  // console.log({ phoneNumber, otp });
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  function nextStage(stage) {
    if (stage) {
      setCurrentLoginStage(stage);
      return;
    }
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
  return (
    <Backdrop>
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
            closeModal={closeModal}
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
        {loginStages[currentLoginStage] === "subscribe" && (
          <SubscribeForm
            nextStage={nextStage}
            closeModal={closeModal}
            phone={phone}
            // setReferralCode={setReferralCode}
          />
        )}
      </div>
    </Backdrop>
  );
}
const mapDispatchToProp = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProp)(LoginPopup);
