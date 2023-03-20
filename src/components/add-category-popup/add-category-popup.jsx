import "./add-category-popup.styles.scss";

import React, { useRef, useEffect, useState } from "react";
import Backdrop from "../backdrop/backdrop";
import { getAllCategories, createNewCategory } from "../../api";

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
        <form encType="multipart/form-data" onSubmit={submitAddCategoryForm}>
          <div className="banner-name input-container">
            <label htmlFor="">Name</label>
            <input
              name="name"
              className="text-input"
              placeholder="Enter Category Name"
            />
          </div>

          <div className="description input-container">
            <label htmlFor="">Description</label>
            <p className="textarea-msg">Enter Category Description</p>
            <textarea name="description" className="text-input"></textarea>
          </div>
          <div className="upload-category-img">
            <label className="label">Icon</label>
            <div className="upload-input">
              <img src={image || "/upload-gray.png"} alt="upload image" />
              {!image && <p>Upload Image</p>}
              <input
                onChange={(e) => {
                  setImage(URL.createObjectURL(e.target.files[0]));
                }}
                name="categoryPhoto"
                className="file-input"
                type="file"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
          <div className="select-icons">
            <p>OR</p>
            <div className="icon-list">
              {categories.map(({ name, icon }) => (
                <div className="icon" key={name}>
                  <img src={`http://localhost:8001/${icon}`} alt="icon" />
                </div>
              ))}
            </div>
          </div>
          <button className="add-category-btn">Add Category</button>
        </form>
      </div>
    </Backdrop>
  );
}
