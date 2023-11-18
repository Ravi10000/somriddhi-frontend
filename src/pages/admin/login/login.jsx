import Button from "../../../components/button/button";
import TextInput from "../../../components/text-input/text-input";
import styles from "./login.module.scss";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { connect } from "react-redux";
import { setFlash } from "../../../redux/flash/flash.actions";
import { setCurrentUser } from "../../../redux/user/user.actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { RiLockPasswordLine } from "react-icons/ri";
import ForgotPasswordPopup from "../../../components/forgot-password-popup/forgot-password-popup";

const schema = z.object({
  userId: z
    .string()
    .nonempty({ message: "User ID required" })
    .min(3, { message: "User ID must be at least 3 characters" }),
  password: z
    .string()
    .nonempty({ message: "Password required" })
    .min(3, { message: "Password must be at least 3 characters" }),
});

function AdminLoginPage({ setCurrentUser, currentUser, setFlash }) {
  const navigate = useNavigate();
  const [showforgotPassword, setShowForgotPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   userId: "test@admin",
    //   password: "password",
    // },
  });

  useEffect(() => {
    if (currentUser?.usertype === "admin") {
      navigate("/admin/banners");
    }
  }, [currentUser]);

  const handleLogin = async (data) => {
    console.table({ data });
    try {
      const res = await axios.post("/admin", data);
      console.table(res?.data);
      if (res?.data?.user) {
        localStorage.setItem("token", res?.data?.token);
        setCurrentUser(res?.data?.user);
        navigate("/admin/banners");
        setFlash({
          type: "success",
          message: "Admin logged in successfully",
        });
      }
    } catch (err) {
      console.log(err);
      setFlash({
        type: "error",
        message: err?.response?.data?.message ?? "Somthing went wrong",
      });
    }
  };

  return (
    <div className={styles.container}>
      {showforgotPassword && (
        <ForgotPasswordPopup
          close={() => setShowForgotPassword(false)}
          setFlash={setFlash}
        />
      )}
      <section className={styles.box}>
        <div className={styles.head}>
          <MdAdminPanelSettings className={styles.icon} />
          <h1>Admin Login</h1>
        </div>
        <form
          className={styles.inputs}
          id="admin-login"
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          <TextInput
            label="User ID / Email"
            autoComplete="user id"
            register={{ ...register("userId") }}
            error={errors?.userId?.message}
          />
          <TextInput
            type="password"
            label="Password"
            autoComplete="current-password"
            register={{ ...register("password") }}
            error={errors?.password?.message}
          />
        </form>
        <div className={styles.forgotPassword}>
          <button onClick={() => setShowForgotPassword(true)}>
            <RiLockPasswordLine />
            <p>forgot password?</p>
          </button>
        </div>
        <Button style={{ width: "100%" }} form="admin-login">
          <span>Login</span>
          <BiLogInCircle />
        </Button>
      </section>
    </div>
  );
}
const mapState = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapState, { setCurrentUser, setFlash })(AdminLoginPage);
