import "./navbar.styles.scss";
import React from "react";

export default function Navbar() {
  return (
    <nav className="top-navbar">
      <div className="links">
        <a href="#home" className="current" >Home</a>
        <a href="#deals">Deals</a>
        <a href="#Coupons">Coupons</a>
        <a href="#Stores">Stores</a>
        <a href="#contact-us">Contact us</a>
      </div>
    </nav>
  );
}
