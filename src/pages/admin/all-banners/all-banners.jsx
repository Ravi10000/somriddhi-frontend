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
  changeBannerPriority,
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
      if (response.data.status === "success") setBanners(response.data.banners);
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

  async function changePriority(bannerId, priority, setIsChangingPriority) {
    setIsChangingPriority(true);
    try {
      const formData = new FormData();
      formData.append("bannerId", bannerId);
      formData.append("newPriorityOrder", priority);
      const response = await changeBannerPriority(formData);

      console.log({ response });
      if (response.data.status === "success") {
        setBanners(response?.data?.banners);
        setFlash({
          type: "success",
          message: "Banner priority changed successfully",
        });
      }
    } catch (error) {
      setFlash({
        type: "error",
        message: "Something went wrong, please try again",
      });
      console.log(error.message);
    } finally {
      setIsChangingPriority(false);
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
              changePriority={changePriority}
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
