import styles from "./process.module.scss";

import { useEffect, useState } from "react";
// import { getAProcess } from '../../api/index.js';
import { getAllContent } from "../../api/index";

export default function Process() {
  const [contents, setContents] = useState([]);

  async function fetchAllContents() {
    const response = await getAllContent();
    if (response.data.status === "success") setContents(response.data.content);
  }

  useEffect(() => {
    fetchAllContents();
  }, []);

  return (
    <section className={styles["process-section"]}>
      <h2 className="_title">How It Works?</h2>
      <div className={styles["process-cards-container"]}>
        <div className={styles["process-card"]}>
          <div className={styles["img-container"]}>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                contents?.[0]?.image
              }`}
              onError={(e) => {
                e && (e.target.src = "/no-photo.png");
              }}
              alt="content image"
            />
          </div>
          <h4>{contents?.[0]?.title}</h4>
          <p>{contents?.[0]?.description}</p>
          <img className={styles["arrow"]} src="/arrow.png" alt="" />
        </div>
        <div className={styles["process-card"]}>
          <div className={styles["img-container"]}>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                contents?.[1]?.image
              }`}
              onError={(e) => {
                e && (e.target.src = "/no-photo.png");
              }}
              alt="content image"
            />
          </div>
          <h4>{contents?.[1]?.title}</h4>
          <p>{contents?.[1]?.title}</p>
          <img
            className={styles["arrow"] + " " + styles["flip"]}
            src="/arrow-fliped.png"
            alt=""
          />
        </div>
        <div className={styles["process-card"]}>
          <div className={styles["img-container"]}>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                contents?.[2]?.image
              }`}
              alt="content"
              onError={(e) => {
                e && (e.target.src = "/no-photo.png");
              }}
            />
          </div>
          <h4>{contents?.[2]?.title}</h4>
          <p>{contents?.[2]?.description}</p>
        </div>
      </div>
    </section>
  );
}
