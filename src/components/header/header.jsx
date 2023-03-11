import "./header.styles.scss";
import React, { useState } from "react";

import Search from "../search/search";
import Button from "../button/button";

export default function Header({ openModal }) {
  return (
    <header>
      <img src="/logo.png" alt="logo" />
      <Search />
      <Button onClick={openModal}>Login / Sign Up</Button>
    </header>
  );
}
