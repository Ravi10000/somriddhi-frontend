import styles from "./gift-card-page.module.scss";
import GiftCard from "../../components/gift-card/gift-card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/button";
import NumInput from "../../components/num-input/num-input";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
// import useRazorpay from "react-razorpay";
// import Razorpay from "razorpay";

import axios from "axios";
import { fetchAllGiftCards } from "../../api";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function GiftCardPage({ setFlash }) {
  const contentRef = useRef();
  const [giftCards, setGiftCards] = useState([]);
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();
  const { giftCard } = state;
  const [quantity, setQuantity] = useState(1);

  async function handleFetchGiftCards() {
    try {
      const response = await fetchAllGiftCards();
      console.log({ response });
      if ((response.status = "Success")) {
        setGiftCards(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchGiftCards();
  }, []);

  useEffect(() => {
    if (quantity > 4) {
      setQuantity(4);
      setFlash({
        type: "warning",
        message: "You can only buy 4 gift cards at a time",
      });
    }
  }, [quantity]);

  // console.log({ giftCard, pathname, id });
  useEffect(() => {
    if (contentRef.current)
      contentRef.current.innerHTML = giftCards?.tnc?.content;
  }, [contentRef, giftCards]);

  return (
    <>
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
            <GiftCard nonClickable giftCard={giftCard} large />
          </div>
          <div className={styles.giftCardDetails}>
            <div className={styles.buttonAndInput}>
              <div className={styles.inputContainer}>
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
                    maxLength="2"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <button
                    className={styles.quantityUpdateBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      if (quantity < 4) setQuantity(quantity + 1);
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
              <Button
                disabled={quantity?.length < 1}
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      qty: quantity,
                      price: giftCard?.price,
                      total: parseInt(giftCard?.price) * parseInt(quantity),
                    },
                  })
                }
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <h3>About Gift Card</h3>
        <div className={styles.description} ref={contentRef}></div>
      </div>
    </>
  );
}

export default connect(null, { setFlash })(GiftCardPage);
