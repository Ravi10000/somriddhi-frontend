import "./profile-page.styles.scss";
import { useState } from "react";
import menuList from "./menu-list";
import MyEarnings from "./my-earnings/my-earnings";
import PaymentHistory from "./payment-history/payment-history";
import ReferEarn from "./refer-earn/refer-earn";
import ReferralNetwork from "./referral-network/referral-network";
import GetHelp from "./get-help/get-help";
import Settings from "./settings/settings";
import MissingCashbacks from "./missing-cashbacks/missing-cashbacks";
import Testimonials from "./testimonials/testimonials";

export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState("my earnings");
  const [isMenuActive, setIsMenuActive] = useState(false);
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
          {menuList?.map(({ name, img }) => (
            <div
              key={name}
              className={`menu-item ${activeMenu === name && "active"} ${
                !img && "submenu"
              }`}
              onClick={() => {
                scrollToTop();
                closeMenu();
                setActiveMenu(name);
              }}
            >
              {img && (
                <img
                  src={
                    activeMenu === name
                      ? img.replace(".png", "-active.png")
                      : img
                  }
                  alt={name}
                />
              )}
              <p>{name}</p>
            </div>
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
        <div className="right">
          {activeMenu == "my earnings" && <MyEarnings />}
          {activeMenu == "payment history" && <PaymentHistory />}
          {activeMenu == "missing cashbacks" && <MissingCashbacks />}
          {activeMenu == "refer & earn" && <ReferEarn />}
          {activeMenu == "referral network" && <ReferralNetwork />}
          {activeMenu == "get help" && <GetHelp />}
          {activeMenu == "settings" && <Settings />}
          {activeMenu == "testimonials" && <Testimonials />}
        </div>
      </div>
    </div>
  );
}
