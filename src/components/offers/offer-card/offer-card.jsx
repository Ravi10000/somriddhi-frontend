import "./offer-card.styles.scss";

import React from "react";
import Button from "../../button/button";
import { Link } from "react-router-dom";

export default function OfferCard({
  _id,
  name,
  cashbackPercent,
  image,
  forCoupons,
  ...otherProps
}) {
  return (
    <div
      className="offer-card"
      {...otherProps}
      style={forCoupons ? { border: "none" } : {}}
    >
      <h4 className="title">Upto {cashbackPercent}% off on Appliances</h4>
      <img
        className="dealImage"
        src={`http://localhost:8001/${image}`}
        alt=""
      />
      <p>Upto {cashbackPercent}% off on summer Appliances</p>
      <Link to={`/coupon/${_id}`} className="btn">
        <Button>Grab Now</Button>
      </Link>
    </div>
  );
}
