import styles from "./gift-card-list.module.scss";

// api calls
import GiftCardSlider from "../gift-card-slider/gift-card-slider";

export default function GiftCardList() {
  return (
    <section className={styles["offers-section"]}>
      <h2 className="_title">Gift Cards</h2>
      <div className={styles["offer-carousel"]}>
        <GiftCardSlider />
      </div>
    </section>
  );
}
