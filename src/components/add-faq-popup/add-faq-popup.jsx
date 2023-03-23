import "./add-faq-popup.styles.scss";

// components
import Backdrop from "../backdrop/backdrop";

//api requests
import { addNewFaq } from "../../api/index";

import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";

export default function AddFaqPopup({ setShowPopup, fetchFaqs }) {
  const faqFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("fomr");
    try {
      const response = await addNewFaq(formData);
      setShowPopup(false);
      fetchFaqs();
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Backdrop>
      <div className="add-faq-popup">
        <PopupHead title="Add New FAQ" setShowPopup={setShowPopup} />
        <form onSubmit={faqFormSubmit} name="faq-form">
          <TextInput
            label="Question"
            name="question"
            placeholder="Enter Question"
          />
          <LongTextInput
            label="Answer"
            name="answer"
            placeholder="Enter Answers"
          />
          <button className="add-faq-btn">Save</button>
        </form>
      </div>
    </Backdrop>
  );
}
