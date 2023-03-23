import "./tickets-section.styles.scss";

import React, { useState, useEffect } from "react";
import { activeTickets, resolvedTickets } from "./dummyTickets";
import {
  updateTicketStatus,
  getActiveTickets,
  getResolvedTickets,
} from "../../../api";
import AddReplyPopup from "../../../components/add-reply-popup/add-reply-popup";
import TicketCard from "./ticket-card/ticket-card";
const options = ["active tickets", "resolved tickets"];

export default function TicketsSection() {
  const [selectedTickets, setSelectedTickets] = useState("active tickets");
  const [tickets, setTickets] = useState([]);

  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [ticketToReply, setTicketToReply] = useState(null);

  async function fetchTickets() {
    try {
      if (selectedTickets === "active tickets") {
        const response = await getActiveTickets();
        console.log({ response });
        setTickets(response.data.data);
      } else {
        const response = await getResolvedTickets();
        console.log({ response });
        setTickets(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateTicketStatus(id, status) {
    try {
      const response = await updateTicketStatus({
        id,
        status,
      });
      console.log({ response });
      fetchTickets();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTickets();
  }, [selectedTickets]);
  return (
    <div className="tickets-section">
      {showReplyPopup && (
        <AddReplyPopup
          setShowPopup={setShowReplyPopup}
          ticketToReply={ticketToReply}
          setTicketToReply={setTicketToReply}
        />
      )}
      <div className="select-tickets">
        {options.map((item) => (
          <h4
            key={item}
            className={`${selectedTickets === item ? "active" : ""}`}
            onClick={() => {
              setSelectedTickets(item);
            }}
          >
            {item}
          </h4>
        ))}
      </div>
      <div className="tickets">
        {selectedTickets === "active tickets" &&
          tickets?.map((ticket) => (
            <TicketCard
              setTicketToReply={setTicketToReply}
              setShowPopup={setShowReplyPopup}
              ticket={ticket}
              key={ticket?._id}
              handleUpdateTicketStatus={handleUpdateTicketStatus}
            />
          ))}
        {selectedTickets === "resolved tickets" &&
          tickets?.map((ticket) => (
            <TicketCard
              setTicketToReply={setTicketToReply}
              setShowPopup={setShowReplyPopup}
              ticket={ticket}
              key={ticket?._id}
              handleUpdateTicketStatus={handleUpdateTicketStatus}
            />
          ))}
      </div>
    </div>
  );
}
