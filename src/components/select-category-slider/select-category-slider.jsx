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
    arrows: false,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 9,
    // initialSlide: 0,
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
          categories?.map((category) => (
            <div className={styles["card-container"]} key={category?._id}>
              <div className={styles["inner-card-container"]}>
                <div
                  onClick={() => {
                    console.log(category)
                    setSelectedCategory(category);
                  }}
                  className={`${styles["menu-card"]} ${
                    category?._id === selectedCategory?._id &&
                    styles["selected"]
                  }`}
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_API_URL}/${category?.icon}`}
                    alt="category"
                  />
                  <h5>{category?.name}</h5>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
