import styles from "./popup-head.module.scss";

export default function PopupHead({ title, setShowPopup }) {
  return (
    <div className={styles["head"]}>
      <div className={styles["head-left"]}>
        <img
          src="/arrow-left-primary.png"
          alt="go back"
          onClick={() => {
            setShowPopup(false);
          }}
        />
        <h3>{title}</h3>
      </div>
      <button
        className={styles["close-popup"]}
        onClick={() => {
          setShowPopup(false);
        }}
      >
        <img src="/close.png" alt="close popup" />
      </button>
    </div>
  );
}
