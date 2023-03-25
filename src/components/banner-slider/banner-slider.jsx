import styles from "./banner-slider.module.scss";
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function BannerSlider({ banners, ForMemberships }) {
  const membershipStyles = ForMemberships ? { width: "100%" } : {};
  const settings = {
    customPaging: function (i) {
      return <div className="dots">'</div>;
    },
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
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
              <Link to={"//" + banner?.url}>
                <img
                  className="bannerImageSet"
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                    banner.image
                  }`}
                />
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
}
