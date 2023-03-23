import "./add-ticket-popup.styles.scss";

// components
import Backdrop from "../backdrop/backdrop";

//api requests
import { addNewTicket } from "../../api/index";

import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function AddTicketPopup({ setShowPopup, setShowSuccessMsg, setFlash }) {
  async function submitTicket(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("status", "Active");
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await addNewTicket(formData);
      console.log({ response });
      if (response.data.status === "success") {
        setShowPopup(false);
        setFlash({ type: "success", message: "Ticket added successfully" });
        // setShowSuccessMsg(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className="add-ticket-popup">
        <PopupHead title="Add New Ticket" setShowPopup={setShowPopup} />
        <form onSubmit={submitTicket} encType="application/json">
          <TextInput
            label="Query"
            name="heading"
            placeholder="Enter your query"
          />
          <LongTextInput
            label="Description"
            name="description"
            placeholder="Describe your problem"
          />
          <button className="add-ticket-btn">Save</button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddTicketPopup);
