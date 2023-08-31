import { useEffect } from "react";
import styles from "./payment-status.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTransaction } from "../../api/transaction";
import { useState } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa";

function PaymentStatusPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  if (!id) return navigate("/");

  async function handleFetchTransaction() {
    try {
      const res = await fetchTransaction(id);
      console.log({ res });
      setResponse(res.data);
    } catch (err) {
      console.log(err);
      setResponse({ status: "failed" });
    }
  }
  useEffect(() => {
    handleFetchTransaction();
  }, []);
  return (
    <div className={styles.paymentStatus}>
      <h1>Payment Status</h1>
      <ResponseUI response={response} />
    </div>
  );
}

function ResponseUI({ response }) {
  if (response?.status === "error")
    return (
      <div className={styles.response}>
        <BiSolidErrorCircle className={styles.responseIcon} />
        <h2>Something went wrong, while fetching transaction details.</h2>
      </div>
    );
  else if (response?.status === "success")
    return (
      <div className={styles.response}>
        <FaCircleCheck className={styles.responseIcon} />
        <h2>Transaction Successful</h2>
        <div className={styles.info}>
          <p>
            Amount : <span>{response?.transaction?.amount}</span>
          </p>
        </div>
      </div>
    );
}

export default PaymentStatusPage;
