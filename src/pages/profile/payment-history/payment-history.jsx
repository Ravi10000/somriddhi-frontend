import "./payment-history.styles.scss";

import React, { useEffect, useState } from "react";
import { fetchMyCashbacks } from "../../../api";

export default function PaymentHistory() {
  const [cashbackList, setCashbackList] = useState([]);
  async function getMyCashbacks() {
    try {
      const response = await fetchMyCashbacks();
      console.log({ response });
      if (response?.data?.cashbacks) setCashbackList(response?.data?.cashbacks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyCashbacks();
  }, []);
  return (
    <div className="payment-history">
      <h2>Payment History</h2>
      <div className="transactions-container">
        {cashbackList?.map((cashback) => (
          <div className="transaction" key={cashback?._id}>
            <div className="company-info">
              {/* <img src="/amazon-round.png" alt="amazon" /> */}
              <div className="name">
                <h4>Transaction Date</h4>
                <p>{new Date(cashback?.createdAt).toDateString()}</p>
              </div>
            </div>
            <div className="price-and-status">
              <h4>Rs. {cashback?.amount}</h4>
              <p className={`${cashback?.status || ""}`}>
                {cashback?.status === "Unpaid"
                  ? "Pending"
                  : cashback?.status === "Paid"
                  ? "Completed"
                  : "Requested"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
