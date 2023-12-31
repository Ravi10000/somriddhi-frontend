import React, { useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";
// const { selectCurrentUser } = require("../../redux/user/user.selectors");
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useLoginModal } from "../../context/login-modal-context";

function ProtectedRoute({ currentUser, children }) {
  const modal = useLoginModal();
  useEffect(() => {
    currentUser ? modal.closeModal() : modal.openModal();
  }, [currentUser]);

  return <>{currentUser && children}</>;
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(ProtectedRoute);
