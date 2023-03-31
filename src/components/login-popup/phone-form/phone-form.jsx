import styles from "./phone-form.module.scss";

// packages imports
import { useEffect, useRef, useState } from "react";
import { sendOtp } from "../../../api/index";
// components
import Button from "../../button/button";

import { connect } from "react-redux";
import { setFlash } from "../../../redux/flash/flash.actions";

function PhoneNumberForm({ phone, setPhone, nextStage, setFlash }) {
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
        setFlash({
          type: "success",
          message: "OTP sent successfully",
        });
        nextStage();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
      className={styles["phone-form"]}
      encType="application/json"
      onSubmit={phoneFormSubmit}
    >
      <h1>Login</h1>
      <p>Enter your 10 digit phone number</p>
      <input
        className={styles["input"]}
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
      <Button disabled={!validInput} isLoading={isLoading}>
        Next
      </Button>
    </form>
  );
}

export default connect(null, { setFlash })(PhoneNumberForm);
