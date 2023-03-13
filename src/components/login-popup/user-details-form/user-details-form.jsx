import "./user-details-form.styles.scss";

// components
import Button from "../../button/button";
import { useForm } from "react-hook-form";
import { createUser } from "../../../api";

export default function UserDetailsForm({
  nextStage,
  closeModal,
  setReferralCode,
}) {
  const { register, handleSubmit, errors } = useForm();
  // console.log({ errors });
  async function submitForm(data) {
    const { fname, lname, email, referralCode } = data;
    // const response = await createUser({ fname, lname, email, referralCode });
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} noValidate>
      <h1>Your Phone Number</h1>
      <div className="inputs-container">
        <input
          name="fname"
          type="text"
          placeholder="First name"
          {...register("fname", { required: "name required" })}
        />
        <input
          name="lname"
          type="text"
          placeholder="Last name"
          {...register("lname", { required: "last name required" })}
        />
        <input
          type="email"
          name="email"
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
        {errors?.email?.message && <p>{errors?.email?.message}</p>}
        <input
          name="referralCode"
          type="text"
          placeholder="referral code"
          {...register("referralCode")}
        />
      </div>
      <p>It&#39;s okay, If you do not have any</p>
      <Button>Continue</Button>
    </form>
  );
}
