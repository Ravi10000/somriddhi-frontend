import styles from "./forgot-password-popup.module.scss";
import Backdrop from "../backdrop/backdrop";
import TextInput from "../text-input/text-input";
import Button from "../button/button";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email("Invalid Email"),
});
function ForgotPasswordPopup({ close, setFlash }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const handleRequest = async (data) => {
    console.log({ data });
    try {
      const res = await axios.post("/admin/request-reset-password", {
        email: data.email,
      });
      console.log({ res });
      setFlash({
        type: "success",
        message: "Password reset link sent to email",
      });
      close();
    } catch (err) {
      console.log({ err });
      setFlash({
        type: "error",
        message:
          err?.response?.data?.message ??
          "Somthing went wrong please try again.",
      });
    }
  };

  console.log({ errors });

  return (
    <Backdrop close={close}>
      <form
        className={styles.container}
        noValidate
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit(handleRequest)}
      >
        <div className={styles.head}>
          <h2>Reset Password</h2>
          <button onClick={close}>
            <IoMdClose />
          </button>
        </div>
        <TextInput
          label="Email"
          register={{ ...register("email") }}
          error={errors?.email?.message}
        />
        <div className={styles.text}>
          <TbInfoSquareRoundedFilled className={styles.icon} />
          <p>
            An email with reset password link will be sent to your provided
            email address.
          </p>
        </div>
        <Button isLoading={isSubmitting}>Send Reset Password Link</Button>
      </form>
    </Backdrop>
  );
}

export default ForgotPasswordPopup;
