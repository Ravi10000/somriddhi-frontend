import styles from "./faq.module.scss";

import React, { useState } from "react";

export default function Faq({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.faq}>
      <div
        className={styles["question"] + " " + (isOpen && styles["active"])}
        onClick={() => {
          setIsOpen((preState) => !preState);
        }}
      >
        <p>{faq.question}</p>
        <img
          className={styles[`arrow`]}
          src={!isOpen ? "/arrow-right.png" : "/arrow-active.png"}
          alt="ask question"
        />
      </div>
      {isOpen && (
        <div className={styles["answer"]}>
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}
