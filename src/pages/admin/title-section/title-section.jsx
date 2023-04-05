import styles from "./title-section.module.scss";
import React, { useState } from "react";
import { generateCashbacks, savePayouts } from "../../../api";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function TitleSection({
  title,
  addFunction,
  noAddButton,
  uploadBtn,
  setFlash,
}) {
  const handlePaymentUpload = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    file && formdata.append("fileExcel", file);
    // if (!(Object.keys(formdata).length === 0)) {}
    try {
      const response = await generateCashbacks(formdata);
      console.log(response);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong",
      });
      console.log(error);
    }
  };

  const handlePayoutUpload = async (e) => {
    const file = e.target.files[0];
    const formdata = new FormData();
    file && formdata.append("fileExcel", file);
    // if (!(Object.keys(formdata).length === 0)) {}
    try {
      const response = await savePayouts(formdata);
      console.log(response);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong",
      });
      console.log(error);
    }
  };

  // file uploader npm
  return (
    <div className={styles["title-section"]}>
      <h3 className={styles["title"] + " " + styles["active"]}>{title}</h3>
      <div className={styles["title-buttons"]}>
        {uploadBtn && (
          // <div className={styles["upload-buttons-container"]}>
          <>
            <div className={styles["upload-container"]}>
              <button className={styles.upload + " " + styles.button}>
                <img src="/upload.png" alt="upload button" />
                <p>Payment File Upload</p>
              </button>
              {/* <form enctype="multipart/form-data"> */}
              <input
                onChange={handlePaymentUpload}
                type="file"
                accept=".xls, .xlsx, .csv"
              />
              {/* </form> */}
            </div>
            <div className={styles["upload-container"]}>
              {/* <form > */}

              <button className={styles.upload + " " + styles.button}>
                <img src="/upload.png" alt="upload button" />
                <p>Payout File Upload</p>
              </button>
              <input
                type="file"
                onChange={handlePayoutUpload}
                accept=".xls, .xlsx, .csv"
              />
              {/* </form> */}
            </div>
            {/* </div> */}
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

export default connect(null, { setFlash })(TitleSection);
