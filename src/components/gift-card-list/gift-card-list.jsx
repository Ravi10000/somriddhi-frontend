import styles from "./gift-card-list.module.scss";

// api calls
import GiftCardSlider from "../gift-card-slider/gift-card-slider";

export default function GiftCardList() {
  return (
    <section className={styles["offers-section"]} id="gift-cards">
      <h2 className="_title">Amazon Shopping Vouchers</h2>
      <div className={styles["offer-carousel"]}>
        <GiftCardSlider />
      </div>
    </section>
  );
}
