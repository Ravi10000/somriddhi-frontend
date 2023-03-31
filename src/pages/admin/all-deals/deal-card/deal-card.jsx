import styles from "./deal-card.module.scss";

// packages
import { useNavigate } from "react-router-dom";

// react hooks
import { useState } from "react";

export default function DealCard({
  deal,
  deleteDealHandler,
  setShowAddDealPopup,
  setDealToUpdate,
}) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div
      className={styles["deal"]}
      onClick={() => {
        navigate(`/coupon/${deal?._id}`);
      }}
    >
      <img
        className={styles["deal-img"]}
        src={`${import.meta.env.VITE_REACT_APP_API_URL}/${deal?.image}`}
        alt="deal banner"
        onError={(e) => {
          e && (e.target.src = "/image-broke.png");
        }}
      />
      <div className={styles["deal-info"]}>
        <p>{deal?.description ? deal?.description : "unavailable"}</p>
        <div className={styles["icons"]}>
          <img
            src="/edit.png"
            alt="edit deal"
            onClick={(e) => {
              e.stopPropagation();
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
              onClick={(e) => {
                e.stopPropagation();
                deleteDealHandler(deal?._id, setIsDeleting);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
