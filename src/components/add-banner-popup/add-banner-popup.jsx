import "./add-banner-popup.styles.scss";
// packages
import { useForm } from "react-hook-form";
import axios from "../../api";

// components
import Backdrop from "../backdrop/backdrop";

// utils
import { createBanner } from "../../api";

export default function AddBannerPopup({ setShowPopup }) {
  const {
    register,
    formState: { errors },
  } = useForm();

  console.log({ errors });

  async function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // for (let key of formData.entries()) {
    //   console.log(key);
    // }
    try {
      const response = await createBanner(formData);
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
        <form onSubmit={submitForm}>
          <div className="upload-banner-img">
            <label className="label">Banner Image</label>
            <div className="upload-input">
              <img src="/upload-gray.png" alt="upload image" />
              <input
                className="file-input"
                type="file"
                accept="image/*"
                {...register("bannerPhoto", { required: "Image is required" })}
                // onChange={(e) => saveFile(e)}
                // className="fileFieldText"
                // name="file"
                // placeholder="Upload Image"
              />
              {errors.bannerPhoto && (
                <p className="error">{errors.bannerPhoto.message}</p>
              )}
            </div>
          </div>
          <div className="banner-name input-container">
            <label htmlFor="">Name</label>
            <input
              className="text-input"
              // onChange={(e) => setBannerName(e.target.value)}
              placeholder="Enter Banner Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="url input-container">
            <label htmlFor="">URL</label>
            <input
              className="text text-input"
              // className="fileFieldTwo"
              // onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Banner url"
              {...register("url", { required: "URL is required" })}
            />
            {errors.url && <p className="error">{errors.url.message}</p>}
          </div>
          <div className="description input-container">
            <label htmlFor="">Description</label>
            <p className="textarea-msg">Enter Banner Description</p>
            <textarea
              className="text-input"
              // defaultValue="Enter Banner Description"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>
          <button className="add-banner-btn">Add Banner</button>
        </form>
      </div>
    </Backdrop>
  );
}
