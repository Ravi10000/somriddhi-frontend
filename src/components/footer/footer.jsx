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
import TodquestMessage from "../todquest-message/todquest-message";

function Footer({ currentUser }) {
  const modal = useLoginModal();
  const navigate = useNavigate();
  return (
    <footer className="footer-section">
      <TodquestMessage />

      <div className="container">
        <div className="menu">
          <div className="left-menu-items">
            <div
              className="menu-item"
              onClick={() => {
                navigate("/about");
              }}
            >
              <img src="/nav-arrow.png" alt={"about"} />
              <p>About Us</p>
            </div>
            <div
              className="menu-item"
              onClick={() => {
                navigate("/terms-and-conditions");
              }}
            >
              <img src="/nav-arrow.png" alt={"terms"} />
              <p>Terms & Conditions</p>
            </div>
            <div
              className="menu-item"
              onClick={() => {
                navigate("/terms-of-use");
              }}
            >
              <img src="/nav-arrow.png" alt={"terms"} />
              <p>Terms of Use</p>
            </div>
          </div>
          <div className="right-menu-items">
            <div
              className="menu-item"
              onClick={() => {
                navigate("/refund-policy");
              }}
            >
              <img src="/nav-arrow.png" alt={"refund"} />
              <p>Refund & Cancellation Policy</p>
            </div>
            <div
              className="menu-item"
              onClick={() => {
                navigate("/privacy-policy");
              }}
            >
              <img src="/nav-arrow.png" alt={"privacy-policy"} />
              <p>Privacy Policy</p>
            </div>
            <div
              className="menu-item"
              onClick={() => {
                navigate("/admin");
              }}
            >
              <img src="/nav-arrow.png" alt={"about"} />
              <p>Admin Login</p>
            </div>
          </div>
          {/* {navList.map(({ title, navItems }) => (
            <NavMenu navTitle={title} navItems={navItems} key={title} />
          ))} */}
        </div>
      </div>
      <div className="logo-and-download-links">
        <img
          className="logo-light"
          src="/Somriddhi Final Logo-03.png"
          alt="somriddihi logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="buttons-container">
          <button>
            <img src="/playstore.png" alt="download from play sotre" />
            <div
              className="store-details"
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.somriddhi.somriddhiaeps"
                );
              }}
            >
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
      <p className="copyright">
        &copy; copyright somriddhi digital | all rights reserved
      </p>
    </footer>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Footer);
