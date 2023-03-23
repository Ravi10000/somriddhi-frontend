import styles from "./add-reply-popup.module.scss";

import React, { useEffect } from "react";
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
// import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import { replyToTicket } from "../../api/index";

export default function AddReplyPopup({
  setShowPopup,
  ticketToReply,
  setTicketToReply,
}) {
  useEffect(() => {
    return () => {
      setTicketToReply(null);
    };
  }, []);
  async function handleReply(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("id", ticketId);
    try {
      const response = await replyToTicket(formData);
      console.log({ response });
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className={styles.addReplyPopup}>
        <PopupHead title="Reply to ticket" setShowPopup={setShowPopup} />
        <h5>{ticketToReply?.heading}</h5>
        <form onSubmit={handleReply}>
          <LongTextInput
            label="Reply"
            name="replies"
            placeholder="Enter your reply here"
          />
          <button className={styles["add-reply-btn"]}>Save</button>
        </form>
      </div>
    </Backdrop>
  );
}
