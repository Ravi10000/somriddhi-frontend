import styles from "./text-input.module.scss";

import React, { useId } from "react";

export default function TextInput({
  style,
  inputStyle,
  label,
  error,
  register,
  ...otherProps
}) {
  const id = useId();
  return (
    <div className={styles["input-container"]} style={style}>
      <div className={styles.input}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          style={inputStyle}
          id={id}
          className={styles["text-input"]}
          {...register}
          required
          {...otherProps}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
