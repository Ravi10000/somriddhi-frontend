import "./add-banner-popup.styles.scss";

// react hooks
import { useState, useEffect } from "react";
// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import ImageInput from "../image-input/image-input";
import LongTextInput from "../long-text-input/long-text-input";
import Button from "../button/button";

// api calls
import { createNewBanner, editBanner } from "../../api";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";

function AddBannerPopup({
  setShowPopup,
  fetchBanners,
  setFlash,
  bannerToEdit,
  setBannerToEdit,
}) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setBannerToEdit(null);
    };
  }, [bannerToEdit]);

  async function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    for (let key of formData.entries()) {
      console.log(key);
    }
    try {
      if (!bannerToEdit) {
        const response = await createNewBanner(formData);
        console.log({ response });
        if (response.data.status === "success") {
          fetchBanners();
          setFlash({
            type: "success",
            message: "Banner Added Successfully",
          });
        }
      } else {
        formData.append("_id", bannerToEdit._id);
        const response = await editBanner(formData);
        console.log({ response });
        if (response.data.status === "success") {
          fetchBanners();
          setFlash({
            type: "success",
            message: "Banner Updated Successfully",
          });
        }
      }
      setIsLoading(false);
      setShowPopup(false);
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
        <PopupHead
          setShowPopup={setShowPopup}
          title={bannerToEdit ? "Update Banner" : "Add New Banner"}
        />
        <form onSubmit={submitForm} encType="multipart/form-data">
          <ImageInput
            label="Banner Image"
            name="bannerPhoto"
            defaultValue={bannerToEdit?.image}
          />
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter Banner Name"
            defaultValue={bannerToEdit?.name}
          />
          <TextInput
            label="URL"
            name="url"
            placeholder="Paste Banner url"
            defaultValue={bannerToEdit?.url}
          />
          <LongTextInput
            label="Description"
            name="description"
            defaultValue={bannerToEdit?.description}
          />
          <Button isLoading={isLoading}>
            {bannerToEdit ? "Update Banner" : "Add Banner"}
          </Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(AddBannerPopup);
