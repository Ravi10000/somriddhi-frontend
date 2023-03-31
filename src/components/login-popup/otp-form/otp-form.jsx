import styles from "./otp-form.module.scss";

import { useEffect, useState, useRef } from "react";
import Button from "../../button/button";
// import { connect } from "react-redux";
import { sendOtp, verifyOtp, checkIfSubscribed } from "../../../api/index";
import { setCurrentUser } from "../../../redux/user/user.actions";
import { connect } from "react-redux";
import { setFlash } from "../../../redux/flash/flash.actions";

function OtpForm({ phone, nextStage, setCurrentUser, closeModal, setFlash }) {
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [otp, setOtp] = useState("");
  const [validInput, setValidInput] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const digit1Ref = useRef();
  const digit2Ref = useRef();
  const digit3Ref = useRef();
  const digit4Ref = useRef();

  useEffect(() => {
    digit1Ref.current.focus();
    const secondsInterval = setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds < 1) {
          clearInterval(secondsInterval);
        }
        return seconds - 1;
      });
    }, 1000);
    return () => {
      clearInterval(secondsInterval);
    };
  }, []);

  function resetOtpInputs() {
    setValidInput(false);
    setOtp("");
    digit1Ref.current.value = "";
    digit2Ref.current.value = "";
    digit3Ref.current.value = "";
    digit4Ref.current.value = "";
    digit1Ref.current.focus();
  }

  async function submitOtpForm(e) {
    e.preventDefault();
    console.log({ phone, otp });
    try {
      setIsLoading(true);
      const response = await verifyOtp({ phone, otp });
      console.log({ response });
      if (response.data.message === "Invalid otp") {
        resetOtpInputs();
        setIsOtpValid(false);
      } else if (response.data.status === "success") {
        const { user } = response.data;
        setCurrentUser(user);
        setFlash({ message: "Logged in successfully", type: "success" });
        if (!user?.email) {
          return nextStage();
        }
        return closeModal();
        // const subscribedResponse = await checkIfSubscribed();
        // console.log({ subscribedResponse });
        // if (subscribedResponse.data.status === "success") {
        //   if (!subscribedResponse.data.isSubscribed) {
        //     return nextStage(3);
        //   }
        //   return closeModal();
        // }
        // if (user?.email) {
        //   setIsLoading(false);
        //   const subscribedResponse = await checkIfSubscribed();
        //   if (subscribedResponse.data.status === "success") {
        //     if (!subscribedResponse.data.isSubscribed) {
        //       return nextStage(3);
        //     }
        //     return closeModal();
        //   }
        //   return nextStage();
        // }
        setIsLoading(false);
        // nextStage();
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function resendOtp() {
    resetOtpInputs();
    try {
      setIsOtpValid(true);
      const response = await sendOtp({ phone });
      setSecondsLeft(60);
      console.log({ response });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    if (e.target.value.length === 1) {
      if (e.target.name === "digit-1") {
        // setDigit1(e.target.value);
        digit2Ref.current.focus();
      }
      if (e.target.name === "digit-2") {
        // setDigit2(e.target.value);
        digit3Ref.current.focus();
      }
      if (e.target.name === "digit-3") {
        // setDigit3(e.target.value);
        digit4Ref.current.focus();
      }
      // if (e.target.name === "digit-4") {
      //   setDigit4(e.target.value);
      // }
    }
    if (
      digit1Ref.current.value.length === 1 &&
      digit2Ref.current.value.length === 1 &&
      digit3Ref.current.value.length === 1 &&
      digit4Ref.current.value.length === 1
    ) {
      setOtp(
        digit1Ref.current.value +
          digit2Ref.current.value +
          digit3Ref.current.value +
          digit4Ref.current.value
      );
      // setOtp(digit1 + digit2 + digit3 + digit4);
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }
  return (
    <form
      className={styles["otp-form"]}
      encType="application/json"
      onSubmit={submitOtpForm}
    >
      <h1>Verify OTP</h1>
      <p>Enter OTP which you received for login</p>
      {secondsLeft > 1 && <h5>Expires in {secondsLeft} seconds</h5>}
      <div className={styles["otp-inputs"]}>
        <input
          disabled={secondsLeft < 1 ? true : false}
          ref={digit1Ref}
          type="text"
          name="digit-1"
          placeholder="-"
          maxLength="1"
          onChange={handleChange}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />
        <input
          disabled={secondsLeft < 1 ? true : false}
          ref={digit2Ref}
          type="text"
          name="digit-2"
          placeholder="-"
          maxLength="1"
          onChange={handleChange}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
          }
        />
        <input
          disabled={secondsLeft < 1 ? true : false}
          ref={digit3Ref}
          type="text"
          name="digit-3"
          placeholder="-"
          maxLength="1"
          onChange={handleChange}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
          }
        />
        <input
          disabled={secondsLeft < 1 ? true : false}
          ref={digit4Ref}
          type="text"
          name="digit-4"
          placeholder="-"
          maxLength="1"
          onChange={handleChange}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
          }
        />
      </div>
      <p onClick={resendOtp}>
        Didn&#39;t get otp? <span> Send Again</span>
      </p>
      {!isOtpValid && (
        <p className={styles["invalid-msg"]}>Incorrect OTP, Try Again</p>
      )}
      {secondsLeft < 1 && (
        <p className={styles["invalid-msg"]} onClick={resendOtp}>
          OTP Expired, Send Again
        </p>
      )}
      <Button disabled={!validInput} isLoading={isLoading}>
        Veryfy otp
      </Button>
    </form>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(OtpForm);
