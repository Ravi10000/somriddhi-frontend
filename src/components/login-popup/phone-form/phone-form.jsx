import "./phone-form.styles.scss";

import React from "react";
import Button from "../../button/button";
export default function PhoneForm({ nextStage }) {
  return (
    <form action="#" onSubmit={nextStage}>
      <h1>Your Phone Number</h1>
      <p>Enter your 10 digit phone number</p>
      <input type="text" />
      <Button>Next</Button>
    </form>
  );
}
