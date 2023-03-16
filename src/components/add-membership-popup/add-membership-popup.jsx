import "./add-membership-popup.styles.scss";

import React from "react";
import Backdrop from "../backdrop/backdrop";

export default function AddMembershipPopup({ setShowPopup }) {
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
        <form action="">
          <div className="upload-membership-img">
            <label className="label">Upload Photo</label>
            <div className="upload-input">
              <img src="/upload-gray.png" alt="upload image" />
              <input
                className="file-input"
                type="file"
                accept="image/png, image/jpeg"
                // onChange={(e) => saveFile(e)}
                // className="fileFieldText"
                name="file"
                // placeholder="Upload Image"
              />
            </div>
          </div>
          <div className="membership-name input-container">
            <label htmlFor="">Name</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Enter Membership Name"
            />
          </div>
          <div className="description input-container">
            <label htmlFor="">Description</label>
            <textarea
              className="text-input"
              name=""
              id=""
              cols="30"
              rows="10"
              defaultValue="Offer Description"
            ></textarea>
          </div>
          <div className="membership-cashback input-container">
            <label htmlFor="">Cashback Percentage</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Enter Cashback Percentage"
            />
          </div>
          <div className="membership-url input-container">
            <label htmlFor="">URL</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Paster banner URL"
            />
          </div>

          <button className="add-membership-btn">Add membership</button>
        </form>
      </div>
    </Backdrop>
  );
}
