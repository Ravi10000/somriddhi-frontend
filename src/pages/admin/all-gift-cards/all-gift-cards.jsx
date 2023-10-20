import styles from "./all-gift-cards.module.scss";
import { useState } from "react";
import TitleSection from "../title-section/title-section";
import { useEffect } from "react";
import { getActivatedCards, getAllGiftCards } from "../../../api";
import GiftCard from "../../../components/gift-card/gift-card";
import getRandomImage from "../../../data/gift-card-images";

function AllGiftCards() {
  const [isFetching, setIsFetching] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  const [selectedGiftCard, setSelectedGiftCard] = useState(null);
  const [activatedCards, setActivatedCards] = useState([]);
  const [isFetchingActivatedCards, setIsFetchingActivatedCards] =
    useState(false);

  console.log({ giftCards });
  async function handleFetchAllGiftCards() {
    setIsFetching(true);
    try {
      const res = await getAllGiftCards();
      console.log({ res });
      if (res.status === 200) {
        const parsedData = res.data.giftCards.map((item, idx) => {
          item.requestBody = JSON.parse(item.requestBody);
          return item;
        });
        setGiftCards(parsedData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function handleFetchActivatedCards() {
    setIsFetchingActivatedCards(true);
    if (!selectedGiftCard) return;
    try {
      const res = await getActivatedCards(selectedGiftCard.orderId);
      if (res.status === 200) {
        setActivatedCards(res.data.activatedCards.cards);
      }
      console.log({ res });
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetchingActivatedCards(false);
    }
  }

  useEffect(() => {
    handleFetchActivatedCards();
  }, [selectedGiftCard]);

  useEffect(() => {
    handleFetchAllGiftCards();
  }, []);

  return (
    <div className={styles.allGiftCards}>
      <div className={styles.head}>
        {selectedGiftCard && (
          <img
            onClick={() => setSelectedGiftCard(null)}
            className={styles.backArrow}
            src="/arrow-left-primary.png"
            alt=""
          />
        )}
        <TitleSection title="all gift cards" noAddButton />
      </div>
      {!selectedGiftCard ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Phone No.</th>
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
                    <td>
                      {giftCard.requestBody.address.firstname}{" "}
                      {giftCard.requestBody.address.lastname}
                    </td>
                    <td>{giftCard.requestBody.address.email}</td>
                    <td>{giftCard.requestBody.address.telephone}</td>
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
      ) : isFetchingActivatedCards ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.oneGiftCard}>
          {activatedCards?.map((card, index) => (
            <GiftCard
              noImage
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

export default AllGiftCards;
