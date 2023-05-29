import styles from "./gift-card-slider.module.scss";

import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import GiftCard from "../gift-card/gift-card";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllGiftCards } from "../../api";
import getRandomImage from "../../data/gift-card-images";

export default function GiftCardSlider() {
  const [giftCards, setGiftCards] = useState([]);

  async function handleFetchGiftCards() {
    try {
      const response = await fetchAllGiftCards();
      console.log({ response });
      if ((response.status = "Success")) {
        setGiftCards(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFetchGiftCards();
  }, []);

  const settings = {
    customPaging: function (i) {
      return <div className="dots">'</div>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    draggable: true,
    rows: 2,
    initialSlide: 0,
    appendDots: (dots) => (
      <div
        className="dots-container"
        style={{
          width: "100%",
          display: "flex",
          height: "10px",
          overflowY: "hidden",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "80%" }}>{dots}</div>
      </div>
    ),
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
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles["slider-container"]}>
      <Slider {...settings}>
        {giftCards?.price?.denominations?.map((price, idx) => (
          <div className={styles["card-container"]} key={idx}>
            <div className={styles["offers-card-container"]}>
              <GiftCard
                giftCard={{
                  price,
                  image: getRandomImage(),
                  // imagesArray[
                  //   Math.floor(Math.random() * imagesArray?.length)
                  // ],
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
