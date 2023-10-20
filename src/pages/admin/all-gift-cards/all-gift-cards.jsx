import styles from "./all-gift-cards.module.scss";
import { useState } from "react";
import TitleSection from "../title-section/title-section";
import { useEffect } from "react";
import { getActivatedCards, getAllGiftCards } from "../../../api";
import GiftCard from "../../../components/gift-card/gift-card";
import getRandomImage from "../../../data/gift-card-images";
import TextInput from "../../../components/text-input/text-input";
import { TbDiscount2 } from "react-icons/tb";
import {
  fetchGiftcardDiscount,
  manageGiftcardDiscount,
} from "../../../api/giftcard.req";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { setFlash } from "../../../redux/flash/flash.actions";
import { connect } from "react-redux";

function AllGiftCards({ setFlash }) {
  const [isFetching, setIsFetching] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  const [selectedGiftCard, setSelectedGiftCard] = useState(null);
  const [activatedCards, setActivatedCards] = useState([]);
  const [isFetchingActivatedCards, setIsFetchingActivatedCards] =
    useState(false);
  const [isChanging, setIsChanging] = useState(true);
  const [giftcardDiscount, setGiftcardDiscount] = useState(0);

  async function handleFetchGiftcardDiscount() {
    try {
      const res = await fetchGiftcardDiscount();
      console.log({ res });
      const discountPercentage = res?.data?.discount?.discountPercentage;
      if (discountPercentage) {
        console.log({ discountPercentage });
        setGiftcardDiscount(parseFloat(discountPercentage));
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setIsChanging(false);
    }
  }

  function handleFloatInputChange(e) {
    const percentage = e.target.value;
    if (percentage?.length < 1) return setGiftcardDiscount(0);
    const validNumber = /^\d*\.?\d*$/.test(percentage);
    if (!validNumber) return;
    if (
      percentage?.length > 1 &&
      percentage?.[0] === "0" &&
      percentage?.[1] !== "."
    )
      return setGiftcardDiscount(percentage?.slice(1));

    if (isNaN(percentage)) setGiftcardDiscount(0);
    setGiftcardDiscount(percentage);
  }

  async function handleDiscountChange() {
    try {
      setIsChanging(true);
      const res = await manageGiftcardDiscount(parseFloat(giftcardDiscount));
      console.log({ res });
      if (res?.data?.status === "success") {
        setFlash({
          type: "success",
          message: "Discount percentage updated successfully",
        });
      }
    } catch (err) {
      console.log(err);
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
    } finally {
      setIsChanging(false);
    }
  }
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
    handleFetchGiftcardDiscount();
  }, []);

  return (
    <div className={styles.allGiftCards}>
      <form className={styles.head}>
        {selectedGiftCard && (
          <img
            onClick={() => setSelectedGiftCard(null)}
            className={styles.backArrow}
            src="/arrow-left-primary.png"
            alt=""
          />
        )}
        <TitleSection
          title="all gift cards"
          noAddButton
          customUI={
            <div className={styles.percentageContainer}>
              <TbDiscount2 className={styles.icon} />
              <input
                type="text"
                className={styles.percentageInput}
                value={giftcardDiscount}
                onChange={handleFloatInputChange}
                // onChange={(e) => {
                //   if (e.target.value?.length < 1) return setGiftcardDiscount(0);
                //   if (e.target.value?.length > 1 && e.target.value[0] === "0")
                //     return setGiftcardDiscount(
                //       parseFloat(e.target.value.slice(1))
                //     );
                //   setGiftcardDiscount(parseFloat(e.target.value));
                // }}
                maxLength={4}
                inputMode="numeric"
              />
              <button
                className={styles.setPercentageBtn}
                onClick={handleDiscountChange}
              >
                {isChanging ? (
                  <div className={styles.loader}></div>
                ) : (
                  <BsFillArrowRightCircleFill className={styles.goBtn} />
                )}
              </button>
            </div>
          }
        />
      </form>
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

export default connect(null, { setFlash })(AllGiftCards);
