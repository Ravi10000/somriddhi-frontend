import "./coupon.styles.scss";

import React from "react";
import Button from "../../components/button/button";
import couponDetails from "./coupon-details";
export default function CouponPage() {
  return (
    <div className="coupon-page">
      <div className="head">
        <div className="go-back link">
          <img src="/go-back.png" alt="go back" />
          <p>go back</p>
        </div>
        <div className="share link">
          <p>share</p>
          <img src="/share.png" alt="go back" />
        </div>
      </div>
      <div className="coupon-container">
        <div className="left">
          <h3>Deal Ends In</h3>
          <div className="expires-in">
            <div className="hh time">
              <p className="highlight">20</p>
              <p>HH</p>
            </div>
            <div className="mm time">
              <p className="highlight">10</p>
              <p>MM</p>
            </div>
            <div className="ss time">
              <p className="highlight">23</p>
              <p>SS</p>
            </div>
          </div>
          <img src={couponDetails?.image} alt="" />
        </div>
        <div className="right">
          <h3>Use Code</h3>
          <div className="coupon-link-container">
            <div className="coupon-text">
              <img src="/coupon-bg.png" alt="coupon background" />
              <p>{couponDetails?.couponCode}</p>
            </div>
            <Button>visit site</Button>
          </div>
          <div className="info-container">
            {couponDetails?.listOfInfo?.map((item, index) => (
              <div className="list" key={index}>
                <h3>{item?.title}</h3>
                <ul>
                  {item?.info?.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
