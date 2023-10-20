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
  customUI,
}) {
  const handlePaymentUpload = async (e) => {
    console.log("triggered payment upload");
    const file = e.target.files[0];
    const formdata = new FormData();
    file && formdata.append("fileExcel", file);
    try {
      const response = await generateCashbacks(formdata);
      console.log(response);
      if (response.data.status === "success") {
        setFlash({
          type: "success",
          message: "Payments uploaded successfully",
        });
        // window.location.reload();
      }
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong",
      });
      console.log(error);
    }
  };

  const handlePayoutUpload = async (e) => {
    console.log("triggered payout upload");
    const file = e.target.files[0];
    const formdata = new FormData();
    file && formdata.append("fileExcel", file);
    try {
      const response = await savePayouts(formdata);
      console.log(response);
      if (response.data.status === "success") {
        setFlash({
          type: "success",
          message: "Payouts uploaded successfully",
        });
        // window.location.reload();
      }
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
        {customUI && customUI}
      </div>
    </div>
  );
}

export default connect(null, { setFlash })(TitleSection);
