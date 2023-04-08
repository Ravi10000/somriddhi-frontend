import styles from "./navbar.module.scss";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname + location?.hash);
    // firstCategory();
  }, [location.pathname]);

  const navList = [
    { name: "home", link: "/" },
    { name: "deals", link: "/#deals" },
    { name: "categories", link: `/category` },
    { name: "contact us", link: "/#feedback-form" },
    // {
    //   name: "wallet login",
    //   link: `https://login.somriddhidigital.co.in/#/login`,
    // },
  ];

  return (
    <nav className={styles["top-navbar"]}>
      <div className={styles["links"]}>
        {navList.map(({ name, link }) => (
          <HashLink
            onClick={() => setActiveLink(link)}
            to={link}
            key={name}
            className={`${activeLink === link && styles["active"]}`}
          >
            {name}
          </HashLink>
        ))}
        <div className={styles.wallet}>
          <p>wallet login</p>
          <div className={styles.walletMenu}>
            <a href="https://agent.somriddhidigital.co.in/#/sign-in">
              <p>Web Login</p>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.somriddhi.somriddhiaeps">
              <p>Download App</p>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
