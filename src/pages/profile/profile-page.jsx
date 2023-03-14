import "./profile-page.styles.scss";
import { useState } from "react";
import MyEarnings from "./my-earnings/my-earnings";
import PaymentHistory from "./payment-history/payment-history";
import ReferEarn from "./refer-earn/refer-earn";
import ReferralNetwork from "./referral-network/referral-network";
import GetHelp from "./get-help/get-help";
import Settings from "./settings/settings";
import MissingCashbacks from "./missing-cashbacks/missing-cashbacks";
const menuList = [
  {
    name: "my earnings",
    img: "/profile-menu-icons/earnings.png",
    component: <MyEarnings />,
  },
  {
    name: "payment history",
    img: "/profile-menu-icons/payment-history.png",
    component: <PaymentHistory />,
  },
  {
    name: "missing cashbacks",
    component: <MissingCashbacks />,
  },
  {
    name: "add new tickets",
    component: <MissingCashbacks />,
  },
  {
    name: "check old tickets",
    component: <MissingCashbacks />,
  },
  {
    name: "refer & earn",
    img: "/profile-menu-icons/refer-earn.png",
    component: <ReferEarn />,
  },
  {
    name: "referral network",
    img: "/profile-menu-icons/referral-network.png",
    component: <ReferralNetwork />,
  },
  {
    name: "get help",
    img: "/profile-menu-icons/get-help.png",
    component: <GetHelp />,
  },
  {
    name: "testimonials",
    img: "/profile-menu-icons/testimonials.png",
    component: <GetHelp />,
  },
  {
    name: "settings",
    img: "/profile-menu-icons/settings.png",
    component: <Settings />,
  },
  {
    name: "logout",
    img: "/profile-menu-icons/logout.png",
    component: <Settings />,
  },
];

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
          {/* <div className="submenu">
            <p
              onClick={() => {
                closeMenu();
                setActiveMenu("missing cashbacks");
              }}
              className={`submenu-item ${
                activeMenu === "missing cashbacks" && "active"
              }`}
            >
              Missing Cashbacks
            </p>
            <p>Add New Ticket</p>
            <p>Check old Tickets</p>
          </div> */}
        </div>
        <div
          className="hamburger"
          onClick={() => {
            setIsMenuActive((state) => !state);
          }}
        >
          <div className={`line ${isMenuActive && "active"}`}></div>
        </div>
        {/* <div className="right">
          <h2>My Earnings</h2>
          <div className="earnings-section">
            <p>Total Earnings</p>
            <h3>Rs. 5000</h3>
            <div className="dashed-line"></div>
            <p>
              Earnings will show here with 72 hours of your shopping via
              Somriddhi
            </p>
          </div>
          <div className="other-status">
            <div className="status-card">
              <img src="/request-payment.png" alt="request payment" />
              <h4>Request Payment</h4>
              <div className="dashed-line"></div>
              <div className="link">
                <p>Get Paid</p>
                <img src="/arrow-go.png" alt="go" />
              </div>
            </div>
            <div className="status-card">
              <div className="status-data">
                <img src="/redeemable-earnings.png" alt="request payment" />
                <p>500</p>
              </div>
              <h4>Redeemable Earnings</h4>
              <div className="dashed-line"></div>
              <div className="link">
                <p>Learn More</p>
                <img src="/arrow-go.png" alt="go" />
              </div>
            </div>
            <div className="status-card">
              <img src="/my-orders.png" alt="request payment" />
              <h4>My Orders</h4>
              <div className="dashed-line"></div>
              <div className="link">
                <p>View More</p>
                <img src="/arrow-go.png" alt="go" />
              </div>
            </div>
          </div>
        </div> */}
        <div className="right">
          {activeMenu == "my earnings" && <MyEarnings />}
          {activeMenu == "payment history" && <PaymentHistory />}
          {activeMenu == "refer & earn" && <ReferEarn />}
          {activeMenu == "referral network" && <ReferralNetwork />}
          {activeMenu == "get help" && <GetHelp />}
          {activeMenu == "settings" && <Settings />}
          {activeMenu == "missing cashbacks" && (
            <div className="missing-cashbacks">
              <h2>Missing Cashbacks</h2>
              <p>
                We are here to help. Please follow these simple steps to help us
                track your cashback (takes seconds only).
              </p>
              <div className="did-you-shop">
                <h3>Did you shop?</h3>
                <div className="buttons-container">
                  <button>Yes</button>
                  <button>No</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
