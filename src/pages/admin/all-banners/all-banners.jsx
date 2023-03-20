import "./all-banners.styles.scss";
// react hooks
import { useState, useEffect } from "react";

// components
import TitleSection from "../title-section/title-section";
import AddBannerPopup from "../../../components/add-banner-popup/add-banner-popup";
// utils
import bannerList from "./banner-list";

// api requests
import { getAllBanners } from "../../../api/index";

export default function AllBanners() {
  const [banners, setBanners] = useState([]);
  const [showAddBannerPopup, setShowAddBannerPopup] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const response = await getAllBanners();
        // const responeFaq = await axios.post("/faq", {
        //   question: "what is this",
        //   answer: "this is answer",
        // });
        // console.log({ responeFaq });
        setBanners(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [showAddBannerPopup]);
  return (
    <>
      {showAddBannerPopup && (
        <AddBannerPopup setShowPopup={setShowAddBannerPopup} />
      )}
      <div className="all-banners">
        <TitleSection
          title="all banners"
          addFunction={() => setShowAddBannerPopup(true)}
        />
        <div className="banner-cards-container">
          {banners.reverse()?.map(
            ({ name, url, expiryDate, image, description }, index) => (
              <div className="banner-card" key={index}>
                <img
                  className="banner-img"
                  src={`http://localhost:8001/${image}`}
                  alt={name}
                />
                <div className="banner-details">
                  <div className="info-container">
                    <div className="banner-info">
                      <h5 className="name">{name}</h5>
                      {/* <div className="info expiry-date">
                        <img src="/date.png" alt="date" />
                        <p>{expiryDate ? expiryDate : "unavailable"}</p>
                      </div> */}
                      <div className="info banner-link">
                        <img src="/link.png" alt="banner link" />
                        <p>{url}</p>
                      </div>
                    </div>
                    <img className="lock-icon" src="/lock.png" alt="locked" />
                  </div>
                  <div className="banner-desc">{description}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
