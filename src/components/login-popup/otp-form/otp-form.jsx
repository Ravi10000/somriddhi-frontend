import "./otp-form.styles.scss";

import React from "react";
import Button from "../../button/button";

export default function OtpForm({ nextStage }) {
  return (
    <form action="#" onSubmit={nextStage}>
      <h1>Verify OTP</h1>
      <p>Enter OTP which you received for login</p>
      <h5>Expires in 1 minutes</h5>
      <div className="otp-inputs">
        <input
          type="text"
          name="digit-1"
          placeholder="-"
          maxlength="1"
          onInput={(e) => {
            console.log(e.target.value.replace(/[^0-9]/g, ""));
          }}
          // onInput={(this.value = this.value.replace(/[^0-9]/g, ""))}
        />
        <input type="text" name="digit-2" placeholder="-" />
        <input type="text" name="digit-3" placeholder="-" />
        <input type="text" name="digit-4" placeholder="-" />
      </div>
      <p>
        Didn&#39;t get otp? <span> Send Again</span>
      </p>
      <Button>Veryfy otp</Button>
    </form>
  );
}
