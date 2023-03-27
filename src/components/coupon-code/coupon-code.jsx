import "./coupon-code.styles.scss";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function CouponCode({ couponCode, setFlash }) {
  return (
    <div className="coupon-code">
      <img src="/coupon-bg.png" alt="coupon background" />
      <img
        className="copy-code"
        src="/copy.png"
        alt="copy code"
        onClick={() => {
          setFlash({
            type: "success",
            message: "Coupon code copied to clipboard",
          });
          navigator.clipboard.writeText(couponCode);
        }}
      />
      <p>{couponCode}</p>
    </div>
  );
}

export default connect(null, { setFlash })(CouponCode);
