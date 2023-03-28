import styles from "./popular-categories.module.scss";

import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../api/index.js";
import { useNavigate } from "react-router-dom";

export default function PopulatCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const getAllCategoriesData = async () => {
    const response = await getAllCategories();
    // console.log({ response });
    setCategories(response.data.data);
  };

  useEffect(() => {
    getAllCategoriesData();
  }, []);
  return (
    <section
      className={styles["popular-categories-section"]}
      id="popular-category"
    >
      <div className={styles["container"]}>
        <div className={styles["left"]}>
          <img src="/table-bg.png" alt="categories table background" />
        </div>
        <div className={styles["right"]}>
          <h2 className="_title">Popular Categories</h2>
          <div className={styles["categories-table"]}>
            {categories.map((category, index) => (
              <div
                className={styles["category-name"]}
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
