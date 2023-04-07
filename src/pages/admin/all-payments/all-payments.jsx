import styles from "./all-payments.module.scss";
import { useEffect, useState } from "react";
import { fetchAllPayments } from "../../../api";
import TitleSection from "../title-section/title-section";

function AllPayments() {
  const [paymentsData, setPaymentsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function getPaymentData() {
    try {
      setIsFetching(true);
      const response = await fetchAllPayments();
      console.log({ response });
      setPaymentsData(response?.data?.payments);
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
      <TitleSection title="All Payments" noAddButton />
      {/* <pre>{JSON.stringify(trackingData, null, 2)}</pre> */}
      <div className={styles["tracking-table-container"]}>
        <table className={styles["tracking-table"]}>
          <thead>
            <tr>
              <th>ASC subtag</th>
              <th>clicks</th>
              <th>Items Ordered</th>
              <th>Items Shipped</th>
              <th>Revenue</th>
              <th>Add Fees</th>
            </tr>
          </thead>
          {isFetching ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            <tbody>
              {paymentsData?.map((payment, index) => {
                return (
                  <tr key={index}>
                    <td>{payment?.trackingId}</td>
                    <td>{payment?.clicks}</td>
                    <td>{payment?.itemsOrdered}</td>
                    <td>{payment?.itemsShipped}</td>
                    <td>{payment?.revenue}</td>
                    <td>{payment?.addFees}</td>
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

export default AllPayments;
