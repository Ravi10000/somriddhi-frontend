import "./phone-form.styles.scss";

// packages imports
import React, { useEffect, useRef, useState } from "react";

// components
import Button from "../../button/button";

export default function PhoneNumberForm({ nextStage, setPhoneNumber }) {
  const [validInput, setValidInput] = useState(false);
  const phoneNumberRef = useRef();
  useEffect(() => {
    phoneNumberRef.current.focus();
  }, []);

  function handleSubmit(e) {
    console.log(e.target[0].value);
    e.preventDefault();
    nextStage();
  }
  function handleChange(e) {
    if (e.target.value.length === 10) {
      setValidInput(true);
      setPhoneNumber(e.target.value);
    } else {
      setValidInput(false);
    }
  }
  return (
    <form action="#" onSubmit={handleSubmit}>
      <h1>Your Phone Number</h1>
      <p>Enter your 10 digit phone number</p>
      <input
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
      <Button disabled={!validInput}>Next</Button>
    </form>
  );
}
