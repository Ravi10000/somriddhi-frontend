import styles from "./custom-categories.module.scss";

function CustomCategories() {
  return (
    <section className={styles.customCategories}>
      <div
        className={styles.cardsContainer}
        style={{ animationDuration: 3 * 3 + "s" }}
      >
        <div className={styles.card}>
          <img src="/offer1.png" alt="" />
          <p>Sports</p>
        </div>
        <div className={styles.card}>
          <img src="/offer2.png" alt="" />
          <p>Sports</p>
        </div>
        <div className={styles.card}>
          <img src="/offer3.png" alt="" />
          <p>Sports</p>
        </div>
      </div>
    </section>
  );
}

export default CustomCategories;
