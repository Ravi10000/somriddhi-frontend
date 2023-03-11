import "./filter-list.styles.scss";

import React from "react";
import filterOptions from "./filter-options";
import Filter from "./filter/filter";

export default function FilterList({ category }) {
  console.log(category);
  return (
    <div className="filter-list">
      {filterOptions.map(({ title, options }, index) => (
        <Filter
          title={title}
          options={options}
          key={index}
          selectedCategory={"category" && category}
        />
      ))}
    </div>
  );
}
