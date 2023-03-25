import styles from "./deal-card.module.scss";

import React, { useState } from "react";

export default function DealCard({
  deal,
  deleteDealHandler,
  setShowAddDealPopup,
  setDealToUpdate,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className={styles["deal"]}>
      <img
        className={styles["deal-img"]}
        src={`${import.meta.env.VITE_REACT_APP_API_URL}/${deal?.image}`}
        alt="deal banner"
      />
      <div className={styles["deal-info"]}>
        <p>{deal?.description ? deal?.description : "unavailable"}</p>
        <div className={styles["icons"]}>
          <img
            src="/edit.png"
            alt="edit deal"
            onClick={() => {
              window.scrollTo(0, 0);
              setDealToUpdate(deal);
              setShowAddDealPopup(true);
            }}
          />
          {isDeleting ? (
            <div className={styles["delete-loader"]}></div>
          ) : (
            <img
              src="/delete.png"
              alt="delete deal"
              onClick={() => {
                deleteDealHandler(deal?._id, setIsDeleting);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
