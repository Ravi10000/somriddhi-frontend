import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AdminPage from "../admin/admin.page";
import AdminLogin from "../admin-login/admin-login";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useLoginModal } from "../../context/login-modal-context";
function ProtectAdminRoute({ children, currentUser }) {
  const modal = useLoginModal();
  // const [admin, setAdmin] = useState(false); // this should be false
  // const params = useParams();
  // const location = useLocation();

  // useEffect(() => {
  //   currentUser?.usertype === "admin" && setAdmin(true);
  //   console.log({ currentUser });
  // }, [currentUser]);

  // console.log({ params, location });

  // useEffect(() => {
  //   localStorage.getItem("admin") &&
  //     setAdmin(JSON.parse(localStorage.getItem("admin")));
  // }, []);

  useEffect(() => {
    console.log({ userInProtectRoute: currentUser });
    currentUser?.usertype === "admin" ? modal.closeModal() : modal.openModal();
  }, [currentUser]);

  // return <>protected route</>;
  return <>{currentUser?.usertype === "admin" && children}</>;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, null)(ProtectAdminRoute);
