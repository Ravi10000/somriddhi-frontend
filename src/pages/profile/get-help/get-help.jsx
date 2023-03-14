import "./get-help.styles.scss";

import React from "react";

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
          {popularQuestions?.map((question, index) => (
            <div className="question" key={index}>
              <p>{question}</p>
              <img src="/arrow-right.png" alt="ask question" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
