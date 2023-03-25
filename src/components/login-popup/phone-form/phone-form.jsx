import "./phone-form.styles.scss";

// packages imports
import React, { useEffect, useRef, useState } from "react";
import { sendOtp } from "../../../api/index";
import axios from "axios";
// components
import Button from "../../button/button";
import TextInput from "../../text-input/text-input";

export default function PhoneNumberForm({ phone, setPhone, nextStage }) {
  // const [phone, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const phoneNumberRef = useRef();
  useEffect(() => {
    phoneNumberRef.current.focus();
  }, []);

  async function phoneFormSubmit(e) {
    e.preventDefault();
    // let data = JSON.stringify({
    //   phone: "3932537473",
    //   countryCode: "+91",
    // });

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "${import.meta.env.VITE_REACT_APP_API_URL}/api/sendotp",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const formData = new FormData(e.target);
    formData.append("countryCode", "+91");
    try {
      setIsLoading(true);
      const response = await sendOtp(formData);
      console.log({ response });
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
    <form
      className="phone-form"
      encType="application/json"
      onSubmit={phoneFormSubmit}
    >
      <h1>Your Phone Number</h1>
      <p>Enter your 10 digit phone number</p>
      <input
        className="input"
        ref={phoneNumberRef}
        type="text"
        name="phone"
        maxLength={10}
        inputMode="numeric"
        onChange={handleChange}
        onInput={(e) =>
          (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
        }
      />
      {/* <TextInput label="Phone" name="phone" placeholder="Enter Phone Number" /> */}
      <Button disabled={!validInput} isLoading={isLoading}>
        Next
      </Button>
    </form>
  );
}
