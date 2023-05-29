import styles from "./my-gift-cards.module.scss";
import { useEffect } from "react";
import { getActivatedCards, getGiftCards } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GiftCard from "../../../components/gift-card/gift-card";
import getRandomImage from "../../../data/gift-card-images";

function MyGiftCards() {
  const [giftCards, setGiftCards] = useState([]);
  const [selectedGiftCard, setSelectedGiftCard] = useState(null);
  const [activatedCards, setActivatedCards] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();
  console.log({ activatedCards });

  async function handleFetchGiftCards() {
    setIsFetching(true);
    try {
      const res = await getGiftCards();
      if (res.status === 200) {
        setGiftCards(res.data.myOrders);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function handleFetchActivatedCards() {
    if (!selectedGiftCard) return;
    try {
      const res = await getActivatedCards(selectedGiftCard.orderId);
      if (res.status === 200) {
        setActivatedCards(res.data.activatedCards.cards);
      }
      console.log({ res });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFetchActivatedCards();
  }, [selectedGiftCard]);

  useEffect(() => {
    handleFetchGiftCards();
  }, []);
  return (
    <div className={styles.myGiftCards}>
      <h2 className={styles.title}>
        {selectedGiftCard && (
          <img
            onClick={() => setSelectedGiftCard(null)}
            className={styles.backArrow}
            src="/arrow-left-primary.png"
            alt=""
          />
        )}
        <span>My Gift Cards</span>
      </h2>
      {!selectedGiftCard ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                {/* <th>Ref No.</th> */}
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            {isFetching ? (
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
              </div>
            ) : (
              <tbody>
                {giftCards?.map((giftCard, index) => (
                  <tr key={index} onClick={() => setSelectedGiftCard(giftCard)}>
                    <td>{giftCard.orderId}</td>
                    <td>{giftCard.unitPrice}</td>
                    <td>&times; {giftCard.qty}</td>
                    <td>{giftCard.totalAmount}</td>
                    <td>{giftCard.status}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      ) : (
        <div className={styles.oneGiftCard}>
          {activatedCards?.map((card, index) => (
            <GiftCard
              key={index}
              large
              nonClickable
              giftCard={{
                price: selectedGiftCard?.unitPrice,
                image: getRandomImage(),
                cardNumber: card?.cardNumber,
                cardPin: card?.cardPin,
              }}
            />
          ))}
          <div className={styles.details}>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGiftCards;
