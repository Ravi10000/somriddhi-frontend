import styles from "./user-details-form.module.scss";

// packages
import { useState } from "react";

// components
import Button from "../../button/button";
import { checkIfSubscribed, createUser } from "../../../api/index";
import { setCurrentUser } from "../../../redux/user/user.actions";
import { connect } from "react-redux";
import { setFlash } from "../../../redux/flash/flash.actions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../text-input/text-input";
import { verifyPan } from "../../../api/verify-pan";

function UserDetailsForm({
  nextStage,
  closeModal,
  phone,
  setReferralCode,
  setCurrentUser,
  setFlash,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [entity, setEntity] = useState("individual");
  const schema = z
    .object({
      fname: z.string().nonempty({ message: "First Name is required" }),
      lname: z.string().nonempty({ message: "Last Name is required" }),
      email: z
        .string()
        .nonempty({ message: "Email is required" })
        .email("Invalid Email"),
      entity: z.string().nonempty({ message: "Entity is required" }),
      panNo:
        entity === "business"
          ? z
              .string()
              .min(10, { message: "PAN number length should be 10" })
              .max(10, { message: "PAN number length should be 10" })
              .regex(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/, {
                message: "invalid PAN No.",
              })
          : z.string().optional(),
      referredBy: z.string().optional(),
    })
    .refine(
      (data) => {
        let isBusiness = entity === "business";
        if (!isBusiness) return true;
        console.log({ data });
        let isValidPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
          data?.panNo?.toUpperCase()
        );
        console.log({ isValidPan });
        return isValidPan;
      },
      {
        message: "invalid PAN No.",
        path: ["panNo"],
      }
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  console.log({ errors });
  console.log({ entity });

  async function udpateUserDetails(formData) {
    console.table({ formData });
    // const formData = new FormData(e.target);
    // formData.append("entity", entity);
    // formData.append("usertype", "customer");
    try {
      setIsLoading(true);
      if (entity === "business") {
        try {
          const panRes = await verifyPan(formData.panNo);
          if (panRes?.data?.status !== "success") {
            setIsLoading(false);
            return setFlash({
              type: "error",
              message: "Invalid PAN No.",
            });
          }
        } catch (err) {
          console.log({ panError: err });
          setIsLoading(false);
          return setFlash({
            type: "error",
            message:
              "PAN verification failed, please contact support at somriddhi.store",
          });
        }
      }
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
      onSubmit={handleSubmit(udpateUserDetails)}
      id={styles["user-input"]}
      noValidate
    >
      <h1 className={styles["title"]}>Your Phone Number</h1>
      <div className={styles["inputs-container"]}>
        <TextInput
          className={styles["user-details-input"]}
          placeholder="First name"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
          register={{ ...register("fname") }}
          error={errors?.fname?.message}
        />
        <TextInput
          className={styles["user-details-input"]}
          placeholder="Last name"
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ""))
          }
          register={{ ...register("lname") }}
          error={errors?.lname?.message}
        />
        <TextInput
          className={styles["user-details-input"]}
          placeholder="Email"
          register={{ ...register("email") }}
          error={errors?.email?.message}
        />
        <div className={styles.entityRadioButtons}>
          <label
            htmlFor="individual"
            className={`${styles.radioContainer} ${
              entity === "individual" && styles.active
            }`}
            onClick={() => setEntity("individual")}
          >
            <input
              type="radio"
              id="individual"
              checked={entity === "individual"}
              className={styles.radio}
              readOnly
              value="individual"
              {...register("entity")}
            />
            <p>Individual</p>
          </label>
          <label
            htmlFor="business"
            className={`${styles.radioContainer} ${
              entity === "business" && styles.active
            }`}
            onClick={() => setEntity("business")}
          >
            <input
              type="radio"
              id="business"
              className={styles.radio}
              checked={entity === "business"}
              value="business"
              readOnly
              {...register("entity")}
            />
            <p>Business</p>
          </label>
        </div>
        {entity === "business" && (
          <TextInput
            inputStyle={{ textTransform: "uppercase" }}
            className={styles["user-details-input"]}
            placeholder="PAN No.*"
            maxLength="10"
            register={{ ...register("panNo") }}
            error={errors?.panNo?.message}
          />
        )}
        <input
          name="referredBy"
          placeholder="Referral Code"
          className={styles["user-details-input"]}
        />
      </div>
      <p className={styles["msg"]}>It&#39;s okay, If you do not have any</p>
      <Button isLoading={isLoading}>Continue</Button>
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
