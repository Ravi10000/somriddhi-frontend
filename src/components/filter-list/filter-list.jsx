import "./filter-list.styles.scss";

import React, { useState, useEffect } from "react";
import filterOptions from "./filter-options";
import Filter from "./filter/filter";
import { getAllCategories } from "../../api";

export default function FilterList({
  selectedCategory,
  setSelectedCategory,
  showAll,
}) {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const response = await getAllCategories();
      console.log({ response });
      setCategories(response.data.data);
      if (!showAll) setSelectedCategory(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="filter-list">
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        title="Categories"
        options={categories}
      />
      {filterOptions.map(({ title, options }, index) => (
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          title={title}
          options={options}
          key={index}
        />
      ))}
    </div>
  );
}
