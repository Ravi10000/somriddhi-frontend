import Backdrop from "../../components/backdrop/backdrop";
import Button from "../../components/button/button";
import TextInput from "../../components/text-input/text-input";
import styles from "./admin-login.module.scss";

import React from "react";

export default function AdminLogin({ setAdmin }) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleAdminLogin(e) {
    setIsLoading(true);
    console.log("handleAdminLogin");
    e.preventDefault();
    const formData = new FormData(e.target);
    for (let entry of formData) {
      console.log(entry);
    }
    setAdmin(true);
    setIsLoading(false);
    // const email = formData.get("email");
    // const password = formData.get("password");
    // console.log(email, password);
  }
  return (
    <Backdrop>
      <div className={styles.adminLogin}>
        <form
          className={styles.adminLoginForm}
          onSubmit={handleAdminLogin}
          encType="application/json"
        >
          <div className={styles.title}>
            <img src="/admin.png" alt="admin" />
            <h3>Admin Login</h3>
          </div>
          <TextInput
            label={"Email"}
            type="email"
            name="email"
            placeholder="Enter Your Admin Email Id"
          />
          <TextInput
            name="password"
            label={"Password"}
            type="password"
            placeholder="Enter Your Secure Password"
          />
          <Button isLoading={isLoading}>Login</Button>
        </form>
      </div>
    </Backdrop>
  );
}
