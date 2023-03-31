import styles from "./all-customers.module.scss";

// react hooks
import { useState, useEffect } from "react";

// components
import TitleSection from "../title-section/title-section";
import AddCustomerPopup from "../../../components/add-customer-popup/add-customer-popup";

// utils
import { getAllExcelData, getAllUsers } from "../../../api/index";

export default function AllCustomers() {
  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await getAllUsers();
      setCustomers(response.data.user);
      console.log({ response });

      const data = await getAllExcelData();
      console.log('Data : ');
      console.log(data);
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
                <th>Total Purchase</th>
                <th>Total Payment</th>
                <th>Total Payout</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map(
                (
                  {
                    email,
                    phone,
                    createdAt,
                    totalPurchase,
                    totalPayment,
                    totalPayout,
                  },
                  index
                ) => {
                  const joinedOn = new Date(createdAt).toDateString();
                  return (
                    <tr key={index}>
                      <td>{email ? email : "<unavailable>"}</td>
                      <td>{phone ? phone : "<unavailable>"}</td>
                      <td>{joinedOn ? joinedOn : "<unavailable>"}</td>
                      <td>Rs. {totalPurchase ? totalPurchase : 0}</td>
                      <td>Rs. {totalPayment ? totalPayment : 0}</td>
                      <td>Rs. {totalPayout ? totalPayout : 0}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
