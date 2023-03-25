import "./title-section.styles.scss";
import React from "react";

export default function TitleSection({
  title,
  addFunction,
  noAddButton,
  uploadBtn,
}) {
  return (
    <div className="title-section">
      <h3 className="title active">{title}</h3>
      <div className="title-buttons">
        {uploadBtn && (
          <div className="upload-container">
            <button className="upload">
              <img src="/upload.png" alt="upload button" />
              <p>Upload</p>
            </button>
            <input type="file" />
          </div>
        )}
        {!noAddButton && (
          <button className="add button" onClick={addFunction}>
            <img src="/add.png" alt="add button" />
            <p>Add</p>
          </button>
        )}
      </div>
    </div>
  );
}
