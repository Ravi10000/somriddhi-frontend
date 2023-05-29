import styles from "./gift-card.module.scss";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function GiftCard({ giftCard, large, nonClickable, setFlash }) {
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
        <div className={styles.cardInfoContainer}>
          <div className={styles.cardInfo}>
            <p>
              Card Number: <span>{giftCard?.cardNumber}</span>{" "}
            </p>
            <CopyToClipboard
              text={giftCard?.cardNumber}
              onCopy={() =>
                setFlash({
                  message: "Card Number Copied to clipboard!",
                  type: "success",
                })
              }
            >
              <img className={styles.copyIcon} src="/copy.svg" alt="" />
            </CopyToClipboard>
          </div>
          <div className={styles.cardInfo}>
            <p>
              Card Pin: <span>{giftCard?.cardPin}</span>{" "}
            </p>
            <CopyToClipboard
              text={giftCard?.cardPin}
              onCopy={() =>
                setFlash({
                  message: "Card Pin Copied to clipboard!",
                  type: "success",
                })
              }
            >
              <img className={styles.copyIcon} src="/copy.svg" alt="" />
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(null, { setFlash })(GiftCard);
