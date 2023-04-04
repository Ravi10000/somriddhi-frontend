import styles from "./sidebar.module.scss";

// packages
import { Link, useNavigate } from "react-router-dom";

// utils
import { topMenuOptions, bottomMenuOptions } from "./menu-list";
import { logoutUser } from "../../api";

function SideBar({
  isMenuVisible,
  setIsMenuVisible,
  hideMenu,
  selectedOption,
}) {
  const navigate = useNavigate();
  function selectOption(item) {
    setIsMenuVisible(false);
    window.scrollTo(0, 0);
  }
  return (
    <div
      className={`${styles["sidebar"]} ${isMenuVisible && styles["visible"]}`}
    >
      <div className={styles["logo-and-close"]} onClick={hideMenu}>
        <img src="/Somriddhi Final Logo-03.png" alt="somriddihi" />
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
            // <Link to={`/admin/${item}`} key={index}>
            <div
              style={{ color: item == "logout" ? "#e53b2c" : "#545a6e" }}
              className={`${styles["option"]}  ${styles["bottom"]} ${
                selectedOption === item && styles["selected"]
              }`}
              onClick={() => {
                if (item === "logout") {
                  logoutUser();
                  return navigate("/");
                }
                selectOption(item);
                navigate(`/admin/${item}`);
              }}
            >
              {/* <div className={styles["dot"]}></div>
               */}
              <img className={styles["dot"]} src={`/${item}.png`} alt="" />
              <p>{item}</p>
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
