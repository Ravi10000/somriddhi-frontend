import "./download.styles.scss";

import React from "react";

export default function Download() {
  return (
    <section className="download-section">
      <div className="container">
        <div className="left">
          <h2 className="title">
            Want to be a <br /> part of our team
          </h2>
          <p className="subtitle">Be a part of best site of discount coupons</p>
          <div className="buttons-container">
            <button>
              <img src="/playstore.png" alt="download from play sotre" />
              <div className="store-details">
                <p>Download From</p>
                <h4>Play Store</h4>
              </div>
            </button>
            <button>
              <img src="/applestore.png" alt="download from apple sotre" />
              <div className="store-details">
                <p>Download From</p>
                <h4>Apple Store</h4>
              </div>
            </button>
          </div>
        </div>
        <div className="right">
          <img src="/Phone.png" alt="phone" />
          <img src="/Phone.png" alt="phone" />
        </div>
      </div>
    </section>
  );
}
