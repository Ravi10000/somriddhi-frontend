import "./deals.styles.scss";

import React, { useState, useEffect } from "react";
import DealCard from "./deal-card/deal-card";
import dealList from "./deal-list";
import CustomCarousel, {
  CarouselItem,
} from "../custom-carousel/custom-carousel";
import handleResponsive from "../../utils/handle-responsive";
// import { useHistory } from "react-router-dom";
import { getAllDeals } from "../../api/index.js";
import OfferCard from "../offers/offer-card/offer-card";
import DealsSlider from "../deals-slider/deals-slider";

export default function Deals() {
  // const history = useHistory();
  // const [deviceWidth, setDeviceWidth] = useState(null);
  const [listOfItems, setListOFItems] = useState([]);
  const [deals, setDeals] = useState([]);

  let dealData;

  const allDealsData = async () => {
    dealData = await getAllDeals();
    console.log(dealData.data.data);
    setDeals(dealData.data.data);
  };
  useEffect(() => {
    allDealsData();
  }, []);

  // useEffect(() => {
  //   setDeviceWidth(window.innerWidth);
  // }, []);

  // useEffect(() => {
  //   if (deviceWidth < 800 && deviceWidth > 500) {
  //     handleResponsive({
  //       list: deals,
  //       setList: setListOFItems,
  //       itemsPerSlide: 2,
  //     });
  //   } else if (deviceWidth > 800 && deviceWidth < 1400) {
  //     handleResponsive({
  //       list: deals,
  //       setList: setListOFItems,
  //       itemsPerSlide: 3,
  //     });
  //   } else if (deviceWidth > 1400) {
  //     handleResponsive({
  //       list: deals,
  //       setList: setListOFItems,
  //       itemsPerSlide: 4,
  //     });
  //   }
  // }, [deviceWidth]);

  return (
    <section className="deals-section" id="deals">
      <h2 className="_title">Deal Of The Day</h2>
      <div className="carousel-container">
        <DealsSlider deals={deals} />
      </div>
    </section>
  );
}
