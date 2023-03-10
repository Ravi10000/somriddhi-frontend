import "./deal-card.styles.scss";

import React from "react";
import Button from "../../button/button";

export default function DealCard({ imgUrl, title, details, customStyles }) {
  return (
    <div className="deal-card" style={customStyles}>
      <img src={imgUrl} alt="amazon" />
      <h4 className="title">{title}</h4>
      <p className="discount-details">{details}</p>
      <Button>Grab Now</Button>
    </div>
  );
}
