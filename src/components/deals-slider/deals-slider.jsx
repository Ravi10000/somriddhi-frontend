import styles from "./deals-slider.module.scss";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OfferCard from "../offers/offer-card/offer-card";

export default function DealsSlider({ deals, forCoupons }) {
  // useEffect(() => {
  //   console.log("deals changed");
  // }, [deals]);
  const couponsStyles = forCoupons
    ? {
        width: "80%",
        background: "#fff",
        padding: "20px 20px 50px 20px",
        borderRadius: "8px 8px 15px 15px",
      }
    : {};
  const settings = {
    customPaging: function (i) {
      return <div className="dots"></div>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: deals.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    arrows: false,
    draggable: true,
    // accessibility: true,
    // swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles["slider-container"]} style={couponsStyles}>
      <Slider {...settings}>
        {deals.length > 0 &&
          deals.reverse()?.map((offer) => (
            <div className={styles["card-container"]} key={offer._id}>
              <div className={styles["deals-card-container"]}>
                <OfferCard forCoupons offer={offer} />
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
