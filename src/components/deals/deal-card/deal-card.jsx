import "./deal-card.styles.scss";

import React, { useEffect } from "react";
import Button from "../../button/button";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
export default function DealCard({
  _id, name, cashbackPercent, image, ...otherProps
}) {
  // const history = useHistory();
  return (
    <Link to={`/coupon/${_id}`}>
      <div
        className="deal-card"
        // onClick={() => {
        // history.push(`/coupon/${id}`);
        // }}
        {...otherProps}
      >
        <img className="dealsImage" src={`${import.meta.env.VITE_REACT_APP_API_URL}/uploads/${image}`} alt="amazon" />
        <h4 className="title">{name}</h4>
        <p className="discount-details">Flat {cashbackPercent}% Off</p>
        <Button>Grab Now</Button>
      </div>
    </Link>
  );
}
