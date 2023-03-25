import styles from "./list-tickets.module.scss";

// react hooks
import { useEffect, useState } from "react";

// api calls
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
      {tickets?.length > 0 ? (
        <div className={styles["tickets-container"]}>
          {tickets?.map((ticket) => (
            <div className={styles["ticket"]} key={ticket._id}>
              <h4 className={styles["ticket-header"]}> {ticket?.heading}</h4>
              <p className={styles["ticket-description"]}>
                {ticket?.description}
              </p>
              <div className={styles["replies-container"]}>
                <h5>
                  {ticket?.replies?.length > 0
                    ? ticket?.replies?.length + " Replies"
                    : "No reply yet"}{" "}
                </h5>
                <div className={styles["replies"]}>
                  {ticket?.replies?.map((reply, index) => (
                    <div className={styles["reply"]} key={index}>
                      <p className={styles["reply-text"]}>{reply}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles["no-tickets"]}>No tickets found</p>
      )}
    </div>
  );
}
