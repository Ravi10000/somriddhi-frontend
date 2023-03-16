import "./all-memberships.styles.scss";

import React, { useState } from "react";
import TitleSection from "../title-section/title-section";
import AddMembershipPopup from "../../../components/add-membership-popup/add-membership-popup";
export default function AllMemberships() {
  const [showAddMembershipPopup, setShowAddMembershipPopup] = useState(false);
  return (
    <>
      {showAddMembershipPopup && (
        <AddMembershipPopup setShowPopup={setShowAddMembershipPopup} />
      )}

      <div className="all-memberships">
        <TitleSection
          title="all membershipss"
          addFunction={() => {
            setShowAddMembershipPopup(true);
          }}
        />
        <div className="membership-cards-container">
          {/* {bannerList?.map(
          ({ name, url, expiryDate, bannerImg, desc }, index) => ( */}
          <div className="membership-card">
            <img className="membership-img" src="/offer2.png" />
            <div className="membership-details">
              {/* <div className="info-container"> */}
              <div className="membership-info">
                <h5 className="name">Banner</h5>
                <div className="info expiry-date">
                  <img src="/percentage.png" alt="percentage" />
                  <p>Cashback : 20%</p>
                </div>
                <div className="info membership-link">
                  <img src="/link.png" alt="membership link" />
                  <p>https//:url.com</p>
                </div>
              </div>
              {/* <img className="lock-icon" src="/lock.png" alt="locked" /> */}
              {/* </div> */}
              <div className="membership-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </div>
            </div>
          </div>
          {/* )
        )} */}
        </div>
      </div>
    </>
  );
}
