import "./offer-card.styles.scss";

import React from "react";
import Button from "../../button/button";

export default function OfferCard({ title, discount, imgUrl, ...otherProps }) {
  return (
    <div className="offer-card" {...otherProps}>
      <h4 className="title">{title}</h4>
      <img src={imgUrl} alt="" />
      <p>{discount}</p>
      <Button>Grab Now</Button>
    </div>
  );
}
