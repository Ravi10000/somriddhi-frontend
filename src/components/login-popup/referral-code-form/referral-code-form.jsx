import "./referral-code-form.styles.scss";

// components
import Button from "../../button/button";

export default function ReferralForm({
  nextStage,
  closeModal,
  setReferralCode,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const code = e.target["referral-code"].value;
    setReferralCode(code);
    nextStage();
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <h1>Your Phone Number</h1>
      <p>It&#39;s okay, If you do not have</p>
      <div className="input-container">
        <p>Enter Referral Code</p>
        <input name="referral-code" type="text" placeholder="Enter" />
      </div>
      <Button>Continue</Button>
      <p onClick={closeModal}>Skip Now</p>
    </form>
  );
}
