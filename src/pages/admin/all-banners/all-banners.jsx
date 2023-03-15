import "./all-banners.styles.scss";

import React from "react";
import TitleSection from "../title-section/title-section";
import bannerList from "./banner-list";
export default function AllBanners() {
  return (
    <div className="all-banners">
      <TitleSection
        title="all banners"
        addFunction={() => {
          alert("add banner popup need to be here");
        }}
      />
      <div className="banner-cards-container">
        {bannerList?.map(
          ({ name, url, expiryDate, bannerImg, desc }, index) => (
            <div className="banner-card" key={index}>
              <img className="banner-img" src={bannerImg} alt={name} />
              <div className="banner-details">
                <div className="info-container">
                  <div className="banner-info">
                    <h5 className="name">{name}</h5>
                    <div className="info expiry-date">
                      <img src="/date.png" alt="date" />
                      <p>{expiryDate}</p>
                    </div>
                    <div className="info banner-link">
                      <img src="/link.png" alt="banner link" />
                      <p>{url}</p>
                    </div>
                  </div>
                  <img className="lock-icon" src="/lock.png" alt="locked" />
                </div>
                <div className="banner-desc">{desc}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
