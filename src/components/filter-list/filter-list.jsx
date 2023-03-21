import "./filter-list.styles.scss";

import React, { useState, useEffect } from "react";
import filterOptions from "./filter-options";
import Filter from "./filter/filter";
import { getAllCategories } from "../../api";

export default function FilterList({
  selectedCategories,
  setSelectedCategories,
}) {
  const [categories, setCategories] = useState([]);
  async function fetchCategories() {
    try {
      const response = await getAllCategories();
      console.log({ response });
      setCategories(response.data.data);
      // const allCategories = response.data.data.map((category) => category.name);
      // console.log(response.data.data);
      // setCategories(allCategories);
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
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        title="Categories"
        options={categories}
      />
      {filterOptions.map(({ title, options }, index) => (
        <Filter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          title={title}
          options={options}
          key={index}
        />
      ))}
    </div>
  );
}
