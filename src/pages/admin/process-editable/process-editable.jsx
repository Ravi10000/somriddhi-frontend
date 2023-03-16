import "./process-editable.styles.scss";

import React from "react";

export default function ProcessEditable() {
  return (
    <section className="process-section">
      {/* <h2 className="_title">How It Works?</h2> */}
      <div className="process-cards-container">
        <div className="process-card">
          <div className="img-container">
            <img src="/signup.png" alt="" />
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <div className="title">
            <h4>signup</h4>
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <div className="desc">
            <p>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there
            </p>
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <img className="arrow" src="/arrow.png" alt="" />
        </div>
        <div className="process-card">
          <div className="img-container">
            <img src="/coupon.png" alt="" />
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <div className="title">
            <h4>Choose Coupon</h4>
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <div className="desc">
            <p>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there
            </p>
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <img className="arrow flip" src="/arrow-fliped.png" alt="" />
        </div>
        <div className="process-card">
          <div className="img-container">
            <img src="/coupon2.png" alt="" />
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <div className="title">
            <h4>Grab Coupon</h4>
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
          <div className="desc">
            <p>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there
            </p>
            <div className="edit-icon-container">
              <img className="edit-icon" src="/edit.png" alt="edit img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
