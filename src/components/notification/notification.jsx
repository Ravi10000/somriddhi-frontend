import styles from "./notification.module.scss";
import React, { useEffect, useRef } from "react";

export default function Notification({ setIsNotificationOpen }) {
  const notificationRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    notificationRef.current.style.overflowY = "scroll";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.notification} ref={notificationRef}>
      <div className={styles.title}>
        <h1>Notifications</h1>
        <button
          className={styles.closeBtn}
          onClick={() => {
            setIsNotificationOpen(false);
          }}
        >
          <img src="/close-red.png" alt="" />
        </button>
      </div>
    </div>
  );
}
