import "./coupons.styles.scss";
import React, { useState, useEffect } from "react";
import couponsCategoryList from "./coupons-category-list";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";
import offers from "./offers";
import DealCard from "../deals/deal-card/deal-card";
import handleResponsive from "../../utils/handle-responsive";
export default function Coupons() {
  const [deviceWidth, setDeviceWidth] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("fashion");
  const [selectdCategoryOffers, setSelectedCategoryOffers] = useState([]);
  const [listOfItemsToShow, setListOfItemsToShow] = useState([]);

  useEffect(() => {
    setSelectedCategory(couponsCategoryList[0]?.name);
    setDeviceWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (deviceWidth < 500 && deviceWidth > 200) {
      handleResponsive({
        list: couponsCategoryList,
        setList: setListOfItemsToShow,
        itemsPerSlide: 3,
      });
      handleResponsive({
        list: offers,
        setList: setSelectedCategoryOffers,
        itemsPerSlide: 1,
      });
    } else if (deviceWidth < 800 && deviceWidth > 500) {
      handleResponsive({
        list: couponsCategoryList,
        setList: setListOfItemsToShow,
        itemsPerSlide: 5,
      });
      handleResponsive({
        list: offers,
        setList: setSelectedCategoryOffers,
        itemsPerSlide: 3,
      });
    } else if (deviceWidth > 1000 && deviceWidth < 1400) {
      handleResponsive({
        list: couponsCategoryList,
        setList: setListOfItemsToShow,
        itemsPerSlide: 7,
      });
      handleResponsive({
        list: offers,
        setList: setSelectedCategoryOffers,
        itemsPerSlide: 3,
      });
    } else if (deviceWidth > 1400) {
      handleResponsive({
        list: couponsCategoryList,
        setList: setListOfItemsToShow,
        itemsPerSlide: 9,
      });
      handleResponsive({
        list: offers,
        setList: setSelectedCategoryOffers,
        itemsPerSlide: 4,
      });
    }
  }, [deviceWidth]);

  return (
    <section className="coupons-section">
      <div className="container">
        <h2 className="_title">Coupon By Categories</h2>
        <div className="container">
          <div className="carousel-container">
            <CustomCarousel HideIndicators>
              {listOfItemsToShow.length > 0
                ? listOfItemsToShow.map((tableOfferListItem, index) => {
                    return (
                      <CarouselItem key={index}>
                        <div className="menu-cards-container">
                          {tableOfferListItem?.map(({ name, img }, index) => {
                            return (
                              <div
                                onClick={() => {
                                  setSelectedCategory(name);
                                }}
                                className={`coupon-category-card ${
                                  name === selectedCategory && "selected"
                                }`}
                              >
                                <img src={img} alt="category" />
                                <h5>{name}</h5>
                              </div>
                            );
                          })}
                        </div>
                      </CarouselItem>
                    );
                  })
                : couponsCategoryList?.map(({ name, img }, index) => {
                    return (
                      <CarouselItem key={index}>
                        <div
                          className={`coupon-category-card ${
                            index == 0 && "selected"
                          }`}
                        >
                          <img src={img} alt="category" />
                          <h5>{name}</h5>
                        </div>
                      </CarouselItem>
                    );
                  })}
            </CustomCarousel>
          </div>
          <div className="options-section">
            <div className="options-carousel">
              <CustomCarousel>
                {selectdCategoryOffers.length > 0
                  ? selectdCategoryOffers.map((offerList, index) => {
                      return (
                        <CarouselItem key={index}>
                          <div className="menu-cards-container">
                            {offerList?.map(
                              ({ title, imgUrl, details }, index) => {
                                return (
                                  <DealCard
                                    key={index}
                                    title={title}
                                    details={details}
                                    imgUrl={imgUrl}
                                  />
                                );
                              }
                            )}
                          </div>
                        </CarouselItem>
                      );
                    })
                  : selectdCategoryOffers?.map(
                      ({ title, imgUrl, details }, index) => {
                        return (
                          <CarouselItem>
                            <DealCard
                              key={index}
                              title={title}
                              details={details}
                              imgUrl={imgUrl}
                            />
                          </CarouselItem>
                        );
                      }
                    )}
              </CustomCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
