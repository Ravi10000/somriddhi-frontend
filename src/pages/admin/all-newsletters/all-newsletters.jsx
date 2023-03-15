import "./all-newsletters.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";

export default function AllNewsletters() {
  return (
    <div className="all-newsletters">
      <TitleSection
        title="all subscriptions"
        addFunction={() => {
          alert("add newsletters popup need to be here");
        }}
      />
    </div>
  );
}
