import "./login-popup.styles.scss";

import React, { useEffect, useState } from "react";
import PhoneEntry from "./phone-form/phone-form";
import VerifyOTP from "./otp-form/otp-form";
import ReferralForm from "./referral-code-form/referral-code-form";
const loginStages = ["phone-entry", "verify-otp", "referral-code"];

export default function LoginPopup({ closeModal }) {
  const [currentLoginStage, setCurrentLoginStage] = useState(0);
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
          <PhoneEntry nextStage={nextStage} />
        )}
        {loginStages[currentLoginStage] === "verify-otp" && (
          <VerifyOTP nextStage={nextStage} />
        )}
        {loginStages[currentLoginStage] === "referral-code" && (
          <ReferralForm nextStage={nextStage} />
        )}
      </div>
    </div>
  );
}
