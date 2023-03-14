import "./button.styles.scss";
import React from "react";
export default function Button({
  children,
  disabled,
  isLoading,
  ...otherProps
}) {
  return (
    <button
      className={`${disabled && "disabled"}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
      {isLoading && <div className="loader"></div>}
    </button>
  );
}
