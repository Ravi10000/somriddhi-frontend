import "./all-categories.styles.scss";

import React, { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import categoryList from "./category-list";
import AddCategoryPopup from "../../../components/add-category-popup/add-category-popup";
import { getAllCategories } from "../../../api/index";

export default function AllCategories() {
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await getAllCategories();
      console.log({ response });
      setCategories(response.data.data);
    })();
  }, []);
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
          {categories?.map(({ name, icon }, index) => (
            <div className="category" key={index}>
              <div className="category-icon">
                <img src={`http://localhost:8001/${icon}`} alt={name} />
              </div>
              <p className="name">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
