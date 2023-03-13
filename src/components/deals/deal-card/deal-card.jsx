import "./deal-card.styles.scss";

import React from "react";
import Button from "../../button/button";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
export default function DealCard({
  id,
  imgUrl,
  title,
  details,
  customStyles,
  ...otherProps
}) {
  // const history = useHistory();
  return (
    <Link to={`/coupon/${id}`}>
      <div
        className="deal-card"
        style={customStyles}
        // onClick={() => {
        // history.push(`/coupon/${id}`);
        // }}
        {...otherProps}
      >
        <img src={imgUrl} alt="amazon" />
        <h4 className="title">{title}</h4>
        <p className="discount-details">{details}</p>
        <Button>Grab Now</Button>
      </div>
    </Link>
  );
}
