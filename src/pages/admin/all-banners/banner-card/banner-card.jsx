import styles from "./banner-card.module.scss";
import React, { useState } from "react";

export default function BannerCard({
  banner,
  deleteBannerHandler,
  setBannerToEdit,
  setShowPopup,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className={styles["banner-card"]}>
      <img
        className={styles["banner-img"]}
        src={`${import.meta.env.VITE_REACT_APP_API_URL}/${banner?.image}`}
        alt={banner?.name}
      />
      <div className={styles["banner-details"]}>
        <div className={styles["info-container"]}>
          <div className={styles["banner-info"]}>
            <h5 className={styles["name"]}>{banner?.name}</h5>
            {/* <div className="info expiry-date">
            <img src="/date.png" alt="date" />
            <p>{expiryDate ? expiryDate : "unavailable"}</p>
          </div> */}
            <a href={banner?.url} target="_blank" rel="noopener noreferrer">
              <div className={styles["info"] + " " + styles["banner-link"]}>
                <img src="/link.png" alt="banner link" />
                <p>{banner?.url}</p>
              </div>
            </a>
          </div>
          <div className={styles["actions"]}>
            <img
              src="/edit.png"
              alt="edit banner"
              onClick={() => {
                window.scrollTo(0, 0);
                setBannerToEdit(banner);
                setShowPopup(true);
              }}
            />
            {isDeleting ? (
              <div className={styles["delete-loader"]}></div>
            ) : (
              <img
                className={styles["delete-icon"]}
                src="/delete.png"
                alt="locked"
                onClick={() => {
                  deleteBannerHandler(banner?._id, setIsDeleting);
                }}
              />
            )}
          </div>
          {/* <img src="/delete.png" alt="" /> */}
        </div>
        <div className={styles["banner-desc"]}>{banner?.description}</div>
      </div>
    </div>
  );
}
