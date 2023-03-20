import "./backdrop.styles.scss";

// import React, { useEffect, useRef } from "react";

export default function Backdrop({ children }) {
  // const backdropRef = useRef(null);
  // useEffect(() => {
  //   console.log(backdropRef.current.clientHeight);
  //   document.body.style.height = backdropRef.current.clientHeight + "px";
  //   // document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "unset";
  //     document.body.style.height = "auto";
  //   };
  // }, []);

  return <div className="popup-backdrop">{children}</div>;
}
