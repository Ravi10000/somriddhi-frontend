import "./refer-earn.styles.scss";

import React from "react";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setFlash } from "../../../redux/flash/flash.actions";

function ReferEarn({ currentUser, setFlash }) {
  function copyToClipboard() {
    setFlash({
      type: "success",
      message: "Coupon code copied to clipboard",
    });
    navigator.clipboard.writeText(currentUser?.referralCode);
  }

  return (
    <div className="refer-earn">
      <h2>Refer & Earn</h2>
      <p>
        Invite friends & earn flat 10% of their Cashback amount, EVERYTIME they
        shop
      </p>
      <p>
        Make your friends join Somriddhi via your referral link – No referral
        code needed
      </p>
      <div className="earn-coupons">
        <div className="head">
          <div className="head-left">
            <h3>Refer your friends, Earn Coupons</h3>
            <p>
              Invite Somriddhi to sign up using your link and you’ll get 10% of
              their discounts on any purchase
            </p>
          </div>
          <img src="/earn-coupons-bg.png" alt="earn coupons" />
        </div>
        <div className="social-links">
          <div className="handle" onClick={copyToClipboard}>
            <p>{currentUser?.referralCode}</p>
          </div>
          <div className="links">
            <img src="/share-btn.png" alt="" />
            <img src="/fb-btn.png" alt="" />
            <img src="/mail-btn.png" alt="" />
            <img src="/twitter-btn.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { setFlash })(ReferEarn);
