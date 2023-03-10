import "./filter.styles.scss";
import React, { useState } from "react";

export default function Filter({ title, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter">
      <div
        className="title-container"
        onClick={() => {
          setIsOpen((preState) => !preState);
        }}
      >
        <h4>{title}</h4>
        <div className={`toggle-icon ${!isOpen && "hide"}`}></div>
      </div>
      <div className={`options-container ${!isOpen && "hidden"}`}>
        {options.map((option, index) => (
          <div className="option">
            <input type="checkbox" id={option} name={option} value={option} />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
