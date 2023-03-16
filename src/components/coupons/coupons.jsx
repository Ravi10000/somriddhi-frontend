import "./coupons.styles.scss";

// packages
import { useState, useEffect } from "react";

// components
import DealCard from "../deals/deal-card/deal-card";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";

// utils
import couponsCategoryList from "./coupons-category-list";
import offers from "./offers";
import handleResponsive from "../../utils/handle-responsive";
import { getAllDeals } from "../../api/index.js";


export default function Coupons() {
  // states
  const [deviceWidth, setDeviceWidth] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("fashion");
  const [selectdCategoryOffers, setSelectedCategoryOffers] = useState([]);
  const [listOfItemsToShow, setListOfItemsToShow] = useState([]);
  const [deals, setDeals] = useState([]);

  let dealData;

  const allDealsData = async () => {
    dealData = await getAllDeals();
    console.log(dealData.data.data)
    setDeals(dealData.data.data);
  }
  useEffect(() => {
    allDealsData();
  }, [])

  useEffect(() => {
    setSelectedCategory(couponsCategoryList[0]?.name); // selected Category
    setDeviceWidth(window.innerWidth); // to use in responsive carousel
  }, []);

  useEffect(() => {
    if (deviceWidth < 500 && deviceWidth > 200) {
      handleResponsive({
        list: couponsCategoryList,
        setList: setListOfItemsToShow,
        itemsPerSlide: 3,
      });
      handleResponsive({
        list: deals,
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
        list: deals,
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
        list: deals,
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
        list: deals,
        setList: setSelectedCategoryOffers,
        itemsPerSlide: 4,
      });
    }
  }, [deviceWidth]);

  return (
    <section className="coupons-section" id="coupons">
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
                              key={index}
                              onClick={() => {
                                setSelectedCategory(name);
                              }}
                              className={`coupon-category-card ${name === selectedCategory && "selected"
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
                        className={`coupon-category-card ${index == 0 && "selected"
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
                {deals.length > 0
                  ? deals.map((offerList, index) => {
                    return (
                      <CarouselItem key={index}>
                        <div className="menu-cards-container">
                          {deals?.map(
                            ({ _id, name, cashbackPercent, image }) => {
                              return (
                                <DealCard
                                  key={_id}
                                  _id={_id}
                                  name={name}
                                  cashbackPercent={cashbackPercent}
                                  image={image}
                                />
                              );
                            }
                          )}
                        </div>
                      </CarouselItem>
                    );
                  })
                  : deals?.map(
                    ({ _id, name, cashbackPercent, image }) => {
                      return (
                        <CarouselItem>
                          <DealCard
                            key={_id}
                            _id={_id}
                            name={name}
                            cashbackPercent={cashbackPercent}
                            image={image}
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
