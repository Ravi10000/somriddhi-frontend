import "./profile-page.styles.scss";
// react hooks
import { useState, useEffect, lazy } from "react";

// packages
import { connect } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

// components
const MyEarnings = lazy(() => import("./my-earnings/my-earnings"));
const PaymentHistory = lazy(() => import("./payment-history/payment-history"));
const ReferEarn = lazy(() => import("./refer-earn/refer-earn"));
const ReferralNetwork = lazy(() =>
  import("./referral-network/referral-network")
);
const GetHelp = lazy(() => import("./get-help/get-help"));
const Settings = lazy(() => import("./settings/settings"));
const MissingCashbacks = lazy(() =>
  import("./missing-cashbacks/missing-cashbacks")
);
const Testimonials = lazy(() => import("./testimonials/testimonials"));
const AddTicket = lazy(() => import("./add-ticket/add-ticket"));
const ListTickets = lazy(() => import("./list-tickets/list-tickets"));

// api calls
import { logoutUser } from "../../api";

// redux actions
import { setCurrentUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

// utils
import menuList from "./menu-list";
import MyGiftCards from "./my-gift-cards/my-gift-cards";
import { Suspense } from "react";
import LoadingPage from "../loading/loading";

function ProfilePage({ setCurrentUser, setFlash }) {
  const params = useParams();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState();
  const [isMenuActive, setIsMenuActive] = useState(false);
  console.log({ activeMenu });
  console.log({ tab: params.tab });

  useEffect(() => {
    const menuLinks = menuList.map((item) => item.link);
    console.log({ menuLinks });
    const tab = "/" + params.tab;
    if (!menuLinks.includes(tab)) {
      console.log("redirecting");
      navigate("/profile/my-earnings");
    } else {
      console.log("path not found");
      setActiveMenu("/" + params.tab);
    }
  }, [params]);

  function closeMenu() {
    setIsMenuActive(false);
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className={`left-menu ${isMenuActive && "active"}`}>
          {menuList?.map(({ name, img, link }) => (
            <Link
              to={`${link === "/logout" ? "/" : "/profile" + link}`}
              key={name}
            >
              <div
                className={`menu-item ${activeMenu === link && "active"} ${
                  !img && "submenu"
                }`}
                onClick={() => {
                  if (name === "logout") {
                    logoutUser();
                    setFlash({
                      type: "success",
                      message: "successfully logged out",
                    });
                    setCurrentUser(null);
                  }
                  scrollToTop();
                  closeMenu();
                  setActiveMenu(name);
                }}
              >
                {img && (
                  <img
                    src={
                      activeMenu === link
                        ? img.replace(".png", "-active.png")
                        : img
                    }
                    alt={name}
                  />
                )}
                <p>{name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div
          className="hamburger"
          onClick={() => {
            setIsMenuActive((state) => !state);
          }}
        >
          <div className={`line ${isMenuActive && "active"}`}></div>
        </div>
        <Suspense fallback={<LoadingPage />}>
          <div className="right">
            {activeMenu == "/my-earnings" && <MyEarnings />}
            {activeMenu == "/payment-history" && <PaymentHistory />}
            {activeMenu == "/missing-cashbacks" && <MissingCashbacks />}
            {activeMenu == "/add-new-tickets" && <AddTicket />}
            {activeMenu == "/check-old-tickets" && <ListTickets />}
            {activeMenu == "/refer-earn" && <ReferEarn />}
            {activeMenu == "/referral-network" && <ReferralNetwork />}
            {activeMenu == "/get-help" && <GetHelp />}
            {activeMenu == "/settings" && <Settings />}
            {activeMenu == "/testimonials" && <Testimonials />}
            {activeMenu == "/gift-cards" && <MyGiftCards />}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(ProfilePage);
