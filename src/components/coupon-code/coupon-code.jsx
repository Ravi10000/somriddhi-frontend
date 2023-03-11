import "./coupon-code.styles.scss";

export default function CouponCode({ couponCode }) {
  return (
    <div className="coupon-code">
      <img src="/coupon-bg.png" alt="coupon background" />
      <img
        className="copy-code"
        src="/copy.png"
        alt="copy code"
        onClick={() => {
          navigator.clipboard.writeText(couponCode);
        }}
      />
      <p>{couponCode}</p>
    </div>
  );
}
