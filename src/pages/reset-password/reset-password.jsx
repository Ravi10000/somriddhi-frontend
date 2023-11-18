import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./reset-password.module.scss";
import TextInput from "../../components/text-input/text-input";
import Button from "../../components/button/button";
import { MdLockReset } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
const schema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "password required" })
      .min(8, { message: "min length should be 8 characters" })
      .max(32, { message: "max length should be 32 characters" }),
    confirmPassword: z.string().nonempty({ message: "confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password are not same",
    path: ["confirmPassword"],
  });

function ResetPasswordPage({ setFlash }) {
  const { requestId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  useEffect(() => {
    if (!requestId) navigate("/");
  }, [requestId]);

  const handleResetPassword = async (data) => {
    console.log({ data });
    try {
      const res = await axios.put("/admin/reset-password", {
        password: data.password,
        requestId,
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

  return (
    <div className={styles.container}>
      <form
        noValidate
        onSubmit={handleSubmit(handleResetPassword)}
        className={styles.box}
      >
        <h2>
          <MdLockReset />
          <span>Reset Password</span>
        </h2>
        <TextInput
          label="Password"
          register={{ ...register("password") }}
          error={errors?.password?.message}
        />
        <TextInput
          label="Confirm Password"
          register={{ ...register("confirmPassword") }}
          error={errors?.confirmPassword?.message}
        />
        <Button isLoading={isSubmitting}>Save</Button>
      </form>
    </div>
  );
}

export default connect(null, { setFlash })(ResetPasswordPage);
