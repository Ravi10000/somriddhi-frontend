import "./add-deal-popup.styles.scss";

import React, { useState, useEffect, useId } from "react";
// components
import Backdrop from "../backdrop/backdrop";

// utils
import { createNewDeal, getAllCategories } from "../../api/";
import CustomSelect from "../custom-select/custom-select";

export default function AddDealPopup({ setShowPopup, fetchDeals }) {
  const id = useId();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getAllCategories();
      console.log({ response });
      setCategories(response.data.data);
    })();
  }, []);

  async function submitAddDealForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("categoryId", selectedCategory._id);
    // for (let entry of formData.entries()) {
    //   console.log(entry);
    // }
    try {
      const response = await createNewDeal(formData);
      console.log({ response });
      setShowPopup(false);
      fetchDeals();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className="add-deal-popup">
        <div className="head">
          <div className="head-left">
            <img src="/arrow-left-primary.png" alt="go back" />
            <h3>Add Deal</h3>
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
        <form encType="multipart/form-data" onSubmit={submitAddDealForm}>
          <div className="deal-name input-container">
            <label htmlFor={`${id}-name`}>Name</label>
            <input
              id={`${id}-name`}
              name="name"
              className="text-input"
              placeholder="Enter Banner Name"
            />
          </div>
          <div className="description input-container">
            <label htmlFor={`${id}-description`}>Description</label>
            <p className="textarea-msg">Enter Deal Description</p>
            <textarea
              name="description"
              id={`${id}-description`}
              className="text-input"
            ></textarea>
          </div>
          <div className="deal-url input-container">
            <label htmlFor={`${id}-url`}>URL</label>
            <input
              id={`${id}-url`}
              name="url"
              className="text-input"
              placeholder="Paster banner URL"
            />
          </div>
          <div className="deal-cashback input-container">
            <label htmlFor={`${id}-cashback`}>Cashback Percentage</label>
            <input
              id={`${id}-cashback`}
              inputMode="numeric"
              maxLength={2}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              name="cashbackPercent"
              className="text-input"
              placeholder="Cashback"
            />
          </div>
          <div className="input-container">
            <CustomSelect
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="upload-deal-img">
            <label className="label" htmlFor={`${id}-dealPhoto`}>
              Banner Image
            </label>
            <div className="upload-input">
              <img src={image || "/upload-gray.png"} alt="upload image" />
              {!image && <p>Upload Image</p>}
              <input
                id={`${id}-dealPhoto`}
                className="file-input"
                name="dealPhoto"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setImage(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
          </div>
          <div className="dates">
            <div className="live-date date-input">
              <label htmlFor={`${id}-liveDate`}>Live Date</label>
              <input id={`${id}-liveDate`} name="liveDate" type="date" />
            </div>
            <div className="expiry-date date-input">
              <label htmlFor={`${id}-expiryDate`}>Expiry Date</label>
              <input id={`${id}-expiryDate`} name="expiryDate" type="date" />
            </div>
          </div>
          <button className="add-deal-btn">Add Deal</button>
        </form>
      </div>
    </Backdrop>
  );
}
