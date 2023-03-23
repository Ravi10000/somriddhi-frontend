import styles from "./faq-card.module.scss";

import React, { useState } from "react";

export default function FaqCard({ query, deleteFaqHandler }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className={styles["query"]}>
      <div className={styles["head"]}>
        <h3 className={styles["query-title"]}>{query?.question}</h3>
        {isDeleting ? (
          <div className={styles["delete-loader"]}></div>
        ) : (
          <img
            src="/delete.png"
            alt="delete deal"
            onClick={() => {
              deleteFaqHandler(query?._id, setIsDeleting);
            }}
          />
        )}
      </div>
      <p className={styles["query-desc"]}>{query?.answer}</p>
    </div>
  );
}
