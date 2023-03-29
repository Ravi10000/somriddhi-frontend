import React, { useState, useRef, useEffect } from "react";
import styles from "./nav.module.scss";

const nav = ({ selectedOption, showMenu, isMenuVisible }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    isSearchOpen && searchRef?.current?.focus();
  }, [isSearchOpen]);
  return (
    <div className={styles["top-bar-container"]}>
      <div className={styles["top-bar"]}>
        <div className={styles["left"]}>
          <div className={styles["hamburger"]} onClick={showMenu}>
            <div
              className={`${styles["line"]} ${
                isMenuVisible && styles["active"]
              }`}
            ></div>
          </div>
          <h3 className={styles["selected-option"]}>{selectedOption}</h3>
        </div>
        <div className={styles["right"]}>
          <div className={styles.searchContainer}>
            <div
              className={styles["icon"] + " " + styles["search-icon"]}
              onClick={() => {
                setIsSearchOpen((prevState) => !prevState);
              }}
            >
              <img
                src={`/${isSearchOpen ? "close-" : ""}search.png`}
                alt="search"
              />
            </div>
            {isSearchOpen && (
              <div className={styles.searchBarContainer}>
                <input
                  ref={searchRef}
                  type="search"
                  className={styles.searchBar}
                />
                <button className={styles.searchBtn}>
                  <img src="/search.png" alt="search" />
                </button>
              </div>
            )}
          </div>
          <div className={styles["icon"] + " " + styles["notify-icon"]}>
            <img src="/notify.png" alt="" />
          </div>
          <div className={styles["icon"] + " " + styles["profile-icon"]}>
            <div className={styles["user-details"]}>
              <img className={styles["profile-pic"]} src="/user.png" alt="" />
              <div className={styles["name"]}>Name</div>
            </div>
            <img
              className={styles["drop-down-icon"]}
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
