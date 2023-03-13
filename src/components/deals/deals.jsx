import "./deals.styles.scss";

import React, { useState, useEffect } from "react";
import DealCard from "./deal-card/deal-card";
import dealList from "./deal-list";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";
import handleResponsive from "../../utils/handle-responsive";
// import { useHistory } from "react-router-dom";

export default function Deals() {
  // const history = useHistory();
  const [deviceWidth, setDeviceWidth] = useState(null);
  const [listOfItems, setListOFItems] = useState([]);
  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (deviceWidth < 800 && deviceWidth > 500) {
      handleResponsive({
        list: dealList,
        setList: setListOFItems,
        itemsPerSlide: 2,
      });
    } else if (deviceWidth > 800 && deviceWidth < 1400) {
      handleResponsive({
        list: dealList,
        setList: setListOFItems,
        itemsPerSlide: 3,
      });
    } else if (deviceWidth > 1400) {
      handleResponsive({
        list: dealList,
        setList: setListOFItems,
        itemsPerSlide: 4,
      });
    }
  }, [deviceWidth]);

  return (
    <section className="deals-section" id="deals">
      <h2 className="_title">Deal Of The Day</h2>
      <div className="carousel-container">
        <CustomCarousel>
          {listOfItems.length > 0
            ? listOfItems.map((list, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className="deals-cards-container">
                      {list?.map(({ id, title, details, imgUrl }) => {
                        return (
                          <DealCard
                            key={id}
                            title={title}
                            details={details}
                            imgUrl={imgUrl}
                          />
                        );
                      })}
                    </div>
                  </CarouselItem>
                );
              })
            : dealList?.map(({ title, details, imgUrl }, index) => {
                return (
                  <CarouselItem key={index}>
                    <DealCard title={title} details={details} imgUrl={imgUrl} />
                  </CarouselItem>
                );
              })}
        </CustomCarousel>
      </div>
    </section>
  );
}
