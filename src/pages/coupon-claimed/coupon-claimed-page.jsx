import "./coupon-claimed.styles.scss";

// components
import CouponCode from "../../components/coupon-code/coupon-code";
import Button from "../../components/button/button";

// utils
import claimedCouponInfo from "./claimed-coupon-info";
import couponDetails from "../coupon/coupon-details";

export default function CouponsClaimedPage() {
  return (
    <div className="coupons-claimed-page">
      <div className="head">
        <div
          className="go-back link"
          onClick={() => {
            history.goBack();
          }}
        >
          <img src="/go-back.png" alt="go back" />
          <p>go back</p>
        </div>
      </div>
      <div className="overview-container">
        <img src="/done.png" alt="done" />
        <div className="overview">
          <div className="detail">
            <p>Cashback Trade In</p>
            <p>30 Minutes</p>
          </div>
          <div className="detail">
            <p>Cashback Confirment By</p>
            <p>1 march 2023</p>
          </div>
          <div className="detail">
            <p>Missing Ticket</p>
            <p>Accepted</p>
          </div>
        </div>
      </div>
      <div className="details-container">
        <h3>Use Code</h3>
        <div className="coupon-link-container">
          <CouponCode couponCode={claimedCouponInfo?.couponCode} />
          <Button>visit site</Button>
        </div>
        <div className="info-container">
          {claimedCouponInfo?.listOfInfo?.map((item, index) => (
            <div className="list" key={index}>
              <h3>{item?.title}</h3>
              <ul>
                {item?.info?.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
