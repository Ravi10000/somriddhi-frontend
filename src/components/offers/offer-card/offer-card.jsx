import "./offer-card.styles.scss";

import React from "react";
import Button from "../../button/button";
import { Link } from "react-router-dom";

export default function OfferCard({ id, title, discount, imgUrl, ...otherProps }) {
  return (
    <Link to={`/coupon/${id}`}>
      <div className="offer-card" {...otherProps}>
        <h4 className="title">{title}</h4>
        <img src={imgUrl} alt="" />
        <p>{discount}</p>
        <Button>Grab Now</Button>
      </div>
    </Link>
  );
}
