import "./all-deals.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";

export default function AllDeals() {
  return (
    <div>
      <TitleSection
        title="all deals"
        addFunction={() => {
          alert("add deal popup");
        }}
      />
    </div>
  );
}
