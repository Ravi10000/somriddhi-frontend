import styles from "./admin.module.scss";

// react hooks
import { useEffect, useState, lazy } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Suspense } from "react";
import LoadingPage from "../loading/loading";
import SideBar from "../../components/sidebar/sidebar";

import TopBar from "../../components/topbar/topbar";
import AddBannerModal from "../Banner/AddBannerModal";
import menuList from "../../components/sidebar/menu-list";

const AllBanners = lazy(() => import("./all-banners/all-banners"));
const AllDeals = lazy(() => import("./all-deals/all-deals"));
const AllCategories = lazy(() => import("./all-categories/all-categories"));
const AllMemberships = lazy(() => import("./all-memberships/all-memberships"));
const AllNewsletters = lazy(() => import("./all-newsletters/all-newsletters"));
const WebsiteContent = lazy(() => import("./website-content/website-content"));
const AllCustomers = lazy(() => import("./all-customers/all-customers"));
const TicketsSection = lazy(() => import("./tickets-section/tickets-section"));
const AllFaqs = lazy(() => import("./all-faqs/all-faqs"));
const AllFeedbacks = lazy(() => import("./all-feedbacks/all-feedbacks"));
const Analytics = lazy(() => import("./analytics/analytics"));
const Tracking = lazy(() => import("./tracking-details/tracking-details"));
const AllPayments = lazy(() => import("./all-payments/all-payments"));
const AllPayouts = lazy(() => import("./all-payouts/all-payouts"));
const AllGiftCards = lazy(() => import("./all-gift-cards/all-gift-cards"));

export default function AdminPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [categories, setCategories] = useState("yes");
  const [selectedOption, setSelectedOption] = useState();

  console.log({ params });

  useEffect(() => {
    if (!menuList.includes(params?.tab)) {
      navigate("/admin/banners");
    } else {
      setSelectedOption(params.tab);
    }
  }, [params?.tab]);

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
          <TopBar
            selectedOption={selectedOption}
            showMenu={showMenu}
            isMenuVisible={isMenuVisible}
          />
          <Suspense fallback={<LoadingPage />}>
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
              {selectedOption === "tracking details" && <Tracking />}
              {selectedOption === "payment details" && <AllPayments />}
              {selectedOption === "payout details" && <AllPayouts />}
              {selectedOption === "gift cards" && <AllGiftCards />}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
