import styles from "./banner-slider.module.scss";
import React from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useLoginModal } from "../../context/login-modal-context";

function BannerSlider({ banners, ForMemberships, currentUser, openModal }) {
  const navigate = useNavigate();
  const modal = useLoginModal();
  console.log({ modal });
  const membershipStyles = ForMemberships ? { width: "100%" } : {};

  function checkLogin(url) {
    console.log({ currentUser });
    if (!currentUser) {
      return modal.openModal();
    }
    navigate(url);
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
    slidesToShow: 2,
    slidesToScroll: 2,
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

  return (
    <div className={styles["slider-container"]} style={membershipStyles}>
      <Slider {...settings}>
        {banners.length > 0 &&
          banners?.map((banner, index) => (
            <div className={styles["card-container"]} key={index}>
              {/* <Link to={"//" + banner?.url}> */}
              <img
                onClick={() => {
                  checkLogin("//" + banner?.url);
                }}
                className="bannerImageSet"
                src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                  banner.image
                }`}
                onError={(e) => {
                  if (e) e.target.src = "/no-photo.png";
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
