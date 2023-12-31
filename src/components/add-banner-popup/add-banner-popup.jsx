import "./add-banner-popup.styles.scss";

// react hooks
import { useState, useEffect } from "react";
// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import NumInput from "../num-input/num-input";
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
  const [selectedStatus, setSelectedStatus] = useState(
    () => bannerToEdit?.status || "Active"
  );
  console.log({ selectedStatus });

  useEffect(() => {
    return () => {
      setBannerToEdit(null);
    };
  }, [bannerToEdit]);

  async function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    // const img = formData.get("bannerPhoto");
    // !img?.name && formData.delete("bannerPhoto");

    formData.append("status", selectedStatus);
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
          <NumInput
            label="Cashback"
            name="cashbackPercent"
            placeholder="Cashback in %"
            maxLength="2"
            defaultValue={bannerToEdit?.cashbackPercent || ""}
          />
          <NumInput
            label="Max Cashback"
            name="maxCashback"
            placeholder="Maximum Cashback Amount"
            // maxLength="5"
            defaultValue={bannerToEdit?.maxCashback || ""}
          />
          <NumInput
            label="Priority Order"
            name="priorityOrder"
            placeholder="Enter Priority Order"
            defaultValue={bannerToEdit?.priorityOrder || ""}
          />
          <LongTextInput
            label="Description"
            name="description"
            defaultValue={bannerToEdit?.description}
          />
          <label htmlFor="status">Status: </label>
          <div className="status-updater">
            <div
              className={`select-status ${
                selectedStatus === "Active" && "active"
              }`}
              onClick={() => setSelectedStatus("Active")}
            >
              Active
            </div>
            <div
              onClick={() => setSelectedStatus("Inactive")}
              className={`select-status ${
                selectedStatus === "Inactive" && "inactive"
              }`}
            >
              Inactive
            </div>
          </div>
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
