import "./title-section.styles.scss";
import React from "react";

export default function TitleSection({ title, addFunction, noAddButton }) {
  return (
    <div className="title-section">
      <h3 className="title active">{title}</h3>
      {!noAddButton && (
        <button className="add-button" onClick={addFunction}>
          <img src="/add.png" alt="add button" />
          <p>Add</p>
        </button>
      )}
    </div>
  );
}
