import styles from "./image-input.module.scss";
import React, { useState, useEffect } from "react";

export default function ImageInput({ label, defaultValue, ...otherProps }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (defaultValue) {
      setImage(defaultValue);
    }
  }, []);
  return (
    <div className={styles["upload-img"]}>
      <label>{label}</label>
      <div className={styles["upload-input"]}>
        {!(defaultValue == image) ? <img src={image || "/upload-gray.png"} alt="upload image" /> : <img src={`http://localhost:8001/${image}`} alt="upload image" />}
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
