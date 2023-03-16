import "./tickets-section.styles.scss";

import React, { useState } from "react";
import { activeTickets, resolvedTickets } from "./dummyTickets";

const options = ["active tickets", "resolved tickets"];

export default function TicketsSection() {
  const [selectedTickets, setSelectedTickets] = useState("active tickets");
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
          activeTickets?.map(({ title, description }, index) => (
            <div className="ticket active" key={index}>
              <h5 className="title">{title}</h5>
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
