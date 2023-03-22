import "./all-feedbacks.styles.scss";

import { useState, useEffect } from "react";
// import { allFeedbacks, activeFeedbacks } from "./feedbacks";
import {
  getAllFeedbacks,
  getActiveFeedbacks,
  deleteFeedback,
} from "../../../api";

const options = ["all", "active"];
export default function AllFeedbacks() {
  const [selectedFeedbackList, setSelectedFeedbackList] = useState("all");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    changeFeedbackList();
  }, [selectedFeedbackList]);

  async function deleteThisFeedback(_id) {
    console.log(_id);
    const formData = new FormData();
    formData.append("_id", _id);
    try {
      const response = await deleteFeedback(formData);
      console.log({ response });
      if (response.data.status === "success") {
        console.log(response.data);
        changeFeedbackList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function changeFeedbackList() {
    // setSelectedFeedbackList(item);
    if (selectedFeedbackList === "active") {
      try {
        const response = await getActiveFeedbacks();
        if (response.data.status === "success") {
          console.log(response.data.data);
          setFeedbacks(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await getAllFeedbacks();
        if (response.data.status === "success") {
          console.log(response.data.data);
          setFeedbacks(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
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
          feedbacks?.map(
            (
              { _id, username, feedbackText, createdAt, userImg, starRating },
              index
            ) => {
              const date = new Date(createdAt).toDateString();
              return (
                <div className="feedback-card" key={_id}>
                  <img className="userimg" src={userImg} alt="" />
                  <div className="details">
                    <div className="user">
                      <div className="user-info">
                        <h4>{username}</h4>
                        <p>{date}</p>
                      </div>
                      <div className="actions">
                        <button
                          className="cancel"
                          onClick={() => {
                            deleteThisFeedback(_id);
                          }}
                        >
                          <img src="/close.png" alt="" />
                        </button>
                        <button className="check">
                          <img src="/check.png" alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="feedback-details">
                      <div className="rating">
                        {Array(5)
                          .fill()
                          .map((_, index) => (
                            <img
                              key={index}
                              src={
                                starRating - 1 >= index
                                  ? "/star.png"
                                  : "/blank-star.png"
                              }
                              alt="star"
                            />
                          ))}
                      </div>
                      <p className="feedback-text">{feedbackText}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        {selectedFeedbackList === "active" &&
          feedbacks?.map(
            (
              { _id, username, feedbackText, createdAt, userImg, starRating },
              index
            ) => {
              const date = new Date(createdAt).toDateString();
              return (
                <div className="feedback-card" key={_id}>
                  <img className="userimg" src={userImg} alt="" />
                  <div className="details">
                    <div className="user">
                      <div className="user-info">
                        <h4>{username}</h4>
                        <p>{date}</p>
                      </div>
                      <div className="actions">
                        <button
                          className="cancel"
                          onClick={() => {
                            deleteThisFeedback(_id);
                          }}
                        >
                          <img src="/close.png" alt="" />
                        </button>
                        <button className="check">
                          <img src="/check.png" alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="feedback-details">
                      <div className="rating">
                        {Array(starRating)
                          .fill()
                          .map((_, index) => (
                            <img key={index} src="/star.png" />
                          ))}
                      </div>
                      <p className="feedback-text">{feedbackText}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
}
