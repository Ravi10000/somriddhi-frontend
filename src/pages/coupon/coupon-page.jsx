import "./coupon.styles.scss";

// packages
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// components
import Button from "../../components/button/button";

// utils
import couponDetails from "./coupon-details";
import getRemaingTime from "../../utils/get-remaining-time";
import CouponCode from "../../components/coupon-code/coupon-code";
import { getDealById } from "../../api";
// import { getADealData } from "../../api/index.js";

export default function CouponPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // states
  const [hoursLeft, setHoursLeft] = useState("00");
  const [minutesLeft, setMinutesLeft] = useState("00");
  const [secondsLeft, setSecondsLeft] = useState("00");
  const [dealInfo, setDealInfo] = useState([]);
  const info = [
    "Click on Orange button and visit Gizmore",
    "Shop there as you normally do",
    "Cashback will be added to your account",
  ];
  // const url = window.location.href;
  // const dealsId = url.split("/")[4];
  // console.log(dealsId);

  async function getDeal() {
    const response = await getDealById(id);
    console.log({ response });
    // console.log(response.data.data);
    setDealInfo(response.data.deal);
  }

  // useEffect(() => {
  //   dealData({ dealId: dealsId });
  // }, []);
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
    getDeal();
  }, []);

  // let des = dealInfo.description && dealInfo.description.split(".");

  const handleClick = () => {};
  // const handleClick = (url) => {
  //   console.log(url);
  //   window.open(url);
  // };
  // const routeToLink = dealInfo.url;
  // String.prototype.toHHMMSS = function () {
  //   var sec_num = parseInt(this, 10); // don't forget the second param
  //   var hours = Math.floor(sec_num / 3600);
  //   var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  //   var seconds = sec_num - (hours * 3600) - (minutes * 60);

  //   if (hours < 10) { hours = "0" + hours; }
  //   if (minutes < 10) { minutes = "0" + minutes; }
  //   if (seconds < 10) { seconds = "0" + seconds; }
  //   return hours + ':' + minutes + ':' + seconds;
  // }
  // const time = dealInfo.expiryDate.toHHMMSS();
  // const [hrs, setHrs] = useState(time.split(':')[0]);
  // const [mins, setMins] = useState(time.split(':')[1]);
  // const [secs, setSecs] = useState(time.split(':')[2]);
  // useInterval(() => {
  //   if (secs != '00') {
  //     setSecs((Number(hrs) - 1).toString());
  //   }
  // }, 1000)
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
              <p className="highlight">00</p>
              <p>HH</p>
            </div>
            <div className="mm time">
              <p className="highlight">00</p>
              <p>MM</p>
            </div>
            <div className="ss time">
              <p className="highlight">00</p>
              <p>SS</p>
            </div>
          </div>
          {
            dealInfo.image && <img className="dealInfoImage" src={`${import.meta.env.VITE_REACT_APP_API_URL}/uploads/${dealInfo.image}`} alt="coupon image" />
          }

        </div>
        <div className="right">
          <h3>Use Code</h3>
          <div className="coupon-link-container">
            <CouponCode couponCode={couponDetails?.couponCode} />
            <Button onClick={() => handleClick(routeToLink)}>visit site</Button>
          </div>
          <div className="info-container">
            <div className="list">
              <h3>About Coupon</h3>
              <ul>
                {/* {dealInfo.description &&
                  des.map((message, index) => <li>{message}</li>)} */}
              </ul>
            </div>
            <div className="list">
              <h3>About category</h3>
              <ul>
                {/* {dealInfo.description && des.map((message, index) => ( */}
                <li>
                  Started in the year 2018, Gizmore is Smart Accessories and
                  Audio brand in India, known for its fashionable product
                  styling
                </li>
                {/* ))} */}
              </ul>
            </div>
            <div className="list">
              <h3>how to get this offer</h3>
              <ul>
                {info.map((message, index) => (
                  <li>{message}</li>
                ))}
              </ul>
            </div>
            <div className="list">
              <h3>important information</h3>
              <ul>
                <li>Free Shipping on all orders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
