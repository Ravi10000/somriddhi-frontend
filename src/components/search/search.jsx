import styles from "./search.module.scss";

export default function Search() {
  return (
    <div className={styles["search"]}>
      <img src="/search.png" alt="search" />
      <input type="search" placeholder="Search For brand, category, coupon" />
    </div>
  );
}
