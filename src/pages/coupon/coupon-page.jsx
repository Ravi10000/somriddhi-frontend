import "./coupon.styles.scss";

// packages
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import Button from "../../components/button/button";

// utils
import couponDetails from "./coupon-details";
import getRemaingTime from "../../utils/get-remaining-time";
import CouponCode from "../../components/coupon-code/coupon-code";

export default function CouponPage() {
  const navigate = useNavigate();
  // states
  const [hoursLeft, setHoursLeft] = useState("00");
  const [minutesLeft, setMinutesLeft] = useState("00");
  const [secondsLeft, setSecondsLeft] = useState("00");

  // const hoursLeftRef = useRef(null);
  // const minutesLeftRef = useRef(null);
  // const secondsLeftRef = useRef(null);
  useEffect(() => {
    setInterval(() => {
      let { hours, minutes, seconds } = getRemaingTime(
        couponDetails.expiryDate
      );
      // console.log(hours, minutes, seconds);
      setHoursLeft(hours);
      setMinutesLeft(minutes);
      setSecondsLeft(seconds);
      // hoursLeftRef.current = hours;
      // minutesLeftRef.current = minutes;
      // secondsLeftRef.current = seconds;
    }, 1000);
  }, []);
  return (
    <div className="coupon-page">
      <div className="head">
        <div
          className="go-back link"
          onClick={() => {
            navigate(-1);
          }}
        >
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
              <p className="highlight">{hoursLeft}</p>
              <p>HH</p>
            </div>
            <div className="mm time">
              <p className="highlight">{minutesLeft}</p>
              <p>MM</p>
            </div>
            <div className="ss time">
              <p className="highlight">{secondsLeft}</p>
              <p>SS</p>
            </div>
          </div>
          <img src={couponDetails?.image} alt="coupon image" />
        </div>
        <div className="right">
          <h3>Use Code</h3>
          <div className="coupon-link-container">
            <CouponCode couponCode={couponDetails?.couponCode} />
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
