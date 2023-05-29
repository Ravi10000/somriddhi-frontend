import { useNavigate } from "react-router-dom";
import styles from "./gift-card.module.scss";

function GiftCard({ giftCard, large, nonClickable }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.giftCard + " " + (large ? styles.large : "")}
      onClick={() => {
        if (nonClickable) return;
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
      {!giftCard?.cardNumber ? (
        <p className={styles.endMessage}>Your personal message!</p>
      ) : (
        <div className={styles.cardInfo}>
          <p>Card Pin: {giftCard?.cardPin}</p>
          <p>Card Number: {giftCard?.cardNumber}</p>
        </div>
      )}
    </div>
  );
}

export default GiftCard;
