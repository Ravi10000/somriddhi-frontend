import "./add-membership-popup.styles.scss";
// react hooks
import { useRef, useState } from "react";

// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import NumInput from "../num-input/num-input";

// api calls
import { createNewMemberships } from "../../api";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";
import Button from "../button/button";

function AddMembershipPopup({ setShowPopup, fetchMemberships, setFlash }) {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  async function submitMembershipForm(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    for (let key of formData.entries()) {
      console.log(key);
    }
    try {
      const response = await createNewMemberships(formData);
      console.log({ response });
      if (response.data.status === "success") {
        setFlash({
          message: "Membership added successfully",
          type: "success",
        });
        fetchMemberships();
      }
      setIsLoading(false);
      setShowPopup(false);
    } catch (error) {
      setFlash({
        message: "Something went wrong, please try again",
        type: "error",
      });
      console.log(error);
    }
  }
  return (
    <Backdrop>
      <div className="add-membership-popup">
        <PopupHead title="Add Membership" setShowPopup={setShowPopup} />
        <form
          name="membership-form"
          ref={formRef}
          onSubmit={submitMembershipForm}
          encType="multipart/form-data"
        >
          <ImageInput label="Membership Image" name="membershipPhoto" />
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter Membership Name"
          />
          <LongTextInput
            label="Description"
            name="description"
            placeholder="Enter deal description"
          />
          <NumInput
            label="Cashback Percentage"
            name="cashbackPercent"
            placeholder="Cashback"
            maxLength="2"
          />
          <TextInput label="URL" name="url" placeholder="Paste URL" />

          <Button isLoading={isLoading}>Add membership</Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(AddMembershipPopup);
