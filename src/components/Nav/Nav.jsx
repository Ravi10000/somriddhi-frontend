import React from "react";
import "./nav.styles.scss";
// import Person from "./person.png";
// import Search from "./sea.png";
// import Noti from "./noti.png";

const nav = ({ selectedOption, showMenu, isMenuVisible }) => {
  return (
    <div className="top-bar-container">
      <div className="top-bar">
        <div className="left">
          <div className="hamburger" onClick={showMenu}>
            <div className={`line ${isMenuVisible && "active"}`}></div>
          </div>
          <h3 className="selected-option">{selectedOption}</h3>
        </div>
        <div className="right">
          <div className="icon search-icon">
            <img src="/search.png" alt="search" />
          </div>
          <div className="icon notify-icon">
            <img src="/notify.png" alt="" />
          </div>
          <div className="icon profile-icon">
            <div className="user-details">
              <img className="profile-pic" src="/person.png" alt="" />
              <div className="name">Name</div>
            </div>
            <img
              className="drop-down-icon"
              src="/arrow-down.png"
              alt="show more"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default nav;
