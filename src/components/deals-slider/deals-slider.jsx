import styles from "./deals-slider.module.scss";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dealList from "./deal-list";
// import DealCard from "../deals/deal-card/deal-card";
import OfferCard from "../offers/offer-card/offer-card";

export default function DealsSlider({ deals, forCoupons }) {
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
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
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
          deals.reverse()?.map(({ _id, name, cashbackPercent, image, url }) => (
            <div className={styles["card-container"]}>
              <div className={styles["deals-card-container"]}>
                <OfferCard
                  forCoupons
                  _id={_id}
                  image={image}
                  name={name}
                  url={url}
                  cashbackPercent={cashbackPercent}
                />
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
