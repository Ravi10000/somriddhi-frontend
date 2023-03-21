import styles from "./membership-slider.module.scss";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MembershipSlider({ banners }) {
  const settings = {
    customPaging: function (i) {
      return <div className="dots"></div>;
    },
    arrows: false,
    adaptiveHeight: true,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
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
    <div className={styles["slider-container"]}>
      <Slider {...settings}>
        {banners.length > 0 &&
          banners.reverse()?.map((banner, index) => (
            <div className={styles["card-container"]} key={index}>
              <img
                className="bannerImageSet"
                src={`http://localhost:8001/${banner.image}`}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}
