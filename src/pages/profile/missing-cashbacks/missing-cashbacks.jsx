import "./missing-cashbacks.styles.scss";

export default function MissingCashbacks() {
  return (
    <div className="missing-cashbacks">
      <h2>Missing Cashbacks</h2>
      <p>
        We are here to help. Please follow these simple steps to help us track
        your cashback (takes seconds only).
      </p>
      <div className="did-you-shop">
        <h3>Did you shop?</h3>
        <div className="buttons-container">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  );
}
