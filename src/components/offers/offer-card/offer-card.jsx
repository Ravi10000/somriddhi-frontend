import "./offer-card.styles.scss";

import React from "react";
import Button from "../../button/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OfferCard({
  offer,
  forCoupons,
  noVisit,
  ...otherProps
}) {
  const navigate = useNavigate();

  async function sendCouponAnalytics(id) {
    if (id) {
      const formData = new FormData();
      formData.append("couponId", id);
      // currentUser && formData.append("userId", currentUser?._id);
      formData.append("deviceType", "Web");
      formData.append("couponType", "Coupon");
      formData.append("startDateTime", new Date(Date.now()).toString());

      for (let entry of formData.entries()) {
        console.log(entry);
      }
      try {
        const response = await axios.post("/analytic/coupon", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        console.log({ response });
        if (response.data.status === "success") {
          const analyticId = response.data.analyticId;
          // setAnalyticId(response.data.analyticId);
          navigate(`/coupon/${analyticId}`, { state: { couponId: id } });
        }
        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    // <Link to={`/coupon/${offer?._id}`}>
    <div
      onClick={() => {
        sendCouponAnalytics(offer?._id);
      }}
      // onClick={() => !noVisit && navigate(`/coupon/${offer?._id}`)}
      className="offer-card"
      {...otherProps}
      style={forCoupons ? { border: "none" } : {}}
    >
      <h4 className="title">
        Upto {offer?.cashbackPercent}% off on Appliances
      </h4>
      <img
        className="dealImage"
        src={`${import.meta.env.VITE_REACT_APP_API_URL}/${offer?.image}`}
        onError={(e) => {
          if (e) e.target.src = "/image-broke.png";
        }}
        alt=""
      />
      <p>Upto {offer?.cashbackPercent}% off on summer Appliances</p>
      {/* <Link
        to={"//" + offer?.url}
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
        }}
      > */}
      <Button>Grab Now</Button>
      {/* </Link> */}
    </div>
    // </Link>
  );
}
