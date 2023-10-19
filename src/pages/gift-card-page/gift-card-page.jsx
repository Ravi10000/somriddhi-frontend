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
import { fetchAllGiftCards } from "../../api";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { currencyFormator } from "../../utils/currency-formator";

function GiftCardPage({ setFlash }) {
  const [giftCards, setGiftCards] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let { price } = useParams();
  price = parseInt(price);
  // const { giftCard } = state;
  // const giftCard = { price: 1, _id: 1 };
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(parseInt(price) * parseInt(quantity));
  const tncRef = useRef();
  const descriptionRef = useRef();
  const tncLinkRef = useRef();

  async function handleFetchGiftCards() {
    try {
      const response = await fetchAllGiftCards();
      console.log({ response });
      const description = response?.data?.data?.description;
      const tnc = response?.data?.data?.tnc;
      console.log({ description });
      console.log({ tnc });
      if (descriptionRef?.current)
        descriptionRef.current.innerHTML = description;
      if (tncRef?.current) tncRef.current.innerHTML = tnc?.content;
      if (tncRef?.current) {
        tncLinkRef.current.innerHTML = tnc?.link;
        tncLinkRef.current.href = response?.data?.data?.tnc?.link;
      }

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
  console.log({ total });
  console.log({ quantity });
  useEffect(() => {
    const newTotal = parseInt(price) * parseInt(quantity);
    if (!(newTotal > 10000)) return setTotal(newTotal);
    setFlash({
      type: "warning",
      message: "₹10000 is the maximum amount you can buy at once.",
    });
    setQuantity((prevQty) => prevQty - 1);
  }, [quantity]);

  // useEffect(() => {
  //   if (contentRef.current)
  //     contentRef.current.innerHTML = giftCards?.tnc?.content;
  // }, [contentRef, giftCards]);

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
            <GiftCard nonClickable giftCard={{ price }} large />
          </div>
          <div className={styles.giftCardDetails}>
            <div className={styles.buttonAndInput}>
              <div className={styles.inputContainer}>
                <div className={styles.quantityInput}>
                  <button
                    className={styles.quantityUpdateBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      if (quantity > 1)
                        setQuantity((prevQuantity) => prevQuantity - 1);
                    }}
                  >
                    <img src="/minus.png" alt="" />
                  </button>
                  <NumInput
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => {
                      if (!e.target.value) return setQuantity(1);
                      if (parseInt(e.target.value) * parseInt(price) > 10000)
                        return setFlash({
                          type: "warning",
                          message:
                            "₹10000 is the maximum amount you can buy at once.",
                        });
                      setQuantity(parseInt(e.target.value));
                    }}
                  />
                  <button
                    className={styles.quantityUpdateBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity((prevQuantity) => prevQuantity + 1);
                    }}
                  >
                    <img src="/plus.png" alt="" />
                  </button>
                </div>
                <div className={styles.total}>
                  <p>Total: &nbsp;</p>
                  <p>
                    {quantity
                      ? // ? parseInt(price) * parseInt(quantity)
                        currencyFormator(total)
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
                      price: price,
                      total: parseInt(price) * parseInt(quantity),
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
        <h3>About Amazon Shopping Voucher</h3>
        <div className={styles.description} ref={descriptionRef}>
          {/* <div ref={descriptionRef}></div> */}
        </div>
      </div>
      <div className={styles.list}>
        <h3>Terms and Conditions</h3>
        <div className={styles.description}>
          <div ref={tncRef}></div>
          Read More: &nbsp;
          <a ref={tncLinkRef} target="_blank" rel="noopener noreferrer" style={{color: "red"}}></a>
        </div>
      </div>
    </>
  );
}

export default connect(null, { setFlash })(GiftCardPage);
