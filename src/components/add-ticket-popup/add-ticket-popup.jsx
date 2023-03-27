import "./add-ticket-popup.styles.scss";
// react hooks
import { useState } from "react";

// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";

//api calls
import { addNewTicket } from "../../api/index";

// components
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";
import Button from "../button/button";

function AddTicketPopup({
  setShowPopup,
  setShowSuccessMsg,
  setFlash,
  fetchTickets,
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function submitTicket(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append("status", "Active");
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await addNewTicket(formData);
      console.log({ response });
      if (response.data.status === "success") {
        setFlash({ type: "success", message: "Ticket added successfully" });
        fetchTickets();
      }
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
      console.log(error);
    } finally {
      setShowPopup(false);
      setIsLoading(false);
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
          <Button isLoading={isLoading}>Save</Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AddTicketPopup);
