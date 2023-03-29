import styles from "./title-section.module.scss";
import React from "react";

export default function TitleSection({
  title,
  addFunction,
  noAddButton,
  uploadBtn,
}) {
  return (
    <div className={styles["title-section"]}>
      <h3 className={styles["title"] + " " + styles["active"]}>{title}</h3>
      <div className={styles["title-buttons"]}>
        {uploadBtn && (
          <div className={styles["upload-container"]}>
            <button className={styles["upload"]}>
              <img src="/upload.png" alt="upload button" />
              <p>Upload</p>
            </button>
            <input type="file" />
          </div>
        )}
        {!noAddButton && (
          <button
            className={styles["add"] + " " + styles["button"]}
            onClick={addFunction}
          >
            <img src="/add.png" alt="add button" />
            <p>Add</p>
          </button>
        )}
      </div>
    </div>
  );
}
