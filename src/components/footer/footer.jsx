import "./footer.styles.scss";
import React from "react";
import navList from "./nav-list";
import NavMenu from "./nav-menu/nav-menu";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "../button/button";
import { useLoginModal } from "../../context/login-modal-context";
import { useNavigate } from "react-router-dom";

function Footer({ currentUser }) {
  const modal = useLoginModal();
  const navigate = useNavigate();
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="logo-and-download-links">
          <img
            className="logo-light"
            src="/footer-logo.png"
            alt="somriddihi logo"
          />
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
        <div className="menu">
          <div
            className="menu-item"
            onClick={() => {
              navigate("/about");
            }}
          >
            <img src="/nav-arrow.png" alt={"about"} />
            <p>About</p>
          </div>
          {!currentUser && (
            <div className="menu-item" onClick={modal.openModal}>
              <img src="/nav-arrow.png" alt={"about"} />
              <p>Login</p>
            </div>
          )}
          {/* {navList.map(({ title, navItems }) => (
            <NavMenu navTitle={title} navItems={navItems} key={title} />
          ))} */}
        </div>
      </div>
    </footer>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Footer);
