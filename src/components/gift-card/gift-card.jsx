import styles from "./gift-card.module.scss";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { currencyFormator } from "../../utils/currency-formator";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdRedeem } from "react-icons/md";

function GiftCard({ giftCard, large, nonClickable, setFlash, noImage }) {
  const navigate = useNavigate();
  // const price = currencyFormator(giftCard?.price);

  return (
    <div
      className={styles.giftCard + " " + (large ? styles.large : "")}
      style={{ cursor: nonClickable ? "default" : "pointer" }}
      onClick={() => {
        if (nonClickable) return;
        navigate(`/giftcard/${giftCard?.price}`);
        // navigate(`/giftcard/${giftCard?._id}`, { state: { giftCard } });
      }}
    >
      {!noImage && (
        // <img className={styles.giftCardImg} src={giftCard?.image} alt="" />
        <img
          className={styles.giftCardImg}
          src="/gift-card-amazon.png"
          alt=""
        />
      )}
      <div className={styles.titleAndPriceContainer}>
        <div className={styles.titleContainer}>
          <img
            className={styles.logo}
            // src="/Somriddhi Final Logo-03.png"
            // src="/amazon.png"
            src="/amazon-shoping-voucher-logo.png"
            alt=""
          />
          {/* <h5 className={styles.title}>giftCard?.titleShopping Card</h5> */}
        </div>
        <span className={styles.seperator}></span>
        <p className={styles.price}>{currencyFormator(giftCard?.price)}</p>
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
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() =>
                window.open(
                  // `https://www.amazon.in/gp/css/gc/payment?ie=UTF8&amp;actionType=add&amp;claimCode=${giftCard?.cardPin}&amp;ref_=gc_ya_subnav_balance&amp;txtLeftButton=ApplytoYourAccount`,
                  `https://www.amazon.in/apay-products/apv/landing?voucherCode=${giftCard?.cardPin}`,
                  "__blank"
                )
              }
            >
              Redeem <MdRedeem className={styles.icon} />
            </button>
            {/* <button
              className={styles.button}
              onClick={() => giftCard?.setSelectedGiftcard(giftCard)}
            >
              Share <AiOutlineShareAlt className={styles.icon} />
            </button> */}
          </div>
          <div
            className={styles.sendCheckboxContainer}
            onClick={() => giftCard?.setSelectedGiftcard(giftCard)}
          >
            <input
              className={styles.checkbox}
              type="checkbox"
              id="share-giftcard"
            />
            <label htmlFor="share-giftcard">Send to Someone</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(null, { setFlash })(GiftCard);
