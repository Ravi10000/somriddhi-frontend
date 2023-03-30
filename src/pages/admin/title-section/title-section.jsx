import styles from "./title-section.module.scss";
import React, { useState } from "react";

export default function TitleSection({
  title,
  addFunction,
  noAddButton,
  uploadBtn,
}) {
  const [file, setFile] = useState("");
  const handleInput = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
    console.log(file)
  }
  const handleChange = (e) => {
    console.log(file)
    // console.log(e)
    // let file = e.target.files[0];
    // let formdata = new FormData();
    // formdata.append('file', file);
    // console.log(formdata);
  }
  return (
    <div className={styles["title-section"]}>
      <h3 className={styles["title"] + " " + styles["active"]}>{title}</h3>
      <div className={styles["title-buttons"]}>
        {uploadBtn && (
          <>
            <div className={styles["upload-container"]}>
              <button className={styles.upload + " " + styles.button}>
                <img src="/upload.png" alt="upload button" />
                <p>Payment File Upload</p>
              </button>
              <form enctype="multipart/form-data" onChange={(e) => { handleChange(e) }} >
                <input onChange={(e) => { handleInput(e) }} name="uploadFile" type="file" required />
              </form>
            </div>
            <form className={styles["upload-container"]}>
              <button className={styles.upload + " " + styles.button}>
                <img src="/upload.png" alt="upload button" />
                <p>Payout File Upload</p>
              </button>
              <input type="file" />
            </form>
          </>
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
