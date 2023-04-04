import styles from "./login-popup.module.scss";

import { useEffect, useState } from "react";
import PhoneNumberForm from "./phone-form/phone-form";
import OtpForm from "./otp-form/otp-form";
import UserDetailsForm from "./user-details-form/user-details-form";
import Backdrop from "../backdrop/backdrop";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import SubscribeForm from "../subscribe-form/subscribe-form";

const loginStages = ["phone-entry", "verify-otp", "user-details", "subscribe"];

function LoginPopup({ closeModal, admin }) {
  const [currentLoginStage, setCurrentLoginStage] = useState(0);
  const [phone, setPhone] = useState("");

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
      <div className={styles["login"]}>
        <div className={styles["go-back"]} onClick={closeModal}>
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
            admin={admin}
          />
        )}
        {loginStages[currentLoginStage] === "user-details" && (
          <UserDetailsForm
            nextStage={nextStage}
            closeModal={closeModal}
            phone={phone}
          />
        )}
        {loginStages[currentLoginStage] === "subscribe" && (
          <SubscribeForm
            nextStage={nextStage}
            closeModal={closeModal}
            phone={phone}
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
