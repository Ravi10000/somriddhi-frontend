import styles from "./refund.module.scss";

function RefundPolicyPage() {
  return (
    <div className={styles.refundPolicyPage}>
      <section>
        <h1>
          Amazon Pay Gift cards once purchased cannot be cancelled or returned
          due to regulatory restrictions. Please refer to Amazon Pay Gift Card
          page to know more about adding gift card balance to your account,
          redeeming a Gift card and restrictions.
        </h1>
      </section>
      <section>
        <h2>Gift Card T&C</h2>
        <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=202115040#:~:text=Gift%20cards%20once%20purchased%20cannot,a%20Gift%20card%20and%20restrictions.">
          https://www.amazon.in/gp/help/customer/display.html?nodeId=202115040#:~:text=Gift%20cards%20once%20purchased%20cannot,a%20Gift%20card%20and%20restrictions.
        </a>
      </section>
    </div>
  );
}

export default RefundPolicyPage;
