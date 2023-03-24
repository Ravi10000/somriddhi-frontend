import "./popular-categories.styles.scss";

import React, { useEffect, useState } from "react";
import categoriesList from "./popular-categories-list";
import { getAllCategories } from "../../api/index.js";
import { useNavigate } from "react-router-dom";

export default function PopulatCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const getAllCategoriesData = async () => {
    const response = await getAllCategories();
    console.log({ response });
    setCategories(response.data.data);
  };

  useEffect(() => {
    getAllCategoriesData();
  }, []);
  return (
    <section className="popular-categories-section" id="popular-category">
      <div className="container">
        <div className="left">
          <img src="/table-bg.png" alt="categories table background" />
        </div>
        <div className="right">
          <h2 className="_title">Popular Categories</h2>
          <div className="categories-table">
            {categories.map((category, index) => (
              <div
                className="category-name"
                key={index}
                onClick={() => {
                  navigate(`/category/${category?.name}`, {
                    state: { category },
                  });
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
