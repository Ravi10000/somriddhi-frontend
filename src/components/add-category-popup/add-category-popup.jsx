import "./add-category-popup.styles.scss";

import React from "react";
import Backdrop from "../backdrop/backdrop";

export default function AddCategoryPopup({ setShowPopup }) {
  return (
    <Backdrop>
      <div className="add-category-popup">
        <div className="head">
          <div className="head-left">
            <img src="/arrow-left-primary.png" alt="go back" />
            <h3>Add Category</h3>
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
          <div className="banner-name input-container">
            <label htmlFor="">Name</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Enter Category Name"
            />
          </div>
          <div className="upload-category-img">
            <label className="label">Icon</label>
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
          <div className="select-icons">
            <p>OR</p>
            <div className="icon-list">
              <div className="icon">
                <img src="/category-icons/education.png" alt="icon" />
              </div>
              <div className="icon">
                <img src="/category-icons/safety.png" alt="icon" />
              </div>
              <div className="icon">
                <img src="/category-icons/food.png" alt="icon" />
              </div>
              <div className="icon">
                <img src="/category-icons/sport.png" alt="icon" />
              </div>
              <div className="icon">
                <img src="/category-icons/cloth.png" alt="icon" />
              </div>
              {/* <div className="icon">
                <img src="/category-icons/safety.png" alt="icon" />
              </div> */}
            </div>
          </div>
          <button className="add-category-btn">Add Category</button>
        </form>
      </div>
    </Backdrop>
  );
}
