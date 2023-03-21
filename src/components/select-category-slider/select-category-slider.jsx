import styles from "./select-category-slider.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import OfferCard from "../offers/offer-card/offer-card";

export default function SelectCategorySlider({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const settings = {
    customPaging: function (i) {
      return <div className="dots"></div>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 9,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div className={styles["slider-container"]}>
      <Slider {...settings}>
        {categories.length > 0 &&
          categories?.map(({ name, icon }, index) => (
            <div className={styles["card-container"]}>
              <div className={styles["inner-card-container"]}>
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCategory(name);
                  }}
                  className={`${styles["menu-card"]} ${
                    name === selectedCategory && styles["selected"]
                  }`}
                >
                  <img src={`http://localhost:8001/${icon}`} alt="category" />
                  <h5>{name}</h5>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
