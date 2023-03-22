import "./user-details-form.styles.scss";

// packages
import { useState } from "react";

// components
import Button from "../../button/button";
import { useForm } from "react-hook-form";
import { createUser } from "../../../api/index";
import { setCurrentUser } from "../../../redux/user/user.actions";
import { connect } from "react-redux";

function UserDetailsForm({
  nextStage,
  closeModal,
  phone,
  setReferralCode,
  setCurrentUser,
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("usertype", "customer");
    try {
      setIsLoading(true);
      const response = await createUser(formData);
      console.log({ response });
      setIsLoading(false);
      if (response.data.status === "success") {
        setCurrentUser(response.data.user);
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={submitForm} id="user-input" encType="application/json">
      <h1 className="title">Your Phone Number</h1>
      <div className="inputs-container">
        <input
          required
          name="fname"
          className="user-details-input"
          placeholder="First name"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
        />
        <input
          required
          className="user-details-input"
          pattern="[A-Za-z]+"
          name="lname"
          placeholder="Last name"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
        />
        <div className="input-container">
          <input
            required
            className="user-details-input"
            placeholder="Email"
            type="email"
            name="email"
          />
        </div>
        <input
          name="referralCode"
          placeholder="Referral Code"
          className="user-details-input"
        />
      </div>
      <p className="msg">It&#39;s okay, If you do not have any</p>
      <Button className="user-form-btn" isLoading={isLoading}>
        Continue
      </Button>
      <p className="skip-now" onClick={closeModal}>
        skip for now
      </p>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(UserDetailsForm);
