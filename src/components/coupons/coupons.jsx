import "./coupons.styles.scss";
import couponsCategoryList from "./coupons-category-list";

export default function Coupons() {
  return (
    <section className="coupons-section">
      <div className="container">
        <h2 className="_title">Coupon By Categories</h2>
        <div className="container">
          <div className="cards-section">
            {couponsCategoryList.map(({ name, img }, index) => (
              <div
                className={`coupon-category-card ${index == 0 && "selected"}`}
              >
                <img src={img} alt="category" />
                <h5>{name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
