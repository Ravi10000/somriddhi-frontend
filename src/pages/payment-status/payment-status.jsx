import styles from "./payment-status.module.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTransaction, orderGiftCard } from "../../api/transaction";
import { BiSolidErrorCircle } from "react-icons/bi";
import { MdPending } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import { MdSmsFailed } from "react-icons/md";

function PaymentStatusPage() {
  const [isFetching, setIsFetching] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  console.log({ response });
  if (!id) return navigate("/");

  async function handleFetchTransaction() {
    setIsFetching(true);
    try {
      const res = await fetchTransaction(id);
      console.log({ res });
      if (
        res?.data?.transaction?.status === "pending" ||
        res?.data?.transaction?.status === "initiated"
      ) {
        setTimeout(() => {
          handleFetchTransaction();
        }, 5000);
      } else if (res?.data?.transaction?.status === "paid") {
        console.log("placing order...");
        const orderResponse = await handlePlaceOrder(res?.data?.transaction);
        console.log({ orderResponse });
      }
      setResponse(res.data);
    } catch (err) {
      console.log(err);
      setResponse({ status: "error" });
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    handleFetchTransaction();
  }, []);

  async function handlePlaceOrder(transaction) {
    console.log({ transaction });
    // try {
    //   const {
    //     line1,
    //     line2,
    //     state,
    //     district,
    //     postcode,
    //     firstname,
    //     lastname,
    //     // salutation,
    //     quantity,
    //     unitPrice,
    //     amount,
    //   } = transaction;
    //   let paymentMethod = transaction?.method;
    //   let paymentDetails = {};
    //   if (paymentMethod === "yespay") {
    //     paymentDetails = JSON.parse(transaction?.yesPayResponse); //yesPayResponse
    //   } else if (paymentMethod === "phonepe") {
    //     paymentDetails = JSON.parse(transaction?.phonePeResponse); //phonePeResponse
    //   }
    //   console.log({ paymentDetails });
    //   const paymentid =
    //     paymentMethod === "yespay"
    //       ? paymentDetails?.transaction_details
    //           ?.transaction_no /* according to yespay response */
    //       : paymentDetails?.data
    //           ?.transactionId; /* according to phone pe response */
    //   const requestData = {
    //     // TODO: update request as per checkout form
    //     address: `${firstname} ${lastname}, ${line1}, ${
    //       line2 ? line2 : ""
    //     }, ${district}, ${state}, ${postcode}`,
    //     totalAmount: amount,
    //     qty: quantity,
    //     unitPrice,
    //     paymentid,
    //   };
    //   requestData.billingAddress = requestData.address;
    //   const orderResponse = await orderGiftCard(requestData);
    //   console.log({ orderResponse });
    // } catch (err) {
    //   console.log(err);
    // }
  }
  console.log(response?.transaction?.status);
  // useEffect(() => {
  //   if (response?.transaction?.status === "paid") {
  //     // handlePlaceOrder();
  //   }
  // }, [response]);
  return (
    <div className={styles.paymentStatus}>
      {isFetching ? (
        <div className={styles.response}>
          <h2>Fetching Transaction Details...</h2>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <ResponseUI response={response} />
      )}
    </div>
  );
}

function ResponseUI({ response }) {
  const status = response?.transaction?.status;
  if (response?.status === "error")
    return (
      <div className={`${styles.response} ${styles.error}`}>
        <BiSolidErrorCircle className={styles.statusIcon} />
        <h2>Something went wrong, while fetching transaction details.</h2>
      </div>
    );
  else if (status === "paid")
    return (
      <div className={`${styles.response} ${styles.success}`}>
        <BsCheck2Circle className={styles.statusIcon} />
        <h2>Transaction Successful</h2>
        <div className={styles.info}>
          <p>Transaction Id : </p>
          <p>{response?.transaction?._id}</p>
          <p>Gift Card Quantity : </p>
          <p>{response?.transaction?.quantity}</p>
          <p>Gift Card Unit Price : </p>
          <p>{response?.transaction?.unitPrice}</p>
          <p>Total Amount :</p>
          <p>{response?.transaction?.amount}</p>
        </div>
      </div>
    );
  else if (status === "pending" || status === "initiated")
    return (
      <div className={`${styles.response} ${styles.pending}`}>
        <MdPending className={styles.statusIcon} />
        <h2>Transaction Pending</h2>
        <div className={styles.info}>
          <p>Transaction Id : </p>
          <p>{response?.transaction?._id}</p>
          <p>Gift Card Quantity : </p>
          <p>{response?.transaction?.quantity}</p>
          <p>Gift Card Unit Price : </p>
          <p>{response?.transaction?.unitPrice}</p>
          <p>Total Amount :</p>
          <p>{response?.transaction?.amount}</p>
        </div>
      </div>
    );
  return (
    <div className={`${styles.response} ${styles.error}`}>
      <MdSmsFailed className={styles.statusIcon} />
      <h2>Transaction Failed</h2>
      <div className={styles.info}>
        <p>Transaction Id : </p>
        <p>{response?.transaction?._id}</p>
        <p>Gift Card Quantity : </p>
        <p>{response?.transaction?.quantity}</p>
        <p>Gift Card Unit Price : </p>
        <p>{response?.transaction?.unitPrice}</p>
        <p>Total Amount :</p>
        <p>{response?.transaction?.amount}</p>
      </div>
    </div>
  );
}

export default PaymentStatusPage;
