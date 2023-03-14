import "./button.styles.scss";
import React from "react";
export default function Button({ children, disabled, ...otherProps }) {
  return (
    <button
      className={`${disabled && "disabled"}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
}
