import styles from "./title-section.module.scss";
import React, { useState } from "react";
import { getAllExcelData } from "../../../api";

export default function TitleSection({
  title,
  addFunction,
  noAddButton,
  uploadBtn,
}) {
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    let file = e.target.files[0];
    let formdata = new FormData();
    formdata.append("file", file);
    console.log(formdata);
  };

  // file uploader npm
  return (
    <div className={styles["title-section"]}>
      <h3 className={styles["title"] + " " + styles["active"]}>{title}</h3>
      <div className={styles["title-buttons"]}>
        {uploadBtn && (
          <div>
            <div className={styles["upload-container"]}>
              <button className={styles.upload + " " + styles.button}>
                <img src="/upload.png" alt="upload button" />
                <p>Payment File Upload</p>
              </button>
              {/* <form enctype="multipart/form-data"> */}
              <input
                onChange={handleChange}
                name="uploadFile"
                type="file"
                required
              />
              {/* </form> */}
            </div>
            {/* <form className={styles["upload-container"]}> */}
            <button className={styles.upload + " " + styles.button}>
              <img src="/upload.png" alt="upload button" />
              <p>Payout File Upload</p>
            </button>
            <input type="file" />
            {/* </form> */}
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
