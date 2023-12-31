import styles from "./banner-slider.module.scss";
import React from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useLoginModal } from "../../context/login-modal-context";
import axios from "axios";

function BannerSlider({ banners, ForMemberships, currentUser, openModal }) {
  const navigate = useNavigate();
  const modal = useLoginModal();
  // console.log({ modal });
  const membershipStyles = ForMemberships ? { width: "100%" } : {};

  function checkLogin(url) {
    console.log({ currentUser });
    if (!currentUser) {
      return modal.openModal();
    }
    if (url.startsWith("//")) url = url.substring(2).trim();
    console.log("Url: ", url);
    // navigate(url);
    // window.open(url);
  }

  const settings = {
    customPaging: function (i) {
      return <div className="dots">'</div>;
    },
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    appendDots: (dots) => (
      <div
        className="dots-container"
        style={{
          width: "100%",
          display: "flex",
          height: "10px",
          overflowY: "hidden",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "80%" }}>{dots}</div>
      </div>
    ),
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // slidesToShow: 2,
    // slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function sendBannerAnalytics(id, bannerUrl) {
    console.log(currentUser);
    if (!currentUser) {
      return modal.openModal();
    }
    if (id) {
      const formData = new FormData();
      formData.append("couponId", id);
      formData.append("userId", currentUser?._id);
      formData.append("deviceType", "Web");
      formData.append("couponType", "Banner");
      formData.append("startDateTime", new Date(Date.now()).toString());

      for (let entry of formData.entries()) {
        console.log(entry);
      }
      try {
        const response = await axios.post("/analytic/coupon", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        console.log({ response });
        if (response.data.status === "success") {
          const analyticId = response.data.analyticId;
          // setAnalyticId(response.data.analyticId);
          if (bannerUrl.startsWith("//"))
            bannerUrl = bannerUrl.substring(2).trim();
          console.log("Url: ", bannerUrl + "&ascsubtag=" + analyticId);
          window.open(bannerUrl + "&ascsubtag=" + analyticId, "_blank");
        }
        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={styles["slider-container"]} style={membershipStyles}>
      <Slider {...settings}>
        {banners?.length > 0 &&
          banners?.map((banner, index) => (
            <div className={styles["card-container"]} key={index}>
              {/* <Link to={"//" + banner?.url}> */}
              <img
                onClick={() => {
                  sendBannerAnalytics(banner?._id, banner?.url);
                  // checkLogin("//" + banner?.url);
                }}
                className="bannerImageSet"
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                  banner.image
                }`}
                onError={(e) => {
                  if (e) e.target.src = "/image-broke.png";
                }}
              />
              {/* </Link> */}
            </div>
          ))}
      </Slider>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(BannerSlider);
