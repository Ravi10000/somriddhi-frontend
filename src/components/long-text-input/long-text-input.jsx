import styles from "./long-text-input.module.scss";
import React, { useId } from "react";

export default function LongTextInput({ label, placeholder, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles["long-text-input"]}>
      <label htmlFor={id}>Description</label>
      <p className={styles["textarea-msg"]}>{placeholder}</p>
      <textarea
        required
        id={id}
        className={styles["text-input"]}
        {...otherProps}
      ></textarea>
    </div>
  );
}
