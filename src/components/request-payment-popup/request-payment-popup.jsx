import styles from "./request-payment-popup.module.scss";
import Backdrop from "../backdrop/backdrop";
import PopupHead from "../popup-head/popup-head";
import Button from "../button/button";
import { useId, useState, useEffect } from "react";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import { getRedeemableCashbacks, redeemCashback } from "../../api";

function RequestPaymentPopup({ setShowPopup, setFlash }) {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [redeemableCashbacks, setRedeemableCashbacks] = useState([]);

  async function fetchRedeemableCashbacks() {
    setLoadingData(true);
    try {
      const response = await getRedeemableCashbacks();
      console.log({response});
      if (response.data.status === "success") {
        setRedeemableCashbacks(response.data.redeemableCashbacks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    fetchRedeemableCashbacks();
  }, []);

  async function submitPaymentRequest(e) {
    e.preventDefault();
    console.log("submitting payment request");
    const formData = new FormData(e.target);
    for (let entry of formData.entries()) {
      console.log(entry);
    }

    if (formData.keys().next().done) {
      return setFlash({
        type: "warning",
        message: "Please select at least one cashback to redeem",
      });
    }
    try {
      setIsLoading(true);
      const response = await redeemCashback(formData);
      console.log({ response });
      if (response.data.status === "success") {
        setFlash({
          type: "success",
          message: "Payment request submitted successfully",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowPopup(false);
      setIsLoading(false);
    }
  }

  return (
    <Backdrop>
      <div className={styles.requestPaymentPopup}>
        <PopupHead title="Request Payment" setShowPopup={setShowPopup} />
        {loadingData ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        ) : redeemableCashbacks?.length > 0 ? (
          <form onSubmit={submitPaymentRequest} className={styles.form}>
            <div className={styles.redeemables}>
              <h3>Select Cashbacks To Redeem</h3>
              {redeemableCashbacks?.map((item, index) => (
                <div className={styles.item} key={index}>
                  <label htmlFor={`${id}-${index}`}>Rs. {item?.amount}</label>
                  <input
                    name={index}
                    value={item?._id}
                    type="checkbox"
                    id={`${id}-${index}`}
                  />
                </div>
              ))}
            </div>
            <Button isLoading={isLoading}>Redeem</Button>
          </form>
        ) : (
          "No redeemable cashbacks found"
        )}
      </div>
    </Backdrop>
  );
}

export default connect(null, { setFlash })(RequestPaymentPopup);
