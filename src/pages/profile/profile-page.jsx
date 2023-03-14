import "./profile-page.styles.scss";
import { useState } from "react";
import MyEarnings from "./my-earnings/my-earnings";
import PaymentHistory from "./payment-history/payment-history";
import ReferEarn from "./refer-earn/refer-earn";
import ReferralNetwork from "./referral-network/referral-network";
import GetHelp from "./get-help/get-help";
export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState("my earnings");
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className={`left-menu ${isMenuActive && "active"}`}>
          <div
            className={`menu-item ${activeMenu === "my earnings" && "active"}`}
            onClick={() => {
              setActiveMenu("my earnings");
            }}
          >
            <img
              src={`/earnings${
                activeMenu === "my earnings" ? "-active" : ""
              }.png`}
              alt="my earnings"
            />
            <p>My Earnings</p>
          </div>
          <div
            className={`menu-item ${
              activeMenu === "payment history" && "active"
            }`}
            onClick={() => {
              setActiveMenu("payment history");
            }}
          >
            <img
              src={`/payment-history${
                activeMenu === "payment history" ? "-active" : ""
              }.png`}
              alt="my earnings"
            />
            <p>Payment History</p>
          </div>
          <div className="submenu">
            <p
              onClick={() => {
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
          </div>
          <div
            className={`menu-item ${
              activeMenu === "refer and earn" && "active"
            }`}
            onClick={() => {
              setActiveMenu("refer and earn");
            }}
          >
            <img
              src={`/refer-earn${
                activeMenu === "refer and earn" ? "-active" : ""
              }.png`}
              alt="refer and earn"
            />
            <p>Refer & Earn</p>
          </div>
          <div
            className={`menu-item ${
              activeMenu === "referal network" && "active"
            }`}
            onClick={() => {
              setActiveMenu("referal network");
            }}
          >
            <img
              src={`/referal-network${
                activeMenu === "referal network" ? "-active" : ""
              }.png`}
              alt="referal network"
            />
            <p>Referal Network</p>
          </div>
          <div
            className={`menu-item ${activeMenu === "get help" && "active"}`}
            onClick={() => {
              setActiveMenu("get help");
            }}
          >
            <img
              src={`/get-help${activeMenu === "get help" ? "-active" : ""}.png`}
              alt="get help"
            />
            <p>Get Help</p>
          </div>
          <div
            className={`menu-item ${activeMenu === "testimonials" && "active"}`}
            onClick={() => {
              setActiveMenu("testimonials");
            }}
          >
            <img
              src={`/testimonials${
                activeMenu === "testimonials" ? "-active" : ""
              }.png`}
              alt="testimonials"
            />
            <p>testimonials</p>
          </div>
          <div
            className={`menu-item ${activeMenu === "settings" && "active"}`}
            onClick={() => {
              setActiveMenu("settings");
            }}
          >
            <img
              src={`/settings${activeMenu === "settings" ? "-active" : ""}.png`}
              alt="settings"
            />
            <p>Settings</p>
          </div>
          <div
            className={`menu-item ${activeMenu === "logout" && "active"}`}
            onClick={() => {
              setActiveMenu("logout");
            }}
          >
            <img
              src={`/logout${activeMenu === "logout" ? "-active" : ""}.png`}
              alt="logout"
            />
            <p>Logout</p>
          </div>
        </div>
        {/* <div
          className="hamburger"
          onClick={() => {
            setIsMenuActive((state) => !state);
          }}
        >
          <div className={`line ${isMenuActive && "active"}`}></div>
        </div> */}
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
          {activeMenu == "refer and earn" && <ReferEarn />}
          {activeMenu == "referal network" && <ReferralNetwork />}
          {activeMenu == "get help" && <GetHelp />}
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
