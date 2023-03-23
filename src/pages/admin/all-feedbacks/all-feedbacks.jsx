import "./all-feedbacks.styles.scss";

import { useState, useEffect } from "react";
// import { allFeedbacks, activeFeedbacks } from "./feedbacks";
import {
  getAllFeedbacks,
  getActiveFeedbacks,
  deleteFeedback,
  updateFeedbackStatus,
} from "../../../api";
import FeedbackCard from "./feedback-card/feedback-card";

const options = ["all", "active"];
export default function AllFeedbacks() {
  const [selectedFeedbackList, setSelectedFeedbackList] = useState("all");
  const [feedbacks, setFeedbacks] = useState([]);

  async function fetchFeedbacks() {
    if (selectedFeedbackList === "active") {
      try {
        const response = await getActiveFeedbacks();
        if (response.data.status === "success") {
          // console.log(response.data.data);
          setFeedbacks(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await getAllFeedbacks();
        if (response.data.status === "success") {
          // console.log(response.data.data);
          setFeedbacks(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchFeedbacks();
  }, [selectedFeedbackList]);

  async function deleteThisFeedback(id, setIsDeleting) {
    setIsDeleting(true);
    try {
      const response = await deleteFeedback(id);
      console.log({ response });
      if (response.data.status === "success") {
        console.log(response.data);
        await fetchFeedbacks();
      }
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateStatus(id, status, setLoading) {
    setLoading(true);
    try {
      const response = await updateFeedbackStatus({ id, status });
      console.log({ response });
      if (response.data.status === "success") {
        console.log(response.data);
        await fetchFeedbacks();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
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
          feedbacks?.map((feedback) => {
            return (
              <FeedbackCard
                key={feedback?._id}
                feedback={feedback}
                handleUpdateStatus={handleUpdateStatus}
                deleteThisFeedback={deleteThisFeedback}
              />
            );
          })}
        {selectedFeedbackList === "active" &&
          feedbacks?.map((feedback) => {
            return (
              <FeedbackCard
                feedback={feedback}
                key={feedback?._id}
                handleUpdateStatus={handleUpdateStatus}
              />
            );
          })}
      </div>
    </div>
  );
}
