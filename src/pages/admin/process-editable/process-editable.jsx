import styles from "./process-editable.module.scss";

import { useState, useEffect } from "react";
import { getAllContent } from "../../../api";
import UpdateContentPopup from "../../../components/update-content-popup/update-content-popup";

export default function ProcessEditable() {
  const [contents, setContents] = useState([]);
  const [showContentPopup, setShowContentPopup] = useState(false);
  const [contentToUpdate, setContentToUpdate] = useState(null);

  async function fetchAllContents() {
    const response = await getAllContent();
    console.log({ response });
    console.log(response.data.content);
    if (response.data.status === "success") setContents(response.data.content);
  }

  useEffect(() => {
    fetchAllContents();
  }, []);

  return (
    <section className={styles["process-editable-section"]}>
      {showContentPopup && (
        <UpdateContentPopup
          fetchAllContents={fetchAllContents}
          setShowPopup={setShowContentPopup}
          content={contentToUpdate}
        />
      )}
      <div className={styles["process-cards-container"]}>
        <div className={styles["process-card"]}>
          <div
            className={styles["edit-icon-container"]}
            onClick={() => {
              setContentToUpdate(contents?.[0]);
              setShowContentPopup(true);
            }}
          >
            <img
              className={styles["edit-icon"]}
              src="/edit.png"
              alt="edit img"
            />
          </div>
          <div className={styles["img-container"]}>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                contents?.[0]?.image
              }`}
              alt=""
              onError={(e) => {
                e && (e.target.src = "/no-photo.png");
              }}
            />
          </div>
          <div className={styles["title"]}>
            <h4>{contents?.[0]?.title}</h4>
          </div>
          <div className={styles["desc"]}>
            <p>{contents?.[0]?.description}</p>
          </div>
          <img className={styles["arrow"]} src="/arrow.png" alt="" />
        </div>
        <div className={styles["process-card"]}>
          <div
            className={styles["edit-icon-container"]}
            onClick={() => {
              setContentToUpdate(contents?.[1]);
              setShowContentPopup(true);
            }}
          >
            <img
              className={styles["edit-icon"]}
              src="/edit.png"
              alt="edit img"
            />
          </div>
          <div className={styles["img-container"]}>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                contents?.[1]?.image
              }`}
              alt=""
              onError={(e) => {
                e && (e.target.src = "/no-photo.png");
              }}
            />
          </div>
          <div className={styles["title"]}>
            <h4>{contents?.[1]?.title}</h4>
          </div>
          <div className={styles["desc"]}>
            <p>{contents?.[1]?.description}</p>
          </div>
          <img
            className={`${styles.arrow} ${styles.flip}`}
            src="/arrow-fliped.png"
            alt=""
          />
        </div>
        <div className={styles["process-card"]}>
          <div
            className={styles["edit-icon-container"]}
            onClick={() => {
              setContentToUpdate(contents?.[2]);
              setShowContentPopup(true);
            }}
          >
            <img
              className={styles["edit-icon"]}
              src="/edit.png"
              alt="edit img"
            />
          </div>
          <div className={styles["img-container"]}>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                contents?.[2]?.image
              }`}
              alt=""
              onError={(e) => {
                e && (e.target.src = "/no-photo.png");
              }}
            />
          </div>
          <div className={styles["title"]}>
            <h4>{contents?.[2]?.title}</h4>
          </div>
          <div className={styles["desc"]}>
            <p>{contents?.[2]?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
