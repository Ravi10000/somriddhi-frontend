import styles from "./feedback-card.module.scss";

import React, { useState } from "react";

export default function FeedbackCard({
  feedback,
  deleteThisFeedback,
  handleUpdateStatus,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStatusChanging, setIsStatusChanging] = useState(false);

  const date = new Date(feedback?.createdAt).toDateString();
  return (
    <div className={styles["feedback-card"]}>
      <img
        className={styles["userimg"]}
        src={feedback?.userImg || "/person.png"}
        alt="user image"
      />
      <div className={styles["details"]}>
        <div className={styles["user"]}>
          <div className={styles["user-info"]}>
            <h4>{feedback?.username}</h4>
            <p>{date}</p>
          </div>
          <div className={styles["actions"]}>
            <button
              className={styles["delete"]}
              onClick={() => {
                deleteThisFeedback(feedback?._id, setIsDeleting);
              }}
            >
              {isDeleting ? (
                <div className={styles["delete-loader"]}></div>
              ) : (
                <img src="/delete.png" alt="" />
              )}
            </button>
            {feedback?.status === "Active" ? (
              <button
                className={styles["delete"]}
                onClick={() => {
                  handleUpdateStatus(
                    feedback?._id,
                    "Inactive",
                    setIsStatusChanging
                  );
                }}
              >
                {isStatusChanging ? (
                  <div className={styles["status-loader"]}></div>
                ) : (
                  <img src="/close.png" alt="" />
                )}
              </button>
            ) : (
              <button
                className={styles["check"]}
                onClick={() => {
                  handleUpdateStatus(
                    feedback?._id,
                    "Active",
                    setIsStatusChanging
                  );
                }}
              >
                {isStatusChanging ? (
                  <div className={styles["status-loader"]}></div>
                ) : (
                  <img src="/check.png" alt="" />
                )}
              </button>
            )}
          </div>
        </div>
        <div className={styles["feedback-details"]}>
          <div className={styles["rating"]}>
            {Array(5)
              .fill()
              .map((_, index) => (
                <img
                  key={index}
                  src={
                    feedback?.starRating - 1 >= index
                      ? "/star.png"
                      : "/blank-star.png"
                  }
                  alt="star"
                />
              ))}
          </div>
          <p className={styles["feedback-text"]}>{feedback?.feedbackText}</p>
        </div>
      </div>
    </div>
  );
}
