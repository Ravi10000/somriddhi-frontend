import "./add-banner-popup.styles.scss";

import React from "react";
import Backdrop from "../backdrop/backdrop";

export default function AddBannerPopup({ setShowPopup }) {
  return (
    <Backdrop>
      <div className="add-banner-popup">
        <div className="head">
          <div className="head-left">
            <img src="/arrow-left-primary.png" alt="go back" />
            <h3>Add Banner</h3>
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
          <div className="upload-banner-img">
            <label className="label">Banner Image</label>
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
          <div className="banner-name input-container">
            <label htmlFor="">Name</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Enter Banner Name"
            />
          </div>
          <div className="url input-container">
            <label htmlFor="">URL</label>
            <input
              className="text text-input"
              // className="fileFieldTwo"
              // onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Banner url"
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
              defaultValue="Enter Banner Description"
            ></textarea>
          </div>
          <button className="add-banner-btn">Add Banner</button>
        </form>
      </div>
    </Backdrop>
  );
}
