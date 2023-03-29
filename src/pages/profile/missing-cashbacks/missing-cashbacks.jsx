import styles from "./missing-cashbacks.module.scss";
import Button from "../../../components/button/button";
export default function MissingCashbacks() {
  return (
    <div className={styles["missing-cashbacks"]}>
      <h2>Missing Cashbacks</h2>
      <p>
        We are here to help. Please follow these simple steps to help us track
        your cashback (takes seconds only).
      </p>
      <div className={styles["did-you-shop"]}>
        <h3>Did you shop?</h3>
        <div className={styles["buttons-container"]}>
          <Button>Yes</Button>
          <button className={styles.noBtn}>No</button>
        </div>
      </div>
    </div>
  );
}
