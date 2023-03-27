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
      className={`button ${(disabled || isLoading) && "disabled"}`}
      disabled={disabled || isLoading}
      {...otherProps}
    >
      {children}
      {isLoading && <div className="loader"></div>}
    </button>
  );
}
