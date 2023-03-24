import styles from "./update-content-popup.module.scss";

import React from "react";
import PopupHead from "../popup-head/popup-head";
import TextInput from "../text-input/text-input";
import LongTextInput from "../long-text-input/long-text-input";
import ImageInput from "../image-input/image-input";
import Backdrop from "../backdrop/backdrop";
import Button from "../button/button";

import { updateContent } from "../../api";

export default function UpdateContentPopup({
  fetchAllContents,
  content,
  setShowPopup,
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleUpdateContent(e) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await updateContent(content?._id, formData);
      console.log({ response });
      setIsLoading(false);
      setShowPopup(false);
      fetchAllContents();
    } catch (error) {
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
