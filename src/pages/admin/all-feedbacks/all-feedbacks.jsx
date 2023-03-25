import "./all-feedbacks.styles.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import { connect } from "react-redux";

// api calls
import {
  getAllFeedbacks,
  getActiveFeedbacks,
  deleteFeedback,
  updateFeedbackStatus,
} from "../../../api";

// components
import FeedbackCard from "./feedback-card/feedback-card";

// redux actions
import { setFlash } from "../../../redux/flash/flash.actions";

function AllFeedbacks({ setFlash }) {
  const options = ["all", "active"];
  const [selectedFeedbackList, setSelectedFeedbackList] = useState("all");
  const [feedbacks, setFeedbacks] = useState([]);

  async function fetchFeedbacks() {
    if (selectedFeedbackList === "active") {
      try {
        const response = await getActiveFeedbacks();
        if (response.data.status === "success") {
          setFeedbacks(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await getAllFeedbacks();
        if (response.data.status === "success") {
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
        setFlash({
          type: "success",
          message: "Feedback Deleted Successfully",
        });
        await fetchFeedbacks();
      }
      setIsDeleting(false);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something Went Wrong, Please Try Again",
      });
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
        setFlash({
          type: "success",
          message: "Feedback Status Updated Successfully",
        });
        await fetchFeedbacks();
      }
      setLoading(false);
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something Went Wrong, Please Try Again",
      });
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

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AllFeedbacks);
