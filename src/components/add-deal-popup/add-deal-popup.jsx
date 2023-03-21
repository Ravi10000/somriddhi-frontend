import "./add-deal-popup.styles.scss";

import React, { useState, useEffect, useId } from "react";
// components
import Backdrop from "../backdrop/backdrop";

// utils
import { createNewDeal, getAllCategories, updateDeal } from "../../api/";
import CustomSelect from "../custom-select/custom-select";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import NumInput from "../num-input/num-input";
import PopupHead from "../popup-head/popup-head";

export default function AddDealPopup({
  setShowPopup,
  fetchDeals,
  dealToUpdate,
}) {
  console.log({ dealToUpdate });
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
    formData.append("_id", dealToUpdate._id);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
    try {
      if (!dealToUpdate) {
        const response = await createNewDeal(formData);
        console.log({ response });
      } else {
        const response = await updateDeal(formData);
        console.log({ response });
      }
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
        <form encType="multipart/form-data" onSubmit={submitAddDealForm}>
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter Banner Name"
            defaultValue={dealToUpdate?.name || ""}
          />
          <TextInput
            label="URL"
            name="url"
            placeholder="Paster banner Url"
            defaultValue={dealToUpdate?.url || ""}
          />
          <NumInput
            label="Cashback"
            name="cashbackPercent"
            placeholder="Cashback"
            maxLength="2"
            defaultValue={dealToUpdate?.cashbackPercent || ""}
          />
          <LongTextInput
            label="Description"
            name="description"
            placeholder="Enter deal description"
            defaultValue={dealToUpdate?.description || ""}
          />
          <CustomSelect
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            defaultValue={dealToUpdate?.categoryId || ""}
          />

          <ImageInput
            label="Deal Image"
            name="dealPhoto"
            defaultValue={dealToUpdate?.image || ""}
          />
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
