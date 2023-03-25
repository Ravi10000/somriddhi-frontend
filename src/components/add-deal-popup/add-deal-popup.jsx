import "./add-deal-popup.styles.scss";
// react hooks
import { useState, useEffect, useId } from "react";

// packages
import { connect } from "react-redux";

// components
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import CustomSelect from "../custom-select/custom-select";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import NumInput from "../num-input/num-input";
import Button from "../button/button";

// api calls
import { createNewDeal, getAllCategories, updateDeal } from "../../api/";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";

function AddDealPopup({
  setShowPopup,
  fetchDeals,
  dealToUpdate,
  setDealToUpdate,
  setFlash,
}) {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getAllCategories();
      console.log({ response });
      setCategories(response.data.data);
    })();
    return () => {
      setDealToUpdate(null);
    };
  }, []);

  async function submitAddDealForm(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append("categoryId", selectedCategory._id);
    dealToUpdate && formData.append("_id", dealToUpdate._id);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
    try {
      if (!dealToUpdate) {
        const response = await createNewDeal(formData);
        console.log({ response });
        response.data.status === "success" &&
          setFlash({
            type: "success",
            message: "Deal Added Successfully",
          });
      } else {
        const response = await updateDeal(formData);
        console.log({ response });
        response.data.status === "success" &&
          setFlash({
            type: "success",
            message: "Deal Updated Successfully",
          });
      }
      setIsLoading(false);
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
            placeholder="Enter deal Name"
            defaultValue={dealToUpdate?.name || ""}
          />
          <TextInput
            label="URL"
            name="url"
            placeholder="Paster deal Url"
            defaultValue={dealToUpdate?.url || ""}
          />
          <NumInput
            label="Cashback"
            name="cashbackPercent"
            placeholder="Cashback in percent"
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
            label="Select Category"
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            defaultValue={dealToUpdate?.categoryId || ""}
          />

          <ImageInput
            label="Deal Image"
            name="dealPhoto"
            defaultValue={dealToUpdate?.image}
            required={!dealToUpdate}
          />
          <div className="dates">
            <div className="live-date date-input">
              <label htmlFor={`${id}-liveDate`}>Live Date</label>
              <input
                defaultValue={dealToUpdate?.liveDate}
                id={`${id}-liveDate`}
                name="liveDate"
                type="date"
              />
            </div>
            <div className="expiry-date date-input">
              <label htmlFor={`${id}-expiryDate`}>Expiry Date</label>
              <input
                defaultValue={dealToUpdate?.expiryDate}
                id={`${id}-expiryDate`}
                name="expiryDate"
                type="date"
              />
            </div>
          </div>
          <Button isLoading={isLoading}>
            {dealToUpdate ? "Update Deal" : "Add Deal"}
          </Button>
        </form>
      </div>
    </Backdrop>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(AddDealPopup);
