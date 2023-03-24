import "./website-content.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";
import ProcessEditable from "../process-editable/process-editable";

export default function WebsiteContent() {
  return (
    <div className="website-content">
      <TitleSection title="website content" noAddButton />
      <div className="process-editable-container">
        <ProcessEditable />
      </div>
    </div>
  );
}
