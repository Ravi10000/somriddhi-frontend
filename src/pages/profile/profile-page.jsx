import "./profile-page.styles.scss";
import { useState } from "react";
export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState("my earnings");
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="left-menu">
          <div
            className="menu-item"
            onClick={() => {
              setActiveMenu("my earnings");
            }}
          >
            <img
              src={`/${
                activeMenu === "my earnings" ? "earnings-active" : "earnings"
              }.png`}
              alt="my earnings"
            />
            <p>My Earnings</p>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
