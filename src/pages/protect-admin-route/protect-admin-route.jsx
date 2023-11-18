import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AdminPage from "../admin/admin.page";
import AdminLogin from "../admin-login/admin-login";
import {
  selectCurrentUser,
  selectIsFetching,
} from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useLoginModal } from "../../context/login-modal-context";
import LoadingPage from "../loading/loading";
function ProtectAdminRoute({ children, currentUser, isFetching }) {
  const modal = useLoginModal();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ currentUser, isFetching });
    !isFetching &&
      currentUser?.usertype !== "admin" &&
      navigate("/admin/login");
  }, [currentUser, isFetching]);

  return <>{currentUser?.usertype === "admin" ? children : <LoadingPage />}</>;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isFetching: selectIsFetching,
});
export default connect(mapStateToProps, null)(ProtectAdminRoute);
