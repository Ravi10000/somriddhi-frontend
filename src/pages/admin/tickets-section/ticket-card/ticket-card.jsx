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
      <div className={styles["replies-container"]}>
        {ticket?.replies?.length > 0 && <h4>Replies</h4>}
        {ticket?.replies?.length > 0 ? (
          <div className={styles["replies"]}>
            {ticket?.replies.map((reply, index) => (
              <p key={index}>{reply}</p>
            ))}
          </div>
        ) : (
          <p className={styles["not-replied"]}>
            No replies sent for this ticket
          </p>
        )}
      </div>
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
          <button
            className={styles["not-resolved-btn"]}
            onClick={() => {
              handleUpdateTicketStatus(ticket?._id, "Active");
            }}
          >
            set to not resolved
          </button>
        </div>
      )}
    </div>
  );
}
