import styles from "./user-details-form.module.scss";

// packages
import { useState } from "react";

// components
import Button from "../../button/button";
import { checkIfSubscribed, createUser } from "../../../api/index";
import { setCurrentUser } from "../../../redux/user/user.actions";
import { connect } from "react-redux";
import { setFlash } from "../../../redux/flash/flash.actions";

function UserDetailsForm({
  nextStage,
  closeModal,
  phone,
  setReferralCode,
  setCurrentUser,
  setFlash,
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
        if (response.data.user) {
          setCurrentUser(response.data.user);
          setFlash({
            type: "success",
            message: "User Details Updated Successfully",
          });
          // const suscribedResponse = await checkIfSubscribed();
          // if (suscribedResponse.data.status === "success") {
          //   if (!suscribedResponse.data.isSubscribed) {
          //     return nextStage();
          //   }
          // }
          closeModal();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={submitForm}
      id={styles["user-input"]}
      encType="application/json"
    >
      <h1 className={styles["title"]}>Your Phone Number</h1>
      <div className={styles["inputs-container"]}>
        <input
          required
          name="fname"
          className={styles["user-details-input"]}
          placeholder="First name"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
        />
        <input
          required
          className={styles["user-details-input"]}
          pattern="[A-Za-z]+"
          name="lname"
          placeholder="Last name"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
        />
        <input
          required
          className={styles["user-details-input"]}
          placeholder="Email"
          type="email"
          name="email"
        />
        <input
          name="referralCode"
          placeholder="Referral Code"
          className={styles["user-details-input"]}
        />
      </div>
      <p className={styles["msg"]}>It&#39;s okay, If you do not have any</p>
      <Button isLoading={isLoading}>
        Continue
      </Button>
      <p className={styles["skip-now"]} onClick={closeModal}>
        skip for now
      </p>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(UserDetailsForm);
