import "./add-category-popup.styles.scss";

import React, { useRef, useEffect, useState } from "react";
import Backdrop from "../backdrop/backdrop";
import { getAllCategories, createNewCategory } from "../../api";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";

export default function AddCategoryPopup({ setShowPopup, fetchCategories }) {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getAllCategories();
      console.log({ response });
      setCategories(response.data.data);
    })();
  }, []);
  async function submitAddCategoryForm(e) {
    console.log("submit");
    e.preventDefault();
    const formData = new FormData(e.target);
    // for (let key of formData.entries()) {
    //   console.log(key);
    // }
    try {
      const response = await createNewCategory(formData);
      if ((response.data.status = "success")) {
        fetchCategories();
        setShowPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log({ response });
  }

  // const imgInputRef = useRef(null);
  return (
    <Backdrop>
      <div className="add-category-popup">
        <PopupHead title="Add New Category" setShowPopup={setShowPopup} />
        <form encType="multipart/form-data" onSubmit={submitAddCategoryForm}>
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter Category Name"
          />
          <LongTextInput
            label="Description"
            name="description"
            placeholder="Enter Category Description"
          />
          <ImageInput label="Icon" name="categoryPhoto" />
          {/* <div className="select-icons">
            <p>OR</p>
            <div className="icon-list">
              {categories.map(({ name, icon }) => (
                <div className="icon" key={name}>
                  <img src={`http://localhost:8001/${icon}`} alt="icon" />
                </div>
              ))}
            </div>
          </div> */}
          <button className="add-category-btn">Add Category</button>
        </form>
      </div>
    </Backdrop>
  );
}
