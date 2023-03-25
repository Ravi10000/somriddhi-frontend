import styles from "./update-content-popup.module.scss";
// react hooks
import { useState } from "react";

// packages
import { connect } from "react-redux";

// components
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import Backdrop from "../backdrop/backdrop";
import Button from "../button/button";

// api calls
import { updateContent } from "../../api";

// redux actions
import { setFlash } from "../../redux/flash/flash.actions";

function UpdateContentPopup({
  fetchAllContents,
  content,
  setFlash,
  setShowPopup,
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateContent(e) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await updateContent(content?._id, formData);
      console.log({ response });

      response.data.status === "success" &&
        setFlash({ type: "success", message: "Content Updated Successfully" });

      setIsLoading(false);
      setShowPopup(false);
      fetchAllContents();
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
      console.log(error);
    }
  }

  return (
    <Backdrop>
      <div className={styles.updateContentPopup}>
        <PopupHead title="Update Content" setShowPopup={setShowPopup} />
        <form
          className={styles.updateContentForm}
          onSubmit={handleUpdateContent}
          encType="multipart/form-data"
        >
          <ImageInput label="Icon" name="image" dealImage={content?.image} />
          <TextInput label="Title" name="title" defaultValue={content?.title} />
          <LongTextInput
            label="Description"
            name="description"
            defaultValue={content?.description}
          />
          <Button isLoading={isLoading}>Save</Button>
        </form>
      </div>
    </Backdrop>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(UpdateContentPopup);
