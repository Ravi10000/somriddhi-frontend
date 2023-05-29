import styles from "./topbar.module.scss";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../notification/notification";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

function TopBar({ selectedOption, showMenu, isMenuVisible, currentUser }) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    isSearchOpen && searchRef?.current?.focus();
  }, [isSearchOpen]);
  return (
    <div className={styles["top-bar-container"]}>
      {isNotificationOpen && (
        <Notification setIsNotificationOpen={setIsNotificationOpen} />
      )}
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
          {/* <div className={styles.searchContainer}>
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
                <button
                  className={styles.searchBtn}
                  onClick={() => {
                    setIsSearchOpen(false);
                  }}
                >
                  <img src="/search.png" alt="search" />
                </button>
              </div>
            )}
          </div> */}
          {/* <div
            className={styles["icon"] + " " + styles["notify-icon"]}
            onClick={() => {
              setIsNotificationOpen(true);
            }}
          >
            <img src="/notify.png" alt="" />
          </div> */}
          <div className={styles["icon"] + " " + styles["profile-icon"]} onClick={()=>{navigate("/profile/settings")}}>
            <div className={styles["user-details"]}>
              <img className={styles["profile-pic"]} src="/user.png" alt="" />
              <div className={styles["name"]}>
                {currentUser?.fname || "Name"}
              </div>
              {/* <div className={styles.userOptions}>
                <p>{currentUser?.fname + " " + currentUser?.lname}</p>
              </div> */}
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
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(TopBar);
