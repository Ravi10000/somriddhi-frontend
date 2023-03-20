import "./add-banner-popup.styles.scss";
import { useRef, useState } from "react";
import TextInput from "../text-input/text-input";
// packages
// import { useForm } from "react-hook-form";
// import axios from "../../api";

// components
import Backdrop from "../backdrop/backdrop";

// utils
import { createNewBanner } from "../../api";
import ImageInput from "../image-input/image-input";
import LongTextInput from "../long-text-input/long-text-input";
import Button from "../button/button";
import PopupHead from "../popup-head/popup-head";

export default function AddBannerPopup({ setShowPopup, fetchBanners }) {
  const [image, setImage] = useState(null);
  // const formRef = useRef(null);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // console.log({ errors });

  async function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (let key of formData.entries()) {
      console.log(key);
    }
    try {
      const response = await createNewBanner(formData);
      console.log({ response });
      if (response.data.status === "success") {
        fetchBanners();
        setShowPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className="add-banner-popup">
        {/* <div className="head">
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
        </div> */}
        <PopupHead setShowPopup={setShowPopup} title="Add Banner" />
        <form onSubmit={submitForm} encType="multipart/form-data">
          <ImageInput label="Banner Image" name="bannerPhoto" />
          <TextInput label="Name" name="name" placeholder="Enter Banner Name" />
          <TextInput label="URL" name="url" placeholder="Paste Banner url" />
          <LongTextInput label="Description" name="description" />
          <button className="add-banner-btn">Add Banner</button>
        </form>
      </div>
    </Backdrop>
  );
}
