import styles from "./offers-slider.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OfferCard from "../offers/offer-card/offer-card";
export default function OffersSlider({ offers }) {
  const settings = {
    customPaging: function (i) {
      return <div className="dots"></div>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    // infinite: offers.length > 3,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // initialSlide: 0,
    arrows: false,
    draggable: true,
    rows: 2,
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
          rows: 1,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
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
        {offers.length > 0 &&
          offers?.map((offer) => (
            <div className={styles["card-container"]} key={offer._id}>
              <div className={styles["offers-card-container"]}>
                <OfferCard offer={offer} />
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
