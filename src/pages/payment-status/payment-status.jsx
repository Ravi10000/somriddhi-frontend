import styles from "./payment-status.module.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTransaction } from "../../api/transaction";
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
  return (
    <div className={styles.paymentStatus}>
      {isFetching ? (
        <div className={styles.response}>
          <h2>Fetching Transaction Details...</h2>
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
          <p>Amount :</p>
          <p>{response?.transaction?.amount}</p>
          <p>Transaction Id : </p>
          <p>{response?.transaction?._id}</p>
        </div>
      </div>
    );
  else if (status === "pending" || status === "initiated")
    return (
      <div className={`${styles.response} ${styles.pending}`}>
        <MdPending className={styles.statusIcon} />
        <h2>Transaction Pending</h2>
        <div className={styles.info}>
          <p>Amount :</p>
          <p>{response?.transaction?.amount}</p>
          <p>Transaction Id : </p>
          <p>{response?.transaction?._id}</p>
        </div>
      </div>
    );
  return (
    <div className={`${styles.response} ${styles.error}`}>
      <MdSmsFailed className={styles.statusIcon} />
      <h2>Transaction Failed</h2>
      <div className={styles.info}>
        <p>Amount :</p>
        <p>{response?.transaction?.amount}</p>
        <p>Transaction Id : </p>
        <p>{response?.transaction?._id}</p>
      </div>
    </div>
  );
}

export default PaymentStatusPage;
