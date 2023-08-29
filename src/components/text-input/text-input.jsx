import styles from "./text-input.module.scss";

import React, { useId } from "react";

export default function TextInput({ label, error, register, ...otherProps }) {
  const id = useId();
  return (
    <div>
      <div className={styles["input-container"]}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          className={styles["text-input"]}
          {...register}
          required
          {...otherProps}
        />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
