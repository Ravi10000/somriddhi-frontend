import "./all-feedbacks.styles.scss";

import React, { useState } from "react";
import { allFeedbacks, activeFeedbacks } from "./feedbacks";
const options = ["all", "active"];
export default function AllFeedbacks() {
  const [selectedFeedbackList, setSelectedFeedbackList] = useState("all");
  return (
    <div className="all-feedbacks">
      <div className="select-feedbacks">
        {options?.map((item) => (
          <h4
            className={`${selectedFeedbackList === item ? "active" : ""}`}
            onClick={() => {
              setSelectedFeedbackList(item);
            }}
            key={item}
          >
            {item} feedback
          </h4>
        ))}
      </div>
      <div className="feedbacks-container">
        {selectedFeedbackList === "all" &&
          allFeedbacks?.map(
            ({ userName, feedback, date, userImg, rating }, index) => (
              <div className="feedback-card" key={index}>
                <img className="userimg" src={userImg} alt="" />
                <div className="details">
                  <div className="user">
                    <div className="user-info">
                      <h4>{userName}</h4>
                      <p>{date}</p>
                    </div>
                    <div className="actions">
                      <button className="cancel">
                        <img src="/close.png" alt="" />
                      </button>
                      <button className="check">
                        <img src="/check.png" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="feedback-details">
                    <div className="rating">
                      {Array(rating)
                        .fill()
                        .map((_, index) => (
                          <img key={index} src="/star.png" />
                        ))}
                    </div>
                    <p className="feedback-text">{feedback}</p>
                  </div>
                </div>
              </div>
            )
          )}
        {selectedFeedbackList === "active" &&
          activeFeedbacks?.map(
            ({ userName, feedback, date, userImg, rating }, index) => (
              <div className="feedback-card" key={index}>
                <img className="userimg" src={userImg} alt="" />
                <div className="details">
                  <div className="user">
                    <div className="user-info">
                      <h4>{userName}</h4>
                      <p>{date}</p>
                    </div>
                    <div className="actions">
                      <button className="cancel">
                        <img src="/close.png" alt="" />
                      </button>
                      <button className="check">
                        <img src="/check.png" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="feedback-details">
                    <div className="rating">
                      {Array(rating)
                        .fill()
                        .map((_, index) => (
                          <img key={index} src="/star.png" />
                        ))}
                    </div>
                    <p className="feedback-text">{feedback}</p>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}
