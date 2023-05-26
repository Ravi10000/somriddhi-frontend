import styles from "./gift-card-page.module.scss";
import GiftCard from "../../components/gift-card/gift-card/gift-card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import NumInput from "../../components/num-input/num-input";
import { useState } from "react";

function GiftCardPage() {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();
  const { giftCard } = state;
  const [quantity, setQuantity] = useState(1);

  console.log({ giftCard, pathname, id });

  return (
    <div className={styles.giftCardPage}>
      <div className={styles.head}>
        <div
          className={styles.goBack + " " + styles.link}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="/go-back.png" alt="go back" />
          <p>go back</p>
        </div>
        <div className={styles.share + " " + styles.link}>
          <p>share</p>
          <img src="/share.png" alt="go back" />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.giftCardContainer}>
          <GiftCard giftCard={giftCard} large />
        </div>
        <div className={styles.giftCardDetails}>
          <div className={styles.buttonAndInput}>
            <div className={styles.inputContainer}>
              {/* <p>Quantity: </p> */}
              <div className={styles.quantityInput}>
                <button
                  className={styles.quantityUpdateBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                >
                  <img src="/minus.png" alt="" />
                </button>
                <NumInput
                  // label="Quantity: "
                  placeholder="Quantity"
                  maxLength="5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                  className={styles.quantityUpdateBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    if (quantity < 99999) setQuantity(quantity + 1);
                  }}
                >
                  <img src="/plus.png" alt="" />
                </button>
              </div>
              <div className={styles.total}>
                <p>Total: ₹ &nbsp;</p>
                <p>
                  {quantity
                    ? parseInt(giftCard?.price) * parseInt(quantity)
                    : 0}
                </p>
              </div>
            </div>
            <Button disabled={quantity?.length < 1}>Buy Now</Button>
          </div>
          <div className={styles.list}>
            <h3>About Gift Card</h3>
            <ul>
              <li>{giftCard?.title}</li>
              <li>₹ {giftCard?.price}</li>
              <li>{giftCard?.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCardPage;
