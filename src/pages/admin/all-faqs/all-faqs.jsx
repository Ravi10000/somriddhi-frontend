import "./all-faqs.styles.scss";

import { useState } from "react";
import TitleSection from "../title-section/title-section";
import quries from "./quries";

import AddFaqPopup from "../../../components/add-faq-popup/add-faq-popup";
export default function AllFaqs() {
  const [showAddFaqPopup, setShowAddFaqPopup] = useState(false);
  return (
    <>
      {showAddFaqPopup && <AddFaqPopup setShowPopup={setShowAddFaqPopup} />}
      <div className="all-faqs">
        <TitleSection
          title="All FAQs"
          addFunction={() => {
            setShowAddFaqPopup(true);
          }}
        />
        <div className="queries">
          {quries?.map(({ title, description }, index) => (
            <div className="query" key={index}>
              <h3 className="query-title">{title}</h3>
              <p className="query-desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
