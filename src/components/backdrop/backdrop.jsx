import "./backdrop.styles.scss";

import React, { useEffect } from "react";

export default function Backdrop({ children }) {
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, []);

  return <div className="popup-backdrop">{children}</div>;
}
