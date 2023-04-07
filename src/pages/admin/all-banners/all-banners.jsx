import styles from "./all-banners.module.scss";
// react hooks
import { useState, useEffect } from "react";

// packages
import { connect } from "react-redux";

// components
import TitleSection from "../title-section/title-section";
import AddBannerPopup from "../../../components/add-banner-popup/add-banner-popup";
import BannerCard from "./banner-card/banner-card";

// api requests
import {
  getAllBanners,
  deleteBanner,
  changeBannerStatus,
} from "../../../api/index";

// redux actions
import { setFlash } from "../../../redux/flash/flash.actions";

function AllBanners({ setFlash }) {
  const [banners, setBanners] = useState([]);
  const [showAddBannerPopup, setShowAddBannerPopup] = useState(false);
  const [bannerToEdit, setBannerToEdit] = useState(null);

  async function fetchBanners() {
    try {
      const response = await getAllBanners();
      console.log({ response });
      setBanners(response.data.data);
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
      if (response.data.status === "success") {
        setFlash({ message: "Banner deleted successfully", type: "success" });
      }
      await fetchBanners();
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function changeStatus(bannerId, status, setIsChangingStatus) {
    console.log("change status");
    setIsChangingStatus(true);
    const formData = new FormData();
    formData.append("bannerId", bannerId);
    formData.append("status", status);
    try {
      const response = await changeBannerStatus(formData);
      console.log({ response });
      if (response.data.status === "success") {
        await fetchBanners();
        setFlash({
          type: "success",
          message: response?.data?.message,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsChangingStatus(false);
    }
  }

  return (
    <>
      {showAddBannerPopup && (
        <AddBannerPopup
          setBannerToEdit={setBannerToEdit}
          bannerToEdit={bannerToEdit}
          setShowPopup={setShowAddBannerPopup}
          fetchBanners={fetchBanners}
        />
      )}
      <div className={styles["all-banners"]}>
        <TitleSection
          title="all banners"
          addFunction={() => setShowAddBannerPopup(true)}
        />
        <div className={styles["banner-cards-container"]}>
          {banners?.map((banner) => (
            <BannerCard
              changeStatus={changeStatus}
              key={banner?._id}
              setShowPopup={setShowAddBannerPopup}
              setBannerToEdit={setBannerToEdit}
              banner={banner}
              deleteBannerHandler={deleteBannerHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AllBanners);
