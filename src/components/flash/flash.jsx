import styles from "./flash.module.scss";
import { useState, useEffect } from "react";

import { connect } from "react-redux";

import { clearFlash } from "../../redux/flash/flash.actions";

const Flash = ({ message, type, clearFlash }) => {
  const [hideFlash, setHideFlash] = useState(false);
  const [count, setCount] = useState(5);

  useEffect(() => {
    setTimeout(function () {
      setHideFlash(true);
      clearFlash();
    }, 5000);
    setInterval(() => {
      setCount((count) => count - 1);
    }, 999);
  }, [clearFlash]);

  return (
    <div
      className={styles.flash + " " + styles.type}
      style={{
        display: hideFlash && "none",
        boxShadow: `0px 0px 1px var(--${type})`,
      }}
      onClick={() => {
        setHideFlash(false);
      }}
    >
      {message && (
        <>
          <div className={styles.main}>
            <img src={`/${type}.png`} alt={type} />
            <p>{message}</p>
          </div>
          <div className={styles.count}>{count}</div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearFlash: () => dispatch(clearFlash()),
});

export default connect(null, mapDispatchToProps)(Flash);
