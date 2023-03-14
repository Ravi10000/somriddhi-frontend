import React from "react";
import { Navigate, redirect } from "react-router-dom";
// const { selectCurrentUser } = require("../../redux/user/user.selectors");
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(ProtectedRoute);
