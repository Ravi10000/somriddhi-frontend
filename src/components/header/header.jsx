import "./header.styles.scss";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Search from "../search/search";
import Button from "../button/button";

// selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";

function Header({ openModal, currentUser }) {
  return (
    <header>
      <img src="/logo.png" alt="logo" />
      <Search />
      {!currentUser ? (
        <Button onClick={openModal}>Login / Sign Up</Button>
      ) : (
        "logged-in"
      )}
    </header>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, null)(Header);
