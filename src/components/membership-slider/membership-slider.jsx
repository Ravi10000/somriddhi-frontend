import styles from "./membership-slider.module.scss";
import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function MembershipSlider({ banners }) {
  const settings = {
    customPaging: function (i) {
      return <div className="dots">'</div>;
    },
    arrows: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
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
            <div className={styles["card-container"]} key={index}>
              <Link to={"//" + banner?.url}>
                <img
                  className="bannerImageSet"
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                    banner?.image
                  }`}
                />
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
}
