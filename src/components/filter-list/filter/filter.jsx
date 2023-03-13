import "./filter.styles.scss";
import React, { useState } from "react";

export default function Filter({
  title,
  options,
  selectedCategories,
  setSelectedCategories,
}) {
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
        {options.map((option) => (
          <div className="option" key={option}>
            <input
              type="checkbox"
              id={option}
              name={option}
              value={option}
              checked={selectedCategories.includes(option)}
              readOnly
              onClick={(e) => {
                setSelectedCategories((array) => {
                  if (!selectedCategories.includes(option)) {
                    return [...array, option];
                  } else {
                    return array.filter((item) => item !== option);
                  }
                });
              }}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
