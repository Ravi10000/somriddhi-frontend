import "./all-faqs.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";
import quries from "./quries";
export default function AllFaqs() {
  return (
    <div className="all-faqs">
      <TitleSection title="All FAQs" noAddButton />
      <div className="queries">
        {quries?.map(({ title, description }, index) => (
          <div className="query" key={index}>
            <h3 className="query-title">{title}</h3>
            <p className="query-desc">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
