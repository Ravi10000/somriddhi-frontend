import { useNavigate } from "react-router-dom";
import styles from "./gift-card.module.scss";

function GiftCard({ giftCard, large }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.giftCard + " " + (large ? styles.large : "")}
      onClick={() => {
        navigate(`/giftcard/${giftCard?._id}`, { state: { giftCard } });
      }}
    >
      <img className={styles.giftCardImg} src={giftCard?.image} alt="" />
      <div className={styles.titleAndPriceContainer}>
        <div className={styles.titleContainer}>
          <img
            className={styles.logo}
            src="/Somriddhi Final Logo-03.png"
            alt=""
          />
          <h5 className={styles.title}>{/*giftCard?.title*/}Gift Card</h5>
        </div>
        <span className={styles.seperator}></span>
        <p className={styles.price}>₹ {giftCard?.price}</p>
      </div>
      <p className={styles.endMessage}>Your personal message!</p>
    </div>
  );
}

export default GiftCard;
