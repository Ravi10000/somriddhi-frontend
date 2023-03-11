import "./referral-code-form.styles.scss";

import React from "react";
import Button from "../../button/button";

export default function ReferralForm({ nextStage }) {
  return (
    <form action="#" onSubmit={nextStage}>
      <h1>Your Phone Number</h1>
      <p>It&#39;s okay, If you do not have</p>
      <div className="input-container">
        <p>Enter Referral Code</p>
        <input type="text" placeholder="Enter" />
      </div>
      <Button>Continue</Button>
      <p>Skip Now</p>
    </form>
  );
}
