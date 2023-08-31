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

  async function handlePlaceOrder() {
    try {
      const {
        line1,
        line2,
        city,
        region,
        postcode,
        firstname,
        lastname,
        salutation,
        quantity,
        unitPrice,
        amount,
      } = response?.transaction;
      const yesPayResponse = JSON.parse(response?.transaction?.yesPayResponse);
      console.log({ yesPayResponse });
      const paymentid = yesPayResponse?.transaction_details?.transaction_no;
      const requestData = {
        address: `${salutation} ${firstname} ${lastname}, ${line1}, ${line2}, ${city}, ${region}, ${postcode}`,
        totalAmount: amount,
        unitPrice: unitPrice,
        qty: quantity,
        paymentid: paymentid,
      };
      requestData.billingAddress = requestData.address;
      const orderResponse = await orderGiftCard(requestData);
      console.log({ orderResponse });
    } catch (err) {
      console.log(err);
    }
  }
  console.log(response?.transaction?.status);
  useEffect(() => {
    if (response?.transaction?.status === "paid") {
      // handlePlaceOrder();
    }
  }, [response]);
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
