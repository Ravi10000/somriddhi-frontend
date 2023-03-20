import styles from "./image-input.module.scss";
import React, { useState } from "react";

export default function ImageInput({ label, ...otherProps }) {
  const [image, setImage] = useState(null);
  return (
    <div className={styles["upload-img"]}>
      <label>{label}</label>
      <div className={styles["upload-input"]}>
        <img src={image || "/upload-gray.png"} alt="upload image" />
        {!image && <p>Upload Image</p>}
        <input
          required
          onChange={(e) => {
            console.log(image);
            setImage(URL.createObjectURL(e.target.files[0]));
          }}
          className={styles["file-input"]}
          type="file"
          accept="image/*"
          {...otherProps}
        />
      </div>
    </div>
  );
}
