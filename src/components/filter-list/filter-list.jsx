import "./filter-list.styles.scss";

import React from "react";
import filterOptions from "./filter-options";
import Filter from "./filter/filter";

export default function FilterList() {
  return (
    <div className="filter-list">
      {filterOptions.map(({ title, options }, index) => (
        <Filter title={title} options={options} key={index} />
      ))}
    </div>
  );
}
