import "./all-banners.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";

export default function AllBanners() {
  return (
    <div className="all-banner">
      <TitleSection
        title="all banners"
        addFunction={() => {
          alert("add banner popup need to be here");
        }}
      />
    </div>
  );
}
