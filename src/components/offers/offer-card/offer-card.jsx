import "./offer-card.styles.scss";

import React from "react";
import Button from "../../button/button";
import { Link } from "react-router-dom";

export default function OfferCard({ _id, name, cashbackPercent, image, ...otherProps }) {
  return (
    <Link to={`/coupon/${_id}`}>
      <div className="offer-card" {...otherProps}>
        <h4 className="title">Upto {cashbackPercent}% off on Appliances</h4>
        <img className="dealImage" src={`http://localhost:8001/uploads/${image}`} alt="" />
        <p>Upto {cashbackPercent}% off on summer Appliances</p>
        <Button>Grab Now</Button>
      </div>
    </Link>
  );
}
