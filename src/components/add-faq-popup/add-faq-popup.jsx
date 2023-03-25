import "./add-faq-popup.styles.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";

//api requests
import { addNewFaq, editFaq } from "../../api/index";

// components
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";
import Button from "../button/button";

function AddFaqPopup({
  setShowPopup,
  fetchFaqs,
  setFlash,
  faqToEdit,
  setFaqToEdit,
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setFaqToEdit(null);
    };
  }, []);

  const faqFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    console.log("fomr");
    try {
      if (!faqToEdit) {
        const response = await addNewFaq(formData);
        console.log({ response });
        if (response.data.status === "success") {
          setFlash({ type: "success", message: "FAQ added successfully" });
          fetchFaqs();
        }
      } else {
        formData.append("_id", faqToEdit._id);
        const response = await editFaq(formData);
        console.log({ response });
        if (response.data.status === "success") {
          setFlash({ type: "success", message: "FAQ updated successfully" });
          fetchFaqs();
        }
      }
      setIsLoading(false);
      setShowPopup(false);
    } catch (error) {
      setIsLoading(false);
      setShowPopup(false);
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
      console.log(error);
    }
  };

  return (
    <Backdrop>
      <div className="add-faq-popup">
        <PopupHead
          title={faqToEdit ? "Edit FAQ" : "Add New FAQ"}
          setShowPopup={setShowPopup}
        />
        <form onSubmit={faqFormSubmit} name="faq-form">
          <TextInput
            label="Question"
            name="question"
            placeholder="Enter Question"
            defaultValue={faqToEdit?.question}
          />
          <LongTextInput
            label="Answer"
            name="answer"
            placeholder="Enter Answers"
            defaultValue={faqToEdit?.answer}
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

export default connect(null, mapDispatchToProps)(AddFaqPopup);
