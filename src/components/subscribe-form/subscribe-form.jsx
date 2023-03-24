import styles from "./subscribe-form.module.scss";

import React, { useState } from "react";
import Backdrop from "../backdrop/backdrop";
import Button from "../button/button";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  const subscribeToNewsLetter = async (e) => {
    e.preventDefault();
    let userName = email.split("@")[0];
    let addNewsletter = {
      name: userName,
      email: email,
      status: "Active",
    };
    const newletter = await createNewNewLetter(addNewsletter);
    console.log(newletter);
  };

  return (
    // <Backdrop>
    <form className={styles["subscribe-form"]}>
      <h4 className={styles["title"]}>
        Subscribe to our
        <br />
        Newsletter!
      </h4>
      <p className={styles["subtitle"]}>
        Be the first to get exclusive offers and the latest news
      </p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter your email address"
      />
      <Button onClick={subscribeToNewsLetter}>Subscribe</Button>
    </form>
    // </Backdrop>
  );
}
