import "./all-banners.styles.scss";
// react hooks
import { useState, useEffect } from "react";

// components
import TitleSection from "../title-section/title-section";
import AddBannerPopup from "../../../components/add-banner-popup/add-banner-popup";
// utils
import bannerList from "./banner-list";

// api requests
import { getAllBanners, deleteBanner } from "../../../api/index";
import BannerCard from "./banner-card/banner-card";

export default function AllBanners() {
  const [banners, setBanners] = useState([]);
  const [showAddBannerPopup, setShowAddBannerPopup] = useState(false);
  async function fetchBanners() {
    try {
      const response = await getAllBanners();
      console.log({ response });
      setBanners(response.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchBanners();
  }, [showAddBannerPopup]);

  async function deleteBannerHandler(id, setIsDeleting) {
    setIsDeleting(true);
    try {
      const response = await deleteBanner(id);
      console.log({ response });
      await fetchBanners();
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {showAddBannerPopup && (
        <AddBannerPopup
          setShowPopup={setShowAddBannerPopup}
          fetchBanners={fetchBanners}
        />
      )}
      <div className="all-banners">
        <TitleSection
          title="all banners"
          addFunction={() => setShowAddBannerPopup(true)}
        />
        <div className="banner-cards-container">
          {banners?.map((banner) => (
            <BannerCard
              banner={banner}
              key={banner?._id}
              deleteBannerHandler={deleteBannerHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
}
