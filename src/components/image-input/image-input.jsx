import styles from "./image-input.module.scss";
import React, { useState, useEffect } from "react";

export default function ImageInput({ label, dealImage, ...otherProps }) {
  const [image, setImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);

  console.log({ image });
  console.log({ defaultImage });
  useEffect(() => {
    if (dealImage) {
      setDefaultImage(dealImage || null);
    }
  }, []);
  return (
    <div className={styles["upload-img"]}>
      <label>{label}</label>
      <div className={styles["upload-input"]}>
        {defaultImage ? (
          <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${defaultImage}`} alt="image" />
        ) : (
          <img src={image || "/upload-gray.png"} alt="" />
        )}
        {!image && !defaultImage && <p>Upload Image</p>}
        <input
          required
          onChange={(e) => {
            setDefaultImage(null);
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
