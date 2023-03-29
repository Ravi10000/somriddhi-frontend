import styles from "./admin.module.scss";

// react hooks
import { useEffect, useState } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import SideBar from "../../components/sidebar/sidebar";

import Nav from "../../components/Nav/Nav";
import AddBannerModal from "../Banner/AddBannerModal";
import AllBanners from "./all-banners/all-banners";
import AllDeals from "./all-deals/all-deals";
import AllCategories from "./all-categories/all-categories";
import AllMemberships from "./all-memberships/all-memberships";
import AllNewsletters from "./all-newsletters/all-newsletters";
import WebsiteContent from "./website-content/website-content";
import AllCustomers from "./all-customers/all-customers";
import TicketsSection from "./tickets-section/tickets-section";
import AllFaqs from "./all-faqs/all-faqs";
import AllFeedbacks from "./all-feedbacks/all-feedbacks";
import menuList from "../../components/sidebar/menu-list";
import Analytics from "./analytics/analytics";

export default function AdminPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [categories, setCategories] = useState("yes");
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (!menuList.includes(params.tab)) {
      navigate("/admin/banners");
    } else {
      setSelectedOption(params.tab);
    }
  }, [params]);

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
    <div className={styles["admin-page"]}>
      {modalOpen && (
        <AddBannerModal
          closeModal={closeModal}
          categories={categories}
          setCategories={setCategories}
        />
      )}
      <div className={styles["content-container"]}>
        <SideBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isMenuVisible={isMenuVisible}
          setIsMenuVisible={setIsMenuVisible}
          hideMenu={hideMenu}
        />
        <div className={styles["content"]}>
          <Nav
            selectedOption={selectedOption}
            showMenu={showMenu}
            isMenuVisible={isMenuVisible}
          />
          <div className={styles["main-content-container"]}>
            {selectedOption === "banners" && <AllBanners />}
            {selectedOption === "deals" && <AllDeals />}
            {selectedOption === "categories" && <AllCategories />}
            {selectedOption === "memberships" && <AllMemberships />}
            {selectedOption === "newsletters" && <AllNewsletters />}
            {selectedOption === "website content" && <WebsiteContent />}
            {selectedOption === "customers" && <AllCustomers />}
            {selectedOption === "tickets" && <TicketsSection />}
            {selectedOption === "FAQs" && <AllFaqs />}
            {selectedOption === "feedbacks" && <AllFeedbacks />}
            {selectedOption === "analytics" && <Analytics />}
          </div>
        </div>
      </div>
    </div>
  );
}
