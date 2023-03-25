import styles from "./faq-card.module.scss";

import React, { useState } from "react";

export default function FaqCard({
  query,
  deleteFaqHandler,
  setFaqToEdit,
  setShowPopup,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className={styles["query"]}>
      <div className={styles["head"]}>
        <h3 className={styles["query-title"]}>{query?.question}</h3>
        <div className={styles["actions"]}>
          <img
            src="/edit.png"
            alt="edit faq"
            onClick={() => {
              window.scrollTo(0, 0);
              setFaqToEdit(query);
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
                deleteFaqHandler(query?._id, setIsDeleting);
              }}
            />
          )}
        </div>
        {/* {isDeleting ? (
          <div className={styles["delete-loader"]}></div>
        ) : (
          <img
            src="/delete.png"
            alt="delete deal"
            onClick={() => {
              deleteFaqHandler(query?._id, setIsDeleting);
            }}
          />
        )} */}
      </div>
      <p className={styles["query-desc"]}>{query?.answer}</p>
    </div>
  );
}
