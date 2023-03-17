import "./add-faq-popup.styles.scss";

import { useRef } from "react";

// components
import Backdrop from "../backdrop/backdrop";

//api requests
import { addNewFaq } from "../../api/index";

export default function AddFaqPopup({ setShowPopup }) {
  const formRef = useRef(null);

  async function submitForm() {
    e.preventDeault();
    const formData = new FormData(formRef.current);
    const question = formData.get("question");
    const answer = formData.get("answer");
    console.log({ question, answer });
    const response = await addNewFaq({ question, answer });
    console.log({ response });
  }

  return (
    <Backdrop>
      <div className="add-faq-popup">
        <div className="head">
          <div className="head-left">
            <img
              src="/arrow-left-primary.png"
              alt="go back"
              onClick={() => {
                setShowPopup(false);
              }}
            />
            <h3>Add FAQ</h3>
          </div>
          <button
            className="close-popup"
            onClick={() => {
              setShowPopup(false);
            }}
          >
            <img src="/close.png" alt="close popup" />
          </button>
        </div>
        <form onSubmit={submitForm} ref={formRef}>
          <div className="faq-name input-container">
            <label>Question</label>
            <input
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              required
              className="text-input"
              placeholder="Enter Question"
              name="question"
            />
          </div>
          <div className="answer input-container">
            <label>Write Relevent Answer</label>
            <p className="textarea-msg">Write Answer</p>
            <textarea
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              required
              className="text-input"
              name="answer"
            ></textarea>
          </div>

          <button className="add-faq-btn">Save</button>
        </form>
      </div>
    </Backdrop>
  );
}
