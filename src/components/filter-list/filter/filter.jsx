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
          <div
            className="option"
            key={option._id}
            onClick={(e) => {
              setSelectedCategories((array) => {
                if (!selectedCategories.includes(option._id)) {
                  return [...array, option._id];
                } else {
                  return array.filter((item) => item !== option._id);
                }
              });
            }}
          >
            <input
              type="checkbox"
              id={option._id}
              name={option.name}
              value={option._id}
              checked={selectedCategories.includes(option._id)}
              readOnly
            />
            <label htmlFor={option.name}>{option.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
