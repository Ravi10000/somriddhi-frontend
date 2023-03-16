import "./backdrop.styles.scss";

import React from "react";

export default function Backdrop({ children }) {
  return <div className="popup-backdrop">{children}</div>;
}
