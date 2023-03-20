import "./add-faq-popup.styles.scss";

import { useRef } from "react";

// components
import Backdrop from "../backdrop/backdrop";

//api requests
import { addNewFaq } from "../../api/index";

export default function AddFaqPopup({ setShowPopup }) {
  const formRef = useRef(null);

  const faqFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("fomr");
    try {
      const response = await addNewFaq(formData);
      setShowPopup(false);
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={faqFormSubmit} name="faq-form">
          <div className="faq-name input-container">
            <label>Question</label>
            <input
              required
              className="text-input"
              placeholder="Enter Question"
              name="question"
            />
          </div>
          <div className="answer input-container">
            <label>Write Relevent Answer</label>
            <p className="textarea-msg">Write Answer</p>
            <textarea required className="text-input" name="answer"></textarea>
          </div>

          <button className="add-faq-btn">Save</button>
        </form>
      </div>
    </Backdrop>
  );
}
