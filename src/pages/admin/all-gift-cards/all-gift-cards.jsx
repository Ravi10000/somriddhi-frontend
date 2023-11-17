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
import { AiOutlinePercentage } from "react-icons/ai";
import CustomDatePicker from "../../../components/custom-date-picker/custom-date-picker";
import Button from "../../../components/button/button";
import dayjs from "dayjs";
import { currencyFormator } from "../../../utils/currency-formator";
import { GoDownload } from "react-icons/go";
import jsonToExcel from "../../../utils/jsonToExcel";
import { MdDownloadDone } from "react-icons/md";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

function AllGiftCards({ setFlash }) {
  const [isFetching, setIsFetching] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  const [skip, setSkip] = useState(0);
  const [totalGiftcards, setTotalGiftcards] = useState(0);
  console.table({ totalGiftcards, skip });
  const [selectedGiftCard, setSelectedGiftCard] = useState(null);
  const [activatedCards, setActivatedCards] = useState([]);
  const [isFetchingActivatedCards, setIsFetchingActivatedCards] =
    useState(false);
  const [isChanging, setIsChanging] = useState(true);
  const [giftcardDiscount, setGiftcardDiscount] = useState(0);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isDownloaded, setIsDownloaded] = useState(false);

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
    console.log({ skip });
    setIsFetching(true);
    try {
      const res = await getAllGiftCards(fromDate, toDate, skip);
      console.log({ res });
      if (res.status === 200) {
        const parsedData = res.data.giftCards.map((item, idx) => {
          item.requestBody = JSON.parse(item.requestBody);
          return item;
        });
        setGiftCards(parsedData);
        setSkip(Math.min(25, res.data.giftcardsCount));
        setTotalGiftcards(res.data.giftcardsCount);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }
  async function handleFetchNextGiftCards() {
    if (skip >= totalGiftcards) {
      return setFlash({
        type: "warning",
        message: "No more giftcards to fetch",
      });
    }
    setIsFetching(true);
    try {
      const res = await getAllGiftCards(fromDate, toDate, skip);
      console.log({ res });
      if (res.status === 200) {
        const parsedData = res.data.giftCards.map((item, idx) => {
          item.requestBody = JSON.parse(item.requestBody);
          return item;
        });
        setGiftCards(parsedData);
        setSkip((ps) => Math.min(parseInt(ps) + 25, totalGiftcards));
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

  async function downloadReport() {
    try {
      const res = await getAllGiftCards(fromDate, toDate, 0, 0);
      const giftCards = res?.data?.giftCards.map((item, idx) => {
        item.requestBody = JSON.parse(item.requestBody);
        return item;
      });
      const giftcardJSON = giftCards.map((giftcard) => ({
        "Order ID": giftcard.orderId,
        "User Name":
          giftcard.requestBody.address.firstname +
          " " +
          giftcard.requestBody.address.lastname,
        "User Email": giftcard.requestBody.address.email,
        "Phone Number": giftcard.requestBody.address.telephone,
        "Transaction ID": giftcard.transaction,
        "Unit Price": currencyFormator(giftcard.unitPrice),
        Quantity: giftcard.qty,
        "Total Amount": currencyFormator(giftcard.totalAmount),
        Date: dayjs(giftcard.createdAt).format("YYYY-MM-DD"),
      }));
      jsonToExcel(giftcardJSON);
      setIsDownloaded(true);
      setFlash({
        type: "success",
        message: "SVC Report downloaded successfully",
      });
      setTimeout(() => {
        setIsDownloaded(false);
      }, 3000);
    } catch (err) {}
  }

  useEffect(() => {
    console.table({ fromDate, toDate, skip });
    if (fromDate || toDate) {
      setSkip(0);
    }
  }, [fromDate, toDate]);

  return (
    <div className={styles.allGiftCards}>
      <form className={styles.head}>
        {/* {selectedGiftCard && (
          <img
            onClick={() => setSelectedGiftCard(null)}
            className={styles.backArrow}
            src="/arrow-left-primary.png"
            alt=""
          />
        )} */}
        <TitleSection
          title="all gift cards"
          noAddButton
          customUI={
            <div className={styles.discountWithLabel}>
              <label htmlFor="discount-input">Change Discount</label>
              <div className={styles.percentageContainer}>
                {/* <TbDiscount2 className={styles.icon} /> */}
                <AiOutlinePercentage className={styles.icon} />
                <input
                  id="discount-input"
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
            </div>
          }
        />
      </form>
      <div className={styles.rangeAndDownload}>
        <h3>Select Date Range: </h3>
        <div className={styles["download_flex_box"]}>
          <div className={styles.selectRange}>
            <div className={styles.datePickers}>
              <CustomDatePicker
                label="From"
                date={fromDate}
                setDate={setFromDate}
              />
              <CustomDatePicker label="To" date={toDate} setDate={setToDate} />
            </div>
            <Button
              onClick={() => {
                if (
                  fromDate &&
                  toDate &&
                  dayjs(fromDate).isAfter(dayjs(toDate))
                ) {
                  return setFlash({
                    type: "error",
                    message: "From date cannot be after To date",
                  });
                }
                handleFetchAllGiftCards();
              }}
            >
              Search
            </Button>
          </div>
          <Button onClick={downloadReport}>
            Download Report{" "}
            {!isDownloaded ? (
              // <GoDownload style={{ height: "20px", width: "fit-content" }} />
              <GoDownload />
            ) : (
              <MdDownloadDone
              // style={{ height: "20px", width: "fit-content" }}
              />
            )}
          </Button>
        </div>
      </div>
      {/* {!selectedGiftCard ? ( */}
      <div className={styles.tableContainer}>
        <table className={styles.table} style={{ maxWidth: "fit-content" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Phone No.</th>
              <th>Transaction ID</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Date</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          {isFetching ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            <tbody>
              {giftCards?.map((giftCard, index) => (
                // <tr key={index} onClick={() => setSelectedGiftCard(giftCard)}>
                <tr key={giftCard._id}>
                  <td>{giftCard.orderId}</td>
                  <td>
                    {giftCard.requestBody.address.firstname}{" "}
                    {giftCard.requestBody.address.lastname}
                  </td>
                  <td>{giftCard.requestBody.address.email}</td>
                  <td>{giftCard.requestBody.address.telephone}</td>
                  <td>{giftCard?.transaction}</td>
                  <td>{currencyFormator(giftCard.unitPrice)}</td>
                  <td>&times; {giftCard.qty}</td>
                  <td>{currencyFormator(giftCard.totalAmount)}</td>
                  <td>{dayjs(giftCard.createdAt).format("YYYY-MM-DD")}</td>
                  {/* <td>{giftCard.status}</td> */}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div
        className="__pagination"
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "20px",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 15px 10px 15px",
            backgroundColor: "lightgray",
            display: "grid",
            placeContent: "center",
          }}
        >
          <GrLinkPrevious />
        </button>
        {!isFetching ? (
          <>
            {skip - 25 + 1}-{skip - 25 + giftCards?.length} of {totalGiftcards}
          </>
        ) : (
          "_ - _ of _"
        )}
        <button
          style={{
            padding: "10px 15px 10px 15px",
            backgroundColor: "lightgray",
            display: "grid",
            placeContent: "center",
          }}
          onClick={handleFetchNextGiftCards}
        >
          <GrLinkNext />
        </button>
      </div>
      {/* // ) : isFetchingActivatedCards ? (
      //   <div className={styles.loaderContainer}>
      //     <div className={styles.loader}></div>
      //   </div>
      // ) : (
      //   <div className={styles.oneGiftCard}>
      //     {activatedCards?.map((card, index) => (
      //       <GiftCard
      //         noImage
      //         key={index}
      //         large
      //         nonClickable
      //         giftCard={{
      //           price: selectedGiftCard?.unitPrice,
      //           image: getRandomImage(),
      //           cardNumber: card?.cardNumber,
      //           cardPin: card?.cardPin,
      //         }}
      //       />
      //     ))}
      //     <div className={styles.details}>
      //       <p></p>
      //     </div>
      //   </div>
      // )} */}
    </div>
  );
}

export default connect(null, { setFlash })(AllGiftCards);
