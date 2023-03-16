import "./all-categories.styles.scss";

import React, { useState } from "react";
import TitleSection from "../title-section/title-section";
import categoryList from "./category-list";
import AddCategoryPopup from "../../../components/add-category-popup/add-category-popup";

export default function AllCategories() {
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  return (
    <>
      {showAddCategoryPopup && (
        <AddCategoryPopup setShowPopup={setShowAddCategoryPopup} />
      )}
      <div className="all-categories">
        <TitleSection
          title="categories"
          addFunction={() => {
            setShowAddCategoryPopup(true);
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
    </>
  );
}
