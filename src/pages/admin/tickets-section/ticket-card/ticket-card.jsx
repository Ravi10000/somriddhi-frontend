import styles from "./ticket-card.module.scss";

import React from "react";

export default function TicketCard({
  ticket,
  setTicketToReply,
  setShowPopup,
  handleUpdateTicketStatus,
}) {
  return (
    <div className={styles["ticket"]} key={ticket?._id}>
      <h5 className={styles["title"]}>{ticket?.heading}</h5>
      <p className={styles["desc"]}>{ticket?.description}</p>
      {ticket?.status === "Active" ? (
        <div className={styles["ticket-buttons"]}>
          <button
            className={styles["resolve-btn"]}
            onClick={() => {
              handleUpdateTicketStatus(ticket?._id, "Inactive");
            }}
          >
            resolve
          </button>
          <button
            className={styles["reply-btn"]}
            onClick={() => {
              window.scrollTo(0, 0);
              setTicketToReply(ticket);
              setShowPopup(true);
            }}
          >
            reply
          </button>
        </div>
      ) : (
        <div className={styles["resolved"]}>
          <p>resolved</p>
        </div>
      )}
    </div>
  );
}
