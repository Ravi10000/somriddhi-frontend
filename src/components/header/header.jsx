import "./header.styles.scss";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Search from "../search/search";
import Button from "../button/button";

// selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { Link } from "react-router-dom";

function Header({ openModal, currentUser }) {
  return (
    <header>
      <img src="/logo.png" alt="logo" />
      <Search />
      {/* change below to !currentUser */}
      {currentUser ? (
        <Button onClick={openModal}>Login / Sign Up</Button>
      ) : (
        <Link to="/profile">
          <button className="logged-in">
            <img src="/user.png" alt="user" />
            <p>My Account</p>
          </button>
        </Link>
      )}
    </header>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, null)(Header);
