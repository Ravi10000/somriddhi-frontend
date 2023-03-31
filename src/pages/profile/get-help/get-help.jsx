import "./get-help.styles.scss";

import React, { useEffect, useState } from "react";
import { getAllFaqs } from "../../../api";
import Faq from "./faq/faq";

const popularQuestions = [
  "How Somriddhi Works?",
  "Question About Your Cashback and Rewards?",
  "If your Cashback / Rewards is missing?",
  "Question about payment?",
  "Earn more by referring friends",
  "Unable to login?",
  "Want to be a partner with us?",
  "Any other question?",
];
export default function GetHelp() {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getAllFaqs();
      console.log({ response });
      setFaqs(response.data.data);
    })();
  }, []);

  return (
    <div className="get-help">
      <h2>Get Help</h2>
      <div className="main">
        <div className="get-help-search">
          <input
            className="get-help-search-input"
            type="search"
            placeholder="Search here"
          />
          <img
            className="get-help-search-icon"
            src="/search.png"
            alt="search"
          />
        </div>
        <div className="popular-questions">
          {faqs?.map((faq, index) => (
            <Faq faq={faq} key={faq._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
