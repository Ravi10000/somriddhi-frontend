import "./all-memberships.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";

export default function AllMemberships() {
  return (
    <div className="all-memberships">
      <TitleSection
        title="all membershipss"
        addFunction={() => {
          alert("add memberships popup need to be here");
        }}
      />
    </div>
  );
}
