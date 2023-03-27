import "./tickets-section.styles.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import { connect } from "react-redux";

// api calls
import {
  updateTicketStatus,
  getActiveTickets,
  getResolvedTickets,
} from "../../../api";

// components
import AddReplyPopup from "../../../components/add-reply-popup/add-reply-popup";
import TicketCard from "./ticket-card/ticket-card";

// redux actions
import { setFlash } from "../../../redux/flash/flash.actions";

// utils
const options = ["active tickets", "resolved tickets"];

function TicketsSection({ setFlash }) {
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
      response.data.status === "success" &&
        setFlash({
          type: "success",
          message: `Ticket Resolved Successfully`,
        });
      fetchTickets();
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
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
          fetchTickets={fetchTickets}
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

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(TicketsSection);
