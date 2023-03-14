import "./phone-form.styles.scss";

// packages imports
import React, { useEffect, useRef, useState } from "react";
import { sendOtp } from "../../../api";

// components
import Button from "../../button/button";

export default function PhoneNumberForm({ phone, setPhone, nextStage }) {
  // const [phone, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const phoneNumberRef = useRef();
  useEffect(() => {
    phoneNumberRef.current.focus();
  }, []);

  async function submitForm(e) {
    e.preventDefault();
    // console.log(e.target[0].value);
    // create otp and send it to the user
    try {
      setIsLoading(true);
      const response = await sendOtp({ phone });
      if (response.data.status === "success") {
        nextStage();
      }
      setIsLoading(false);
      console.log({ response });
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(e) {
    if (e.target.value.length === 10) {
      setValidInput(true);
      setPhone(e.target.value);
    } else {
      setValidInput(false);
    }
  }
  return (
    <form onSubmit={submitForm} className="phone-form">
      <h1>Your Phone Number</h1>
      <p>Enter your 10 digit phone number</p>
      <input
        className="input"
        ref={phoneNumberRef}
        type="text"
        name="phone-number"
        maxLength={10}
        inputMode="numeric"
        onChange={handleChange}
        onInput={(e) =>
          (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
        }
      />
      <Button disabled={!validInput} isLoading={isLoading}>
        Next
      </Button>
    </form>
  );
}
