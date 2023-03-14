import "./user-details-form.styles.scss";

// packages
import { useState } from "react";

// components
import Button from "../../button/button";
import { useForm } from "react-hook-form";
import { createUser } from "../../../api";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log({ errors });
  // console.log({ errors });
  async function submitForm(data) {
    console.log({ data });
    const { fname, lname, email, referralCode } = data;
    try {
      setIsLoading(true);
      const response = await createUser({
        fname,
        lname,
        email,
        phone,
        referralCode,
      });
      console.log({ response });
      setIsLoading(false);
      if (response.data.status === "success") {
        setCurrentUser(response.data.data);
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="user-input" noValidate>
      <h1>Your Phone Number</h1>
      <div className="inputs-container">
        <input
          placeholder="First name"
          {...register("fname", {
            required: "name required",
            pattern: { value: /^[A-Za-z]+$/i, message: "not a valid name" },
          })}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
        />
        <input
          pattern="[A-Za-z]+"
          placeholder="Last name"
          {...register("lname", {
            required: "last name required",
            pattern: { value: /^[A-Za-z]+$/i, message: "not a valid name" },
          })}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
        />
        <div className="input-container">
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "not a valid email address",
              },
            })}
          />
          {errors?.email?.message && (
            <p className="error">{errors?.email?.message}</p>
          )}
        </div>
        <input
          name="referralCode"
          placeholder="Referral Code"
          {...register("referralCode")}
        />
      </div>
      <p>It&#39;s okay, If you do not have any</p>
      <Button isLoading={isLoading}>Continue</Button>
      <p onClick={closeModal}>skip now</p>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(UserDetailsForm);
