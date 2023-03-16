import "./all-categories.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";
import categoryList from "./category-list";

export default function AllCategories() {
  return (
    <div className="all-categories">
      <TitleSection
        title="categories"
        addFunction={() => {
          alert("add categories popup need to be here");
        }}
      />
      <div className="categories">
        {categoryList?.map(({ name, img }, index) => (
          <div className="category" key={index}>
            <div className="category-icon">
              <img src={img} alt={name} />
            </div>
            <p className="name">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
