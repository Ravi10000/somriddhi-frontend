import styles from "./banner-slider.module.scss";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSlider({ banners, ForMemberships }) {
  const membershipStyles = ForMemberships ? { width: "100%" } : {};
  const settings = {
    customPaging: function (i) {
      return <div className="dots"></div>;
    },
    dots: true,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // initialSlide: 0,
    draggable: true,
  };

  return (
    <div className={styles["slider-container"]} style={membershipStyles}>
      <Slider {...settings}>
        {banners.length > 0 &&
          banners.reverse()?.map((banner, index) => (
            <a
              href={banner?.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <div className={styles["card-container"]}>
                <img
                  className="bannerImageSet"
                  src={`http://localhost:8001/${banner.image}`}
                />
              </div>
            </a>
          ))}
      </Slider>
    </div>
  );
}
