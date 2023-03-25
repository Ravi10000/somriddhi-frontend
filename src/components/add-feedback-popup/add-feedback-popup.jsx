import styles from "./add-feedback-popup.module.scss";

// react hooks
import { useState } from "react";

// packages
import { connect } from "react-redux";

// components
import Button from "../button/button";
import TextInput from "../text-input/text-input";
import Backdrop from "../backdrop/backdrop";
import LongTextInput from "../long-text-input/long-text-input";
import PopupHead from "../popup-head/popup-head";

// api calls
import { createNewFeedback } from "../../api";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";

function AddFeedbackPopup({ setShowPopup, fetchFeedbacks, setFlash }) {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function submitFeedback(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append("starRating", rating);
    formData.append("status", "Active");
    for (let key of formData.entries()) {
      console.log(key);
    }
    try {
      const response = await createNewFeedback(formData);
      console.log({ response });
      if (response.data.status === "success") {
        setFlash({
          type: "success",
          message: "Feedback Added Successfully",
        });
        fetchFeedbacks();
      }
      setIsLoading(false);
      setShowPopup(false);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something Went Wrong, Please Try Again",
      });
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className={styles["add-feedback-popup"]}>
        <PopupHead setShowPopup={setShowPopup} title="Add Feedback" />
        <form onSubmit={submitFeedback} encType="application/json">
          <TextInput
            label="Name"
            name="username"
            placeholder="Enter Your Name"
          />
          <div className={styles["rating-selector"]}>
            <label>Rate</label>
            <div className={styles["stars"]}>
              {Array(5)
                .fill()
                .map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <img
                      onClick={() => setRating(ratingValue)}
                      src={`${
                        rating < ratingValue ? "/blank-star.png" : "/star.png"
                      }`}
                      alt="rating"
                      key={i}
                    />
                  );
                })}
            </div>
          </div>
          <LongTextInput
            label="Feedback"
            name="feedbackText"
            placeholder="Enter Your Feedback"
          />
          <Button isLoading={isLoading}>Add Feedback</Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddFeedbackPopup);
