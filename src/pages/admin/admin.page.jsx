import "./admin.styles.scss";
import React, { useState } from "react";
import SideBar from "../../components/Topbar/Topbar";
import Nav from "../../components/Nav/Nav";
import AddBannerModal from "../Banner/AddBannerModal";
import AllBanners from "./all-banners/all-banners";
import AllDeals from "./all-deals/all-deals";
import AllCategories from "./all-categories/all-categories";
import AllMemberships from "./all-memberships/all-memberships";
import AllNewsletters from "./all-newsletters/all-newsletters";
import WebsiteContent from "./website-content/website-content";
import AllCustomers from "./all-customers/all-customers";
// import menuList from "../../components/Topbar/menu-list";

export default function AdminPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [categories, setCategories] = useState("yes");
  const [selectedOption, setSelectedOption] = useState("website content");

  function closeModal() {
    setModalOpen(false);
  }
  function openModal() {
    setModalOpen(true);
  }
  function showMenu() {
    window.scrollTo(0, 0);
    setIsMenuVisible(true);
  }
  function hideMenu() {
    setIsMenuVisible(false);
  }

  return (
    <div className="admin-page">
      {modalOpen && (
        <AddBannerModal
          closeModal={closeModal}
          categories={categories}
          setCategories={setCategories}
        />
      )}
      <div className="content-container">
        <SideBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isMenuVisible={isMenuVisible}
          setIsMenuVisible={setIsMenuVisible}
          hideMenu={hideMenu}
        />
        <div className="content">
          <Nav
            selectedOption={selectedOption}
            showMenu={showMenu}
            isMenuVisible={isMenuVisible}
          />
          <div className="main-content-container">
            {selectedOption === "banners" && <AllBanners />}
            {selectedOption === "deals" && <AllDeals />}
            {selectedOption === "categories" && <AllCategories />}
            {selectedOption === "memberships" && <AllMemberships />}
            {selectedOption === "newsletters" && <AllNewsletters />}
            {selectedOption === "website content" && <WebsiteContent />}
            {selectedOption === "customers" && <AllCustomers />}
          </div>
        </div>
      </div>
    </div>
  );
}
