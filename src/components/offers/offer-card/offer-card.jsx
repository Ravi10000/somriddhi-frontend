import "./offer-card.styles.scss";

import React from "react";
import Button from "../../button/button";

export default function OfferCard({ offer, forCoupons, ...otherProps }) {
  return (
    <a href={offer?.url} target="_blank" rel="noopener noreferrer">
      <div
        className="offer-card"
        {...otherProps}
        style={forCoupons ? { border: "none" } : {}}
      >
        <h4 className="title">
          Upto {offer?.cashbackPercent}% off on Appliances
        </h4>
        <img
          className="dealImage"
          src={`${process.env.REACT_APP_API_URL}/${offer?.image}`}
          alt=""
        />
        <p>Upto {offer?.cashbackPercent}% off on summer Appliances</p>
        {/* <Link to={`/coupon/${offer?._id}`} className="btn"> */}
        <Button>Grab Now</Button>
        {/* </Link> */}
      </div>
    </a>
  );
}
