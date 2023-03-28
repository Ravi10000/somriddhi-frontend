import styles from "./sidebar.module.scss";

// packages
import { Link } from "react-router-dom";

// utils
import { topMenuOptions, bottomMenuOptions } from "./menu-list";

function SideBar({
  isMenuVisible,
  setIsMenuVisible,
  hideMenu,
  selectedOption,
}) {
  function selectOption(item) {
    setIsMenuVisible(false);
    window.scrollTo(0, 0);
  }
  return (
    <div
      className={`${styles["sidebar"]} ${isMenuVisible && styles["visible"]}`}
    >
      <div className={styles["logo-and-close"]} onClick={hideMenu}>
        <img src="/Somriddhi Final Logo-01.png" alt="somriddihi" />
        <img
          className={styles["close-btn"]}
          src="/close-menu.png"
          alt="somriddihi"
        />
      </div>
      <div className={styles["options"]}>
        <div className={styles["top-menu"]}>
          {topMenuOptions.map((item, index) => (
            <Link to={`/admin/${item}`} key={index}>
              <div
                className={`${styles["option"]} ${styles["top"]} ${
                  selectedOption === item && styles["selected"]
                }`}
                onClick={() => {
                  selectOption(item);
                }}
              >
                <p>{item}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles["bottom-menu"]}>
          {bottomMenuOptions.map((item, index) => (
            <Link to={`/admin/${item}`} key={index}>
              <div
                className={`${styles["option"]}  ${styles["bottom"]} ${
                  selectedOption === item && styles["selected"]
                }`}
                onClick={() => {
                  selectOption(item);
                }}
              >
                <div className={styles["dot"]}></div>
                <p>{item}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
