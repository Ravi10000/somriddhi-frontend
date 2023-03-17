import "./add-membership-popup.styles.scss";

import React, { useRef } from "react";
import Backdrop from "../backdrop/backdrop";
import { createNewMemberships } from "../../api";

export default function AddMembershipPopup({ setShowPopup }) {
  const formRef = useRef(null);
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Backdrop>
      <div className="add-membership-popup">
        <div className="head">
          <div className="head-left">
            <img src="/arrow-left-primary.png" alt="go back" />
            <h3>Add Membership</h3>
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
        <form
          name="membership-form"
          ref={formRef}
          onSubmit={submitMembershipForm}
          encType="multipart/form-data"
        >
          <div className="upload-membership-img">
            <label className="label">Upload Photo</label>
            <div className="upload-input">
              <img src="/upload-gray.png" alt="upload image" />
              <input
                className="file-input"
                type="file"
                accept="image/png, image/jpeg"
                name="membershipPhoto"
              />
            </div>
          </div>
          <div className="membership-name input-container">
            <label htmlFor="">Name</label>
            <input
              className="text-input"
              name="name"
              placeholder="Enter Membership Name"
            />
          </div>
          <div className="description input-container">
            <label htmlFor="">Description</label>
            <textarea
              className="text-input"
              name="description"
              id=""
              cols="30"
              rows="10"
              defaultValue="Offer Description"
            ></textarea>
          </div>
          <div className="membership-cashback input-container">
            <label htmlFor="">Cashback Percentage</label>
            <input
              name="cashbackPercent"
              className="text-input"
              placeholder="Enter Cashback Percentage"
            />
          </div>
          <div className="membership-url input-container">
            <label htmlFor="">URL</label>
            <input
              name="url"
              className="text-input"
              placeholder="Paster banner URL"
            />
          </div>

          <button className="add-membership-btn">Add membership</button>
        </form>
      </div>
    </Backdrop>
  );
}
