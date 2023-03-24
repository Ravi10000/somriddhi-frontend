import "./navbar.styles.scss";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// import { getAllCategories } from "../../api/index.js";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();
  // const [category, setCategory] = useState("");

  // const firstCategory = async () => {
  //   const allCats = await getAllCategories();
  //   console.log(allCats.data.data[0].name);
  //   setCategory(allCats.data.data[0]);
  // };
  useEffect(() => {
    setActiveLink(location.pathname);
    // firstCategory();
  }, [location.pathname]);

  const navList = [
    { name: "home", link: "/" },
    { name: "deals", link: "/#deals" },
    { name: "categories", link: `/category` },
    // { name: "stores", link: "/#stores" },
    { name: "contact us", link: "/#feedback-form" },
  ];

  return (
    <nav className="top-navbar">
      <div className="links">
        {navList.map(({ name, link }) => (
          <HashLink
            onClick={() => setActiveLink(link)}
            to={link}
            key={name}
            className={`${activeLink === link && "active"}`}
          >
            {name}
          </HashLink>
        ))}
        {/* <HashLink to="/" className={"nav-link"}>
          Home
        </HashLink>
        <HashLink to="/#deals">Deals</HashLink>
        <HashLink to="/#coupons">Coupons</HashLink>
        <HashLink to="#Stores">Stores</HashLink>
        <HashLink to="#contact-us">Contact us</HashLink> */}
      </div>
    </nav>
  );
}
