import "./filter-list.styles.scss";

import React from "react";
import filterOptions from "./filter-options";
import Filter from "./filter/filter";

export default function FilterList({ category, selectedCategories, setSelectedCategories }) {
  return (
    <div className="filter-list">
      {filterOptions.map(({ title, options }, index) => (
        <Filter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          title={title}
          options={options}
          key={index}
          selectedCategory={"category" && category}
        />
      ))}
    </div>
  );
}
