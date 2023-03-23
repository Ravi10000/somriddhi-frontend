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

export default function AllBanners() {
  const [banners, setBanners] = useState([]);
  const [showAddBannerPopup, setShowAddBannerPopup] = useState(false);
  async function fetchBanners() {
    try {
      const response = await getAllBanners();
      setBanners(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchBanners();
  }, [showAddBannerPopup]);

  async function deleteBannerHandler(id) {
    try {
      const response = await deleteBanner(id);
      console.log({ response });
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
          {banners.reverse()?.map((banner, index) => (
            <div className="banner-card" key={index}>
              <img
                className="banner-img"
                src={`http://localhost:8001/${banner?.image}`}
                alt={banner?.name}
              />
              <div className="banner-details">
                <div className="info-container">
                  <div className="banner-info">
                    <h5 className="name">{banner?.name}</h5>
                    {/* <div className="info expiry-date">
                        <img src="/date.png" alt="date" />
                        <p>{expiryDate ? expiryDate : "unavailable"}</p>
                      </div> */}
                    <a
                      href={banner?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="info banner-link">
                        <img src="/link.png" alt="banner link" />
                        <p>{banner?.url}</p>
                      </div>
                    </a>
                  </div>
                  <img
                    className="lock-icon"
                    src="/delete.png"
                    alt="locked"
                    onClick={() => {
                      deleteBannerHandler(banner?._id);
                    }}
                  />
                  {/* <img src="/delete.png" alt="" /> */}
                </div>
                <div className="banner-desc">{banner?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
