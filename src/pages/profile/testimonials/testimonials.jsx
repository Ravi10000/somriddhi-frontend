import "./testimonials.styles.scss";
import React from "react";
const reviews = [
  {
    name: "Savannah Nguyen",
    discount: "Rs.600",
    date: "02 March 2023",
    rating: 5,
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  },
  {
    name: "Savannah Nguyen",
    discount: "Rs.600",
    date: "02 March 2023",
    rating: 3,
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  },
  {
    name: "Savannah Nguyen",
    discount: "Rs.600",
    date: "02 March 2023",
    rating: 4,
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  },
];

export default function Testimonials() {
  return (
    <div className="testimonials">
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
      <button>Write a review</button>
      <div className="reviews">
        {reviews.map(({ name, discount, date, rating, message }, index) => (
          <div className="review-container" key={index}>
            <div className="reviewer-info">
              <img src="/reviewer.png" alt="reviewer" />
              <div className="reviewer-details">
                <p className="name">{name}</p>
                <p className="discount">
                  Total Discount: <span>{discount}</span>
                </p>
              </div>
            </div>
            <div className="review">
              <div className="rating">
                {Array(rating)
                  .fill()
                  .map((_, index) => (
                    <img key={index} src="/star.png" alt="star" />
                  ))}
                {/* <img src="/star.png" alt="star" /> */}
                <p className="date">{date}</p>
              </div>
              <div className="message">
                <p>{message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
