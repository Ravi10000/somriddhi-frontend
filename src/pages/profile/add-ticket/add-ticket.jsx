import styles from "./add-ticket.module.scss";

import React, { useState } from "react";
import AddTicketPopup from "../../../components/add-ticket-popup/add-ticket-popup";
import Button from "../../../components/button/button";

export default function AddTicket() {
  const [showAddTicketPopup, setShowAddTicketPopup] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  return (
    <div className={styles["add-ticket"]}>
      {showAddTicketPopup && (
        <AddTicketPopup
          setShowPopup={setShowAddTicketPopup}
          setShowSuccessMsg={setShowSuccessMsg}
        />
      )}
      <Button
        onClick={() => {
          setShowAddTicketPopup(true);
        }}
      >
        Add New Ticket
      </Button>
      {showSuccessMsg && <h3>Ticket added successfully</h3>}
    </div>
  );
}
