import "./offers.styles.scss";

// packgages
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// components
import OfferCard from "./offer-card/offer-card";
import Category from "./category/category";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";

// utils
import offerList from "./offers-list";
import handleResponsive from "../../utils/handle-responsive";

export default function Offers() {
  // const history = useHistory();

  const categories = [
    {
      name: "popular coupons",
      img: "/popular.png",
    },
    {
      name: "ending soon",
      img: "/ending.png",
    },
    {
      name: "latest coupons",
      img: "/latest.png",
    },
  ];
  const [deviceWidth, setDeviceWidth] = useState(null);
  const [modifiedOfferList, setModifiedOfferList] = useState([]);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (deviceWidth < 800 && deviceWidth > 500) {
      handleResponsive({
        list: offerList,
        setList: setModifiedOfferList,
        itemsPerSlide: 2,
      });
    } else if (deviceWidth > 800 && deviceWidth < 1400) {
      handleResponsive({
        list: offerList,
        setList: setModifiedOfferList,
        itemsPerSlide: 3,
      });
    } else if (deviceWidth > 1400) {
      handleResponsive({
        list: offerList,
        setList: setModifiedOfferList,
        itemsPerSlide: 8,
      });
    }
  }, [deviceWidth]);

  const [selectedCategory, setSelectedCategory] = useState("popular coupons");
  return (
    <section className="offers-section">
      <div className="categories">
        {categories.map(({ name, img }) => (
          <Category
            key={name}
            name={name}
            img={img}
            selected={selectedCategory === name}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      <div className="carousel-container">
        <CustomCarousel>
          {modifiedOfferList.length > 0
            ? modifiedOfferList.map((offerItem, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className="offers-cards-container">
                      {offerItem?.map(({ id, title, discount, imgUrl }) => {
                        return (
                          <OfferCard
                            // onClick={() => {
                            //   history.push(`/coupon/${id}`);
                            // }}
                            key={id}
                            id={id}
                            title={title}
                            discount={discount}
                            imgUrl={imgUrl}
                          />
                        );
                      })}
                    </div>
                  </CarouselItem>
                );
              })
            : offerList?.map(({ title, discount, imgUrl }, index) => {
                return (
                  <CarouselItem key={index}>
                    <OfferCard
                      title={title}
                      discount={discount}
                      imgUrl={imgUrl}
                    />
                  </CarouselItem>
                );
              })}
        </CustomCarousel>
      </div>
    </section>
  );
}
