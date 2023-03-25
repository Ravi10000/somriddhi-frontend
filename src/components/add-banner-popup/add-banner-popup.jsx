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
import { connect } from "react-redux";
import { setFlash } from "../../redux/flash/flash.actions";

function AddBannerPopup({ setShowPopup, fetchBanners, setFlash }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    for (let key of formData.entries()) {
      console.log(key);
    }
    try {
      const response = await createNewBanner(formData);
      console.log({ response });
      if (response.data.status === "success") {
        fetchBanners();
        setFlash({
          type: "success",
          message: "Banner Added Successfully",
        });
        setIsLoading(false);
        setShowPopup(false);
      }
    } catch (error) {
      setFlash({
        message: "Something went wrong, please try again",
        type: "error",
      });
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className="add-banner-popup">
        <PopupHead setShowPopup={setShowPopup} title="Add Banner" />
        <form onSubmit={submitForm} encType="multipart/form-data">
          <ImageInput label="Banner Image" name="bannerPhoto" />
          <TextInput label="Name" name="name" placeholder="Enter Banner Name" />
          <TextInput label="URL" name="url" placeholder="Paste Banner url" />
          <LongTextInput label="Description" name="description" />
          <Button isLoading={isLoading}>Add Banner</Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(AddBannerPopup);
