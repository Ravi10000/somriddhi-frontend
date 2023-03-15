import "./all-categories.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";

export default function AllCategories() {
  return (
    <div className="all-categories">
      <TitleSection
        title="categories"
        addFunction={() => {
          alert("add categories popup need to be here");
        }}
      />
    </div>
  );
}
