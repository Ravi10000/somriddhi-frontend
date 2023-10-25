import "./backdrop.styles.scss";

import React, { useEffect, useRef } from "react";

export default function Backdrop({ children, close }) {
  const backdropRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    backdropRef.current.style.overflowY = "scroll";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="popup-backdrop"
      ref={backdropRef}
      onClick={() => {
        if (close) close();
      }}
    >
      {children}
    </div>
  );
}
