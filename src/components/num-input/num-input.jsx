import styles from "./num-input.module.scss";
import React, { useId } from "react";

export default function NumInput({ label, error, register, ...otherProps }) {
  const id = useId();
  return (
    <div className={styles.inputContainer}>
      <div className={styles["num-input-container"]}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          required
          id={id}
          className={styles["num-input"]}
          inputMode="numeric"
          {...register}
          onInput={(e) =>
            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
          }
          {...otherProps}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
