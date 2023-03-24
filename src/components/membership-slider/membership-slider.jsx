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
    // adaptiveHeight: true,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    // initialSlide: 2,
    rows: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          rows: 1,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          rows: 1,
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
          banners?.map((banner, index) => (
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
