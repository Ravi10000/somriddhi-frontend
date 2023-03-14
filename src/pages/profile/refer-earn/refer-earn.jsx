import "./refer-earn.styles.scss";

import React from "react";

export default function ReferEarn() {
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
          <div className="handle">
            <p>somriddhi/123</p>
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
