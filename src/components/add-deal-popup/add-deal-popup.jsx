import "./add-deal-popup.styles.scss";

import React, { useState, useEffect, useId } from "react";
// components
import Backdrop from "../backdrop/backdrop";

// utils
import { createNewDeal, getAllCategories } from "../../api/";
import CustomSelect from "../custom-select/custom-select";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import NumInput from "../num-input/num-input";
import PopupHead from "../popup-head/popup-head";

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
        <PopupHead title="Add New Deal" setShowPopup={setShowPopup} />
        {/* <div className="head">
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
        </div> */}
        <form encType="multipart/form-data" onSubmit={submitAddDealForm}>
          <TextInput label="Name" name="name" placeholder="Enter Banner Name" />
          <TextInput label="URL" name="url" placeholder="Paster banner Url" />
          <NumInput
            label="Cashback"
            name="cashbackPercent"
            placeholder="Cashback"
            maxLength="2"
          />
          <LongTextInput
            label="Description"
            name="description"
            placeholder="Enter deal description"
          />
          <CustomSelect
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <ImageInput label="Deal Image" name="dealPhoto" />
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
