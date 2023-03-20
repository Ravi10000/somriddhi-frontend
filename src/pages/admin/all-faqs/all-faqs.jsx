import "./all-faqs.styles.scss";

import { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import quries from "./quries";

import axios from "axios";
import AddFaqPopup from "../../../components/add-faq-popup/add-faq-popup";
import { getAllFaqs } from "../../../api/index";
export default function AllFaqs() {
  const [showAddFaqPopup, setShowAddFaqPopup] = useState(false);
  const [faqs, setFaqs] = useState([]);
  async function fetchFaqs() {
    try {
      const response = await getAllFaqs();
      setFaqs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFaqs();
  }, []);
  return (
    <>
      {showAddFaqPopup && (
        <AddFaqPopup setShowPopup={setShowAddFaqPopup} fetchFaqs={fetchFaqs} />
      )}
      <div className="all-faqs">
        <TitleSection
          title="All FAQs"
          addFunction={() => {
            setShowAddFaqPopup(true);
          }}
        />
        <div className="queries">
          {faqs.reverse()?.map(({ question, answer }, index) => (
            <div className="query" key={index}>
              <h3 className="query-title">{question}</h3>
              <p className="query-desc">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
