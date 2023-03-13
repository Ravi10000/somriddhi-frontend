import "./otp-form.styles.scss";

import React, { useEffect, useState, useRef } from "react";
import Button from "../../button/button";
// import { connect } from "react-redux";
import { verifyOtp } from "../../../api";

function OtpForm({ phone, nextStage, setOtp }) {
  const [validInput, setValidInput] = useState(false);
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const [counter, setCounter] = useState(60);

  const digit1Ref = useRef();
  const digit2Ref = useRef();
  const digit3Ref = useRef();
  const digit4Ref = useRef();

  useEffect(() => {
    digit1Ref.current.focus();
    const counterInterval = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    return () => {
      clearInterval(counterInterval);
    };
  }, []);

  async function submitForm(e) {
    // verify otp
    e.preventDefault();
    // const response = await verifyOtp({ phone, otp });
    nextStage();
  }
  function handleChange(e) {
    if (e.target.value.length === 1) {
      if (e.target.name === "digit-1") {
        setDigit1(e.target.value);
        digit2Ref.current.focus();
      }
      if (e.target.name === "digit-2") {
        setDigit2(e.target.value);
        digit3Ref.current.focus();
      }
      if (e.target.name === "digit-3") {
        setDigit3(e.target.value);
        digit4Ref.current.focus();
      }
      if (e.target.name === "digit-4") {
        setDigit4(e.target.value);
      }
    }
    if (
      digit1Ref.current.value.length === 1 &&
      digit2Ref.current.value.length === 1 &&
      digit3Ref.current.value.length === 1 &&
      digit4Ref.current.value.length === 1
    ) {
      setOtp(digit1 + digit2 + digit3 + digit4);
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }
  return (
    <form action="#" onSubmit={submitForm}>
      <h1>Verify OTP</h1>
      <p>Enter OTP which you received for login</p>
      <h5>Expires in {counter} seconds</h5>
      <div className="otp-inputs">
        <input
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
      <p>
        Didn&#39;t get otp? <span> Send Again</span>
      </p>
      <Button disabled={!validInput}>Veryfy otp</Button>
    </form>
  );
}

export default OtpForm;
