import "./otp-form.styles.scss";

import React, { useEffect, useState, useRef } from "react";
import Button from "../../button/button";
// import { connect } from "react-redux";
import { sendOtp, verifyOtp } from "../../../api";
import { setCurrentUser } from "../../../redux/user/user.actions";
import { connect } from "react-redux";

function OtpForm({ phone, nextStage, setCurrentUser }) {
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [otp, setOtp] = useState("");
  const [validInput, setValidInput] = useState(false);
  // const [digit1, setDigit1] = useState("");
  // const [digit2, setDigit2] = useState("");
  // const [digit3, setDigit3] = useState("");
  // const [digit4, setDigit4] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);
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

  async function submitForm(e) {
    e.preventDefault();
    console.log({ otp });
    try {
      setIsLoading(true);
      const response = await verifyOtp({ phone, otp });
      console.log({ response });
      if (response.data.message === "Invalid otp") {
        setIsOtpValid(false);
        setIsLoading(false);
        return;
      } else if (response.data.status === "success") {
        setCurrentUser({ phone });
        nextStage();
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  async function resendOtp() {
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
    <form action="#" onSubmit={submitForm} className="otp-form">
      <h1>Verify OTP</h1>
      <p>Enter OTP which you received for login</p>
      {secondsLeft > 1 ? (
        <h5>Expires in {secondsLeft} seconds</h5>
      ) : (
        <h5 onClick={resendOtp}>
          OTP Expired, <span>send again</span>
        </h5>
      )}
      <div className="otp-inputs">
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
      {!isOtpValid && <p className="invalid">invalid otp</p>}
      <Button disabled={!validInput} isLoading={isLoading}>
        Veryfy otp
      </Button>
    </form>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(OtpForm);
