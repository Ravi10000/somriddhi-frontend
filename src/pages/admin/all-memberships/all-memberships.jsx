import "./all-memberships.styles.scss";

import React, { useState, useEffect } from "react";
import { getAllMemberships, deleteMembership } from "../../../api/index";

import TitleSection from "../title-section/title-section";
import AddMembershipPopup from "../../../components/add-membership-popup/add-membership-popup";
import MembershipCard from "./membership-card/membership-card";
export default function AllMemberships() {
  const [showAddMembershipPopup, setShowAddMembershipPopup] = useState(false);
  const [memberships, setMemberships] = useState([]);

  async function fetchMemberships() {
    const response = await getAllMemberships();
    setMemberships(response.data.data);
    console.log(response);
  }
  useEffect(() => {
    fetchMemberships();
  }, []);

  async function deleteMembershipHandler(id, setIsDeleting) {
    setIsDeleting(true);
    try {
      const response = await deleteMembership(id);
      console.log({ response });
      await fetchMemberships();
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {showAddMembershipPopup && (
        <AddMembershipPopup
          setShowPopup={setShowAddMembershipPopup}
          fetchMemberships={fetchMemberships}
        />
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
          {memberships?.map((membership) => (
            <MembershipCard
              key={membership?._id}
              membership={membership}
              deleteMembershipHandler={deleteMembershipHandler}
            />
          ))}
          {/* )
        )} */}
        </div>
      </div>
    </>
  );
}
