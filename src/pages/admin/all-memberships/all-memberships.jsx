import "./all-memberships.styles.scss";

import React, { useState, useEffect } from "react";
import { getAllMemberships } from "../../../api/index";

import TitleSection from "../title-section/title-section";
import AddMembershipPopup from "../../../components/add-membership-popup/add-membership-popup";
export default function AllMemberships() {
  const [showAddMembershipPopup, setShowAddMembershipPopup] = useState(false);
  const [memberships, setMemberships] = useState([]);
  useEffect(() => {
    (async function () {
      const response = await getAllMemberships();
      setMemberships(response.data.data);
      console.log(response);
    })();
  }, []);
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
          {memberships?.map(
            ({ name, image, description, cashbackPercent, url }, index) => (
              <div key={index} className="membership-card">
                <img className="membership-img" src="/offer2.png" />
                <div className="membership-details">
                  {/* <div className="info-container"> */}
                  <div className="membership-info">
                    <h5 className="name">{name}</h5>
                    <div className="info expiry-date">
                      <img src="/percentage.png" alt="percentage" />
                      <p>Cashback : {cashbackPercent}%</p>
                    </div>
                    <div className="info membership-link">
                      <img src="/link.png" alt="membership link" />
                      <p>{url}</p>
                    </div>
                  </div>
                  {/* <img className="lock-icon" src="/lock.png" alt="locked" /> */}
                  {/* </div> */}
                  <div className="membership-desc">{description}</div>
                </div>
              </div>
            )
          )}
          {/* )
        )} */}
        </div>
      </div>
    </>
  );
}
