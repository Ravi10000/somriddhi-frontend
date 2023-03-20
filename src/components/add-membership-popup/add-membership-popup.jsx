import "./add-membership-popup.styles.scss";

import React, { useRef, useState } from "react";
import Backdrop from "../backdrop/backdrop";
import { createNewMemberships } from "../../api";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import NumInput from "../num-input/num-input";

export default function AddMembershipPopup({ setShowPopup, fetchMemberships }) {
  const formRef = useRef(null);
  const [image, setImage] = useState(null);

  async function submitMembershipForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (let key of formData.entries()) {
      console.log(key);
    }
    try {
      const response = await createNewMemberships(formData);
      console.log({ response });
      if (response.data.status === "success") {
        setShowPopup(false);
        fetchMemberships();
      }
    } catch (error) {
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

          <button className="add-membership-btn">Add membership</button>
        </form>
      </div>
    </Backdrop>
  );
}
