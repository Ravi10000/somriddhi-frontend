import "./add-membership-popup.styles.scss";
// react hooks
import { useState, useEffect } from "react";

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

function AddMembershipPopup({
  setShowPopup,
  fetchMemberships,
  setFlash,
  setMembersipToEdit,
  membersipToEdit,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      setMembersipToEdit(null);
    };
  }, []);

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
        <PopupHead
          title={membersipToEdit ? "Update Membership" : "Add Membership"}
          setShowPopup={setShowPopup}
        />
        <form
          name="membership-form"
          onSubmit={submitMembershipForm}
          encType="multipart/form-data"
        >
          <ImageInput
            label="Membership Image"
            name="membershipPhoto"
            defaultValue={membersipToEdit?.image}
          />
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter Membership Name"
            defaultValue={membersipToEdit?.name}
          />
          <LongTextInput
            label="Description"
            name="description"
            placeholder="Enter deal description"
            defaultValue={membersipToEdit?.description}
          />
          <NumInput
            label="Cashback Percentage"
            name="cashbackPercent"
            placeholder="Cashback"
            maxLength="2"
            defaultValue={membersipToEdit?.cashbackPercent}
          />
          <TextInput
            label="URL"
            name="url"
            placeholder="Paste URL"
            defaultValue={membersipToEdit?.url}
          />

          <Button isLoading={isLoading}>
            {membersipToEdit ? "Update Membership" : "Add Membership"}
          </Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(AddMembershipPopup);
