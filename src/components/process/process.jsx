import "./process.styles.scss";

import React, { useEffect, useState } from "react";
// import { getAProcess } from '../../api/index.js';
import { getAllContent } from "../../api/index";

export default function Process() {
  const processData = [];
  const [contents, setContents] = useState([]);

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
    <section className="process-section">
      <h2 className="_title">How It Works?</h2>
      <div className="process-cards-container">
        <div className="process-card">
          <div className="img-container">
            <img src={`${process.env.REACT_APP_API_URL}/${contents?.[0]?.image}`} alt="" />
          </div>
          <h4>{contents?.[0]?.title}</h4>
          <p>{contents?.[0]?.description}</p>
          <img className="arrow" src="/arrow.png" alt="" />
        </div>
        <div className="process-card">
          <div className="img-container">
            <img src={`${process.env.REACT_APP_API_URL}/${contents?.[1]?.image}`} alt="" />
          </div>
          <h4>{contents?.[1]?.title}</h4>
          <p>{contents?.[1]?.title}</p>
          <img className="arrow flip" src="/arrow-fliped.png" alt="" />
        </div>
        <div className="process-card">
          <div className="img-container">
            <img src={`${process.env.REACT_APP_API_URL}/${contents?.[2]?.image}`} alt="" />
          </div>
          <h4>{contents?.[2]?.title}</h4>
          <p>{contents?.[2]?.description}</p>
        </div>
      </div>
    </section>
  );
}
