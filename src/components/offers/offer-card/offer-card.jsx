import "./offer-card.styles.scss";

import React from "react";
import Button from "../../button/button";
import { Link, useNavigate } from "react-router-dom";

export default function OfferCard({ offer, forCoupons, ...otherProps }) {
  const navigate = useNavigate();
  return (
    // <Link to={`/coupon/${offer?._id}`}>
    <div
      onClick={() => navigate(`/coupon/${offer?._id}`)}
      className="offer-card"
      {...otherProps}
      style={forCoupons ? { border: "none" } : {}}
    >
      <h4 className="title">
        Upto {offer?.cashbackPercent}% off on Appliances
      </h4>
      <img
        className="dealImage"
        src={`http://localhost:8001/${offer?.image}`}
        alt=""
      />
      <p>Upto {offer?.cashbackPercent}% off on summer Appliances</p>
      <Link
        to={"//" + offer?.url}
        className="btn"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button>Grab Now</Button>
      </Link>
    </div>
    // </Link>
  );
}
