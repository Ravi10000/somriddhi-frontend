import "./offers.styles.scss";
import { useEffect, useState } from "react";
import OfferCard from "./offer-card/offer-card";
import offerList from "./offers-list";
import Category from "./category/category";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";
import handleResponsive from "../../utils/handle-responsive";

export default function Offers() {
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
  const [tabletOfferList, setTabletOfferList] = useState([]);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (deviceWidth < 800 && deviceWidth > 500) {
      handleResponsive({
        list: offerList,
        setList: setTabletOfferList,
        itemsPerSlide: 2,
      });
    } else if (deviceWidth > 800 && deviceWidth < 1400) {
      handleResponsive({
        list: offerList,
        setList: setTabletOfferList,
        itemsPerSlide: 3,
      });
    } else if (deviceWidth > 1400) {
      handleResponsive({
        list: offerList,
        setList: setTabletOfferList,
        itemsPerSlide: 8,
      });
    }
  }, [deviceWidth]);

  const [selectedCategory, setSelectedCategory] = useState("popular coupons");
  return (
    <section className="offers-section">
      <div className="categories">
        {categories.map(({ name, img, index }) => (
          <Category
            key={index}
            name={name}
            img={img}
            selected={selectedCategory === name}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      <div className="carousel-container">
        <CustomCarousel>
          {tabletOfferList.length > 0
            ? tabletOfferList.map((tableOfferListItem, index) => {
                return (
                  <CarouselItem>
                    <div className="offers-cards-container">
                      {tableOfferListItem?.map((offer, index) => {
                        return (
                          <OfferCard
                            key={index}
                            title={offer.title}
                            discount={offer.discount}
                            imgUrl={offer.imgUrl}
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
