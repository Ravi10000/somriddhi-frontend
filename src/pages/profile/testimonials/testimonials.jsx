import "./testimonials.styles.scss";
import React, { useState, useEffect } from "react";
import { getActiveFeedbacks } from "../../../api";

import AddFeedbackPopup from "../../../components/add-feedback-popup/add-feedback-popup";
import Button from "../../../components/button/button";
export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  async function fetchFeedbacks() {
    try {
      const response = await getActiveFeedbacks();
      console.log({ response });
      setReviews(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="testimonials">
      {isModelOpen && (
        <AddFeedbackPopup
          setShowPopup={setIsModelOpen}
          fetchFeedbacks={fetchFeedbacks}
        />
      )}
      <h2>Testimonials</h2>
      <p>
        Lakhs of Indians visit CashKaro every day and make the most of our best
        offers to get the best deals plus some extra Cashback, right into their
        bank account. CashKaro reviews from these users show how our deals and
        offers have held up over the years. These reviews are filled with
        appreciation from our users who are ecstatic about getting the best
        discount coupons and extra Cashback, only through CashKaro. CashKaro is
        the brainchild of Swati and Rohan Bhargava, who launched the platform
        back in 2011 in the UK, bringing it to Indian customers in 2013. Since
        its inception, CashKaro has distributed hundreds of crores in Cashback
        to its customers and has contributed billions of dollars in GMV for
        online retailers to become the undisputed king of Cashback in India.
        Billionaire tycoon Ratan Tata has also invested in CashKaro, because he
        also believes that Indians love to #GetMoreHamesha!
      </p>
      <Button
        onClick={() => {
          window.scrollTo(0, 0);
          setIsModelOpen(true);
        }}
      >
        Write a review
      </Button>
      <div className="reviews">
        {reviews?.map(
          ({ username, createdAt, starRating, feedbackText }, index) => {
            const date = new Date(createdAt).toDateString();
            return (
              <div className="review-container" key={index}>
                <div className="reviewer-info">
                  <img src="/reviewer.png" alt="reviewer" />
                  <div className="reviewer-details">
                    <h4 className="name">{username}</h4>
                    {/* <p className="discount">
                      Total Discount: <span>{discount}</span>
                    </p> */}
                  </div>
                </div>
                <div className="review">
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
                    <p className="date">{date}</p>
                  </div>
                  <div className="message">
                    <p>{feedbackText}</p>
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
