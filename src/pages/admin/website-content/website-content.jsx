import "./website-content.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";

export default function WebsiteContent() {
  return (
    <div className="website-content">
      <TitleSection title="website content" noAddButton />
      {/* <div className="content-options"> */}
        <div className="options-container">
          <div className="option">
            <img src="/image-icon.png" alt="add image" />
            <p>Image</p>
          </div>
          <div className="option">
            <img src="/text-icon.png" alt="add image" />
            <p>Text</p>
          </div>
          <div className="option">
            <img src="/image-grid-icon.png" alt="add image" />
            <p>Image Grid</p>
          </div>
          <div className="option">
            <img src="/video-icon.png" alt="add image" />
            <p>Video</p>
          </div>
          <div className="option">
            <img src="/embed-icon.png" alt="add image" />
            <p>Embed</p>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
