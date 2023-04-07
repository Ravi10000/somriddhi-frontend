import styles from "./all-customers.module.scss";

// react hooks
import { useState, useEffect } from "react";

// components
import TitleSection from "../title-section/title-section";
import AddCustomerPopup from "../../../components/add-customer-popup/add-customer-popup";

// utils
import { getAllUsers } from "../../../api/index";

export default function AllCustomers() {
  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await getAllUsers();
      setCustomers(response.data.users);
      console.log({ response });
    })();
    // getAllExcelData();
  }, []);
  return (
    <>
      {showAddCustomerPopup && (
        <AddCustomerPopup setShowPopup={setShowAddCustomerPopup} />
      )}
      <div className={styles["all-customers"]}>
        <TitleSection
          title="all customers"
          uploadBtn
          addFunction={() => {
            setShowAddCustomerPopup(true);
          }}
        />
        {/* <div className="customers-table-container"> */}
        <div className={styles["customers-table-container"]}>
          <table className={styles["customers-table"]}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Joined on</th>
                <th>Total Earnings</th>
                <th>Redeemed Earnings</th>
                <th>Redeemable Earnings</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((userDetails, index) => {
                const joinedOn = new Date(
                  userDetails?.user?.createdAt
                ).toDateString();
                return (
                  <tr key={index}>
                    <td>
                      {userDetails?.user?.email
                        ? userDetails?.user?.email
                        : "<unavailable>"}
                    </td>
                    <td>
                      {userDetails?.user?.phone
                        ? userDetails?.user?.phone
                        : "<unavailable>"}
                    </td>
                    <td>{joinedOn ? joinedOn : "<unavailable>"}</td>
                    <td>
                      Rs.{" "}
                      {userDetails?.earnings?.totalEarnings
                        ? userDetails?.earnings?.totalEarnings
                        : 0}
                    </td>
                    <td>
                      Rs.{" "}
                      {userDetails?.earnings?.redeemedEarnings
                        ? userDetails?.earnings?.redeemedEarnings
                        : 0}
                    </td>
                    <td>
                      Rs.{" "}
                      {userDetails?.earnings?.redeemableEarnings
                        ? userDetails?.earnings?.redeemableEarnings
                        : 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
