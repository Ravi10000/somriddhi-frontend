import "./add-faq-popup.styles.scss";
// components
import Backdrop from "../backdrop/backdrop";

import { useForm } from "react-hook-form";

export default function AddFaqPopup({ setShowPopup }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function submitForm(data) {
    console.log({ data });
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
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="faq-name input-container">
            <label htmlFor="">Question</label>
            <input
              className="text-input"
              placeholder="Enter Question"
              {...register("question", {
                required: "question is required",
              })}
            />
            {errors.answer && <p className="error">{errors.answer.message}</p>}
          </div>
          <div className="answer input-container">
            <label htmlFor="">Write Relevent Answer</label>
            <p className="textarea-msg">Write Answer</p>
            <textarea
              className="text-input"
              {...register("answer", {
                required: "answer is required",
              })}
            ></textarea>
            {errors.answer && <p className="error">{errors.answer.message}</p>}
          </div>

          <button className="add-faq-btn">Save</button>
        </form>
      </div>
    </Backdrop>
  );
}
