import styles from "./coupon.module.scss";

// packages
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// components
import Button from "../../components/button/button";

// utils
import couponDetails from "./coupon-details";
import getRemaingTime from "../../utils/get-remaining-time";
import CouponCode from "../../components/coupon-code/coupon-code";
import { getDealById } from "../../api";
import axios from "axios";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useLoginModal } from "../../context/login-modal-context";

function CouponPage({ currentUser }) {
  const modal = useLoginModal();

  const { id } = useParams();
  const navigate = useNavigate();
  // states
  const [hoursLeft, setHoursLeft] = useState("00");
  const [minutesLeft, setMinutesLeft] = useState("00");
  const [secondsLeft, setSecondsLeft] = useState("00");
  const [dealInfo, setDealInfo] = useState([]);
  const [analyticId, setAnalyticId] = useState(null);

  const info = [
    "Click on Orange button and visit Gizmore",
    "Shop there as you normally do",
    "Cashback will be added to your account",
  ];

  async function getDeal() {
    const response = await getDealById(id);
    console.log({ response });
    // console.log(response.data.data);
    setDealInfo(response.data.deal);
    const timeLeftTimeer = setInterval(() => {
      let { hours, minutes, seconds } = getRemaingTime(
        response?.data?.deal?.expiryDate
      );
      // console.log(hours, minutes, seconds);
      setHoursLeft(hours);
      setMinutesLeft(minutes);
      setSecondsLeft(seconds);
      // hoursLeftRef.current = hours;
      // minutesLeftRef.current = minutes;
      // secondsLeftRef.current = seconds;
    }, 1000);
    console.log(Date.parse(response.data.deal.expiryDate));
    console.log(Date.parse(new Date(Date.now())));
    if (
      Date.parse(response.data.deal.expiryDate) <
      Date.parse(new Date(Date.now()))
    ) {
      console.log("expired");
      clearInterval(timeLeftTimeer);
    }
  }

  async function sendAnalytics() {
    if (id) {
      const formData = new FormData();
      formData.append("couponId", id);
      // currentUser && formData.append("userId", currentUser?._id);
      formData.append("deviceType", "Web");
      formData.append("startDateTime", new Date(Date.now()).toString());

      try {
        // const { data } = await axios.get("https://geolocation-db.com/json");
        // formData.append("ipAddress", data?.IPv4);

        for (let entry of formData.entries()) {
          console.log(entry);
        }

        const response = await axios.post("/analytic/coupon", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        if (response.data.status === "success") {
          setAnalyticId(response.data.analyticId);
        }
        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function updateEndTime() {
    console.log({ analyticId });
    if (analyticId) {
      try {
        const response = await axios.patch(
          `/analytic/coupon`,
          {
            analyticId,
            endDateTime: new Date(Date.now()).toString(),
          },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    }
    if (!currentUser) {
      return modal.openModal();
    }
    navigate(`//${dealInfo?.url}`);
  }

  useEffect(() => {
    sendAnalytics();
    getDeal();
  }, []);

  return (
    <div className={styles["coupon-page"]}>
      <div className={styles["head"]}>
        <div
          className={styles["go-back"] + " " + styles["link"]}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="/go-back.png" alt="go back" />
          <p>go back</p>
        </div>
        <div className={styles["share"] + " " + styles["link"]}>
          <p>share</p>
          <img src="/share.png" alt="go back" />
        </div>
      </div>
      <div className={styles["coupon-container"]}>
        <div className={styles["left"]}>
          <h3>Deal Ends In</h3>
          <div className={styles["expires-in"]}>
            <div className={styles["time"]}>
              <p className={styles["highlight"]}>{hoursLeft}</p>
              <p>HH</p>
            </div>
            <div className={styles["time"]}>
              <p className={styles["highlight"]}>{minutesLeft}</p>
              <p>MM</p>
            </div>
            <div className={styles["time"]}>
              <p className={styles["highlight"]}>{secondsLeft}</p>
              <p>SS</p>
            </div>
          </div>
          {dealInfo.image && (
            <img
              className={styles["dealInfoImage"]}
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                dealInfo.image
              }`}
              onError={(e) => {
                e && (e.target.src = "/no-photo.png");
              }}
              alt="coupon image"
            />
          )}
        </div>
        <div className={styles["right"]}>
          <h3>Use Code</h3>
          <div className={styles["coupon-link-container"]}>
            <CouponCode couponCode={couponDetails?.couponCode} />
            <Button onClick={updateEndTime}>visit site</Button>
          </div>
          <div className={styles["info-container"]}>
            <div className={styles["list"]}>
              <h3>About Coupon</h3>
              <ul>
                {/* {dealInfo.description &&
                  des.map((message, index) => <li>{message}</li>)} */}
              </ul>
            </div>
            <div className={styles["list"]}>
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
            <div className={styles["list"]}>
              <h3>how to get this offer</h3>
              <ul>
                {info.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
            <div className={styles["list"]}>
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CouponPage);
