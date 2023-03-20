import "./tickets-section.styles.scss";

import React, { useState, useEffect } from "react";
import { activeTickets, resolvedTickets } from "./dummyTickets";
import { getAllTickets } from "../../../api";
const options = ["active tickets", "resolved tickets"];

export default function TicketsSection() {
  const [selectedTickets, setSelectedTickets] = useState("active tickets");
  const [tickets, setTickets] = useState([]);

  async function fetchTickets() {
    try {
      const response = await getAllTickets();
      setTickets(response.data.data);
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTickets();
  }, []);
  return (
    <div className="tickets-section">
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
          tickets?.map(({ heading, description }, index) => (
            <div className="ticket active" key={index}>
              <h5 className="title">{heading}</h5>
              <p className="desc">{description}</p>
              <div className="ticket-buttons">
                <button className="resolve-btn">resolve</button>
                <button className="reply-btn">reply</button>
              </div>
            </div>
          ))}
        {selectedTickets === "resolved tickets" &&
          activeTickets?.map(({ title, description }, index) => (
            <div className="ticket resolved" key={index}>
              <h5 className="title">{title}</h5>
              <p className="desc">{description}</p>
              <div className="status">
                <p>resolved</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
