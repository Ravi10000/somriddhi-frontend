import "./add-faq-popup.styles.scss";

// components
import Backdrop from "../backdrop/backdrop";

//api requests
import { addNewFaq } from "../../api/index";
import { connect } from "react-redux";

import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import { setFlash } from "../../redux/flash/flash.actions";

function AddFaqPopup({ setShowPopup, fetchFaqs, setFlash }) {
  const faqFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("fomr");
    try {
      const response = await addNewFaq(formData);
      setShowPopup(false);
      setFlash({ type: "success", message: "FAQ added successfully" });
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
const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddFaqPopup);
