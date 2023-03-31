import styles from "./membership-card.module.scss";

import React, { useState } from "react";

export default function MembershipCard({
  membership,
  setMembersipToEdit,
  setShowPopup,
  deleteMembershipHandler,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className={styles["membership-card"]}>
      <img
        className={styles["membership-img"]}
        src={`${import.meta.env.VITE_REACT_APP_API_URL}/${membership?.image}`}
        onError={(e) => {
          e && (e.target.src = "/image-broke.png");
        }}
      />
      <div className={styles["membership-details"]}>
        <div className={styles["info-container"]}>
          <div className={styles["membership-info"]}>
            <h5 className={styles["name"]}>{membership?.name}</h5>
            <div className={styles["info"] + " " + styles["expiry-date"]}>
              <img src="/percentage.png" alt="percentage" />
              <p>Cashback : {membership?.cashbackPercent}%</p>
            </div>
            <div className={styles.info + " " + styles["membership-link"]}>
              <img src="/link.png" alt="membership link" />
              <p>{membership?.url}</p>
            </div>
          </div>
          <div className={styles["actions"]}>
            <img
              src="/edit.png"
              alt="edit banner"
              onClick={() => {
                window.scrollTo(0, 0);
                setMembersipToEdit(membership);
                setShowPopup(true);
              }}
            />
            {isDeleting ? (
              <div className={styles["delete-loader"]}></div>
            ) : (
              <img
                className={styles["delete-icon"]}
                src="/delete.png"
                alt="delete membership"
                onClick={() => {
                  deleteMembershipHandler(membership?._id, setIsDeleting);
                }}
              />
            )}
          </div>
          {/* {isDeleting ? (
            <div className={styles["delete-loader"]}></div>
          ) : (
            <img
              onClick={() => {
                deleteMembershipHandler(membership?._id, setIsDeleting);
              }}
              className={styles["delete-icon"]}
              src="/delete.png"
              alt="delete membership"
            />
          )} */}
        </div>
        <div className={styles["membership-desc"]}>
          {membership?.description}
        </div>
      </div>
    </div>
  );
}
