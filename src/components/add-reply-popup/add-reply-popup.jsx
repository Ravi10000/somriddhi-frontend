import styles from "./add-reply-popup.module.scss";

// react hooks
import { useEffect, useState } from "react";

// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import LongTextInput from "../long-text-input/long-text-input";

// api calls
import { replyToTicket } from "../../api/index";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";
import Button from "../button/button";

function AddReplyPopup({
  setShowPopup,
  ticketToReply,
  setTicketToReply,
  setFlash,
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setTicketToReply(null);
    };
  }, []);

  async function handleReply(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append("id", ticketToReply?._id);
    try {
      const response = await replyToTicket(formData);
      console.log({ response });
      response.data.status === "success" &&
        setFlash({
          type: "success",
          message: "Reply added successfully",
        });
      setIsLoading(false);
      setShowPopup(false);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
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
          <Button isLoading={isLoading}>Save</Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddReplyPopup);
