import styles from "./list-tickets.module.scss";

import React, { useEffect, useState } from "react";
import { getMyTickets } from "../../../api";

export default function ListTickets() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getMyTickets();
      console.log({ response });
      setTickets(response.data.data);
    })();
  }, []);
  return (
    <div className={styles["list-tickets"]}>
      <h2>All Tickets</h2>
      <div className={styles["tickets-container"]}>
        {tickets?.map((ticket) => (
          <div className={styles["ticket"]} key={ticket._id}>
            <h4 className={styles["ticket-header"]}> {ticket?.heading}</h4>
            <p className={styles["ticket-description"]}>
              {ticket?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
