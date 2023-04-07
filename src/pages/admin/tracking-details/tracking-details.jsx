import styles from "./tracking-details.module.scss";
import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../../api";
import TitleSection from "../title-section/title-section";

function Tracking() {
  const [trackingData, setTrackingData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function getTrackingData() {
    try {
      setIsFetching(true);
      const response = await fetchAnalytics();
      console.log({ response });
      setTrackingData(response?.data?.analytics);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getTrackingData();
  }, []);
  return (
    <div className={styles.tracking}>
      <TitleSection title="Tracking Details" noAddButton />
      {/* <pre>{JSON.stringify(trackingData, null, 2)}</pre> */}
      <div className={styles["tracking-table-container"]}>
        <table className={styles["tracking-table"]}>
          <thead>
            <tr>
              <th>ASC subtag</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Phone No.</th>
              <th>Coupon Type</th>
              <th>Coupon Name</th>
            </tr>
          </thead>
          {isFetching ? (
            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            <tbody>
              {trackingData?.map((trackingInfo, index) => {
                return (
                  <tr key={index}>
                    <td>{trackingInfo?._id || "<unavailable>"}</td>
                    <td>
                      {!trackingInfo?.userId?.fname &&
                      !trackingInfo?.userId?.lname
                        ? "<unavailable>"
                        : trackingInfo?.userId?.fname +
                          " " +
                          trackingInfo?.userId?.lname}
                    </td>
                    <td>{trackingInfo?.userId?.email || "<unavailable>"}</td>
                    <td>{trackingInfo?.userId?.phone || "<unavailable>"}</td>
                    <td>
                      {trackingInfo?.couponId?.couponType || "<unavailable>"}
                    </td>
                    <td>{trackingInfo?.couponId?.name || "<unavailable>"}</td>
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

export default Tracking;
