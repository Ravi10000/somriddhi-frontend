import styles from "./coupon.module.scss";

// packages
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// components
import Button from "../../components/button/button";

// utils
import couponDetails from "./coupon-details";
import getRemaingTime from "../../utils/get-remaining-time";
import CouponCode from "../../components/coupon-code/coupon-code";
import {
  getDealById,
  getCategoryById,
  getBannerById,
  getMembershipById,
} from "../../api";
import axios from "axios";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useLoginModal } from "../../context/login-modal-context";

function CouponPage({ currentUser }) {
  const modal = useLoginModal();
  const { state } = useLocation();
  const couponId = state?.couponId;

  const { id } = useParams();
  const navigate = useNavigate();
  // states
  const [hoursLeft, setHoursLeft] = useState("00");
  const [minutesLeft, setMinutesLeft] = useState("00");
  const [secondsLeft, setSecondsLeft] = useState("00");
  const [dealInfo, setDealInfo] = useState([]);
  // console.log({ dealInfo });
  // const [id, setAnalyticId] = useState(null);
  // const [dealInfo?.description, setDealInfo?.description] = useState(null);
  const [catDes, setCatDes] = useState(null);
  var [catUrl, setCatUrl] = useState(null);

  const info = [
    "Click on Orange button and visit Gizmore",
    "Shop there as you normally do",
    "Cashback will be added to your account",
  ];

  async function getDeal() {
    let response = {};
    try {
      response = await getDealById(couponId);
      console.log({ response });
      // console.log(response.data.data);
      // setDealInfo?.description(response.data.deal.description);
      setDealInfo(response.data.deal);
    } catch (error) {
      console.log(error);
    }
    // if (state?.couponType === "Coupon") {
    //   try {
    //     response = await getDealById(couponId);
    //     console.log({ response });
    //     // console.log(response.data.data);
    //     // setDealInfo?.description(response.data.deal.description);
    //     setDealInfo(response.data.deal);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else if (state?.couponType === "Banner") {
    //   try {
    //     response = await getBannerById(couponId);
    //     console.log({ response });
    //     setDealInfo(response.data.banner);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else if (state?.couponType === "Membership") {
    //   try {
    //     response = await getMembershipById(couponId);
    //     console.log({ response });
    //     setDealInfo(response.data.membership);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // if (!["Banner", "Membership"].includes(state?.couponType)) {
    try {
      const responseCat = await getCategoryById(
        response?.data?.deal.categoryId
      );
      console.log(responseCat?.data?.category?.description);
      setCatDes(responseCat?.data?.category?.description);
      setCatUrl(response?.data?.deal?.url);
    } catch (error) {
      console.log(error);
    }
    // }

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
    // console.log(Date.parse(response.data.deal.expiryDate));
    // console.log(Date.parse(new Date(Date.now())));
    if (
      Date.parse(response?.data?.deal?.expiryDate) <
      Date.parse(new Date(Date.now()))
    ) {
      console.log("expired");
      clearInterval(timeLeftTimeer);
    }
  }

  async function updateEndTime() {
    console.log({ analyticId: id });
    if (!currentUser) {
      return modal.openModal();
    }
    if (id) {
      try {
        const response = await axios.patch(
          `/analytic/coupon`,
          {
            analyticId: id,
            endDateTime: new Date(Date.now()).toString(),
          },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log({ response });
        if (response.data.status === "success") {
          console.log("updated");
          const analyticId = response.data.analyticId;
          navigate(`//${dealInfo?.url}/&ascsubtag=${analyticId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // const sym1 = '&';
    // navigate(`${dealInfo?.url}&ascsubtag=${id}`);
    // const navigateLink = `${catUrl}${sym1}ascsubtag=${id}`
    // console.log(navigateLink)
    // location.href = 'https://' + navigateLink
    // console.log(window.open(navigateLink, '_blank'));
    // console.log(catUrl);
    // if (catUrl.startsWith("//")) catUrl = catUrl.substring(2).trim();
    // if (!catUrl.startsWith("https://")) catUrl = "https://" + catUrl;
    // console.log(catUrl);

    // window.location.replace(`${catUrl}&ascsubtag=${id}`);
    // navigate(`http://localhost:30002/coupon/${id}&ascsubtag=<_id>`);
  }

  // let currentFullUrl = window.location.href;
  // let currentCouponUrl = currentFullUrl.split('/')[4];
  // console.log(id);
  // let dealInfo?.descriptionArray = dealInfo?.description.split('.');
  // console.log(dealInfo?.descriptionArray);
  useEffect(() => {
    // sendAnalytics();
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
                e && (e.target.src = "/image-broke.png");
              }}
              alt="coupon image"
            />
          )}
        </div>
        <div className={styles["right"]}>
          {/* <h3>Use Code</h3> */}
          <div className={styles["coupon-link-containerTwo"]}>
            {/* <CouponCode couponCode={couponDetails?.couponCode} /> */}
            <Button onClick={updateEndTime}>visit site</Button>
          </div>
          <div className={styles["info-container"]}>
            <div className={styles["list"]}>
              <h3>About Coupon</h3>
              <ul>
                {<li>{dealInfo?.description}</li>}
                {/* {dealInfo.description &&
                  des.map((message, index) => <li>{message}</li>)} */}
              </ul>
            </div>
            <div className={styles["list"]}>
              <h3>About category</h3>
              <ul>
                {<li>{catDes}</li>}
                {/* {dealInfo.description && des.map((message, index) => ( */}
                {/* <li>
                  Started in the year 2018, Gizmore is Smart Accessories and
                  Audio brand in India, known for its fashionable product
                  styling
                </li> */}
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
