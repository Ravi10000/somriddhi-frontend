import styles from "./add-feedback-popup.module.scss";
import { useState } from "react";
import TextInput from "../text-input/text-input";
// packages
// components
import Backdrop from "../backdrop/backdrop";

// utils
import { createNewFeedback } from "../../api";
import LongTextInput from "../long-text-input/long-text-input";
import PopupHead from "../popup-head/popup-head";

export default function AddFeedbackPopup({ setShowPopup, fetchFeedbacks }) {
  const [rating, setRating] = useState(0);

  async function submitFeedback(e) {
    e.preventDefault();
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
        fetchFeedbacks();
        setShowPopup(false);
      }
    } catch (error) {
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
              {/* {Array(rating)
                .fill()
                .map((_, i) => (
                  <img src="/star.png" alt="rating" key={i} />
                ))} */}
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
          <button className={styles["add-feedback-btn"]}>Add Feedback</button>
        </form>
      </div>
    </Backdrop>
  );
}
