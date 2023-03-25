import "./all-memberships.styles.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import { connect } from "react-redux";

// redux actions
import { setFlash } from "../../../redux/flash/flash.actions";

// api calls
import { getAllMemberships, deleteMembership } from "../../../api/index";

// components
import TitleSection from "../title-section/title-section";
import AddMembershipPopup from "../../../components/add-membership-popup/add-membership-popup";
import MembershipCard from "./membership-card/membership-card";

function AllMemberships({ setFlash }) {
  const [showAddMembershipPopup, setShowAddMembershipPopup] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [membersipToEdit, setMembersipToEdit] = useState(null);

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
      response.data.status === "success" &&
        setFlash({
          message: "Membership deleted successfully",
          type: "success",
        });
      await fetchMemberships();
      setIsDeleting(false);
    } catch (error) {
      setFlash({
        message: "Something went wrong, please try again later",
        type: "error",
      });
      console.log(error);
    }
  }
  return (
    <>
      {showAddMembershipPopup && (
        <AddMembershipPopup
          membersipToEdit={membersipToEdit}
          setMembersipToEdit={setMembersipToEdit}
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
          {memberships?.map((membership) => (
            <MembershipCard
              key={membership?._id}
              setShowPopup={setShowAddMembershipPopup}
              setMembersipToEdit={setMembersipToEdit}
              membership={membership}
              deleteMembershipHandler={deleteMembershipHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});
export default connect(null, mapDispatchToProps)(AllMemberships);
