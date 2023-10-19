import styles from "./navbar.module.scss";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { BiSolidDownArrow } from "react-icons/bi";
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
    // { name: "contact us", link: "/#feedback-form" },
    { name: "contact us", link: "/about/#contact-us" },
  ];

  return (
    <nav className={styles["top-navbar"]}>
      <div className={styles["links"]}>
        {navList.map(({ name, link }) => (
          <HashLink
            onClick={() => setActiveLink(link)}
            to={link}
            key={name}
            className={`${activeLink === link && styles["active"]} ${
              styles.navLink
            }`}
          >
            <p>{name}</p>
          </HashLink>
        ))}
        <div className={styles.productsNavItem} onClick={() => {}}>
          <p>Products</p>
          <div
            className={styles.brandsMenu}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.brandName}>
              <p>Amazon</p> <BiSolidDownArrow className={styles.icon} />
            </div>
            <div className={styles.productsMenuContainer}>
              <div className={styles.productsMenu}>
                <HashLink to="/#gift-cards">
                  <p className={styles.productName}>Amazon Shopping Vouchers</p>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
