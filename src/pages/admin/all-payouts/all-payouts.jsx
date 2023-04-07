import styles from "./all-payouts.module.scss";
import { useEffect, useState } from "react";
import { fetchAllPayouts } from "../../../api";
import TitleSection from "../title-section/title-section";

function AllPayouts() {
  const [payoutsData, setPayoutsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function getPaymentData() {
    try {
      setIsFetching(true);
      const response = await fetchAllPayouts();
      console.log({ response });
      setPayoutsData(response?.data?.payouts);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getPaymentData();
  }, []);

  return (
    <div className={styles.tracking}>
      <TitleSection title="All Payouts" noAddButton />
      {/* <pre>{JSON.stringify(trackingData, null, 2)}</pre> */}
      <div className={styles["tracking-table-container"]}>
        <table className={styles["tracking-table"]}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Wallet ID</th>
              <th>Amount</th>
              <th>Paid At</th>
            </tr>
          </thead>
          {isFetching ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            <tbody>
              {payoutsData?.map((payout, index) => {
                const paidAt = new Date(payout?.paidAt).toDateString();
                return (
                  <tr key={index}>
                    <td>{payout?.transactionId}</td>
                    <td>{payout?.walletId}</td>
                    <td>{payout?.amount}</td>
                    <td>{paidAt}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default AllPayouts;
