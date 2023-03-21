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
import { getAllDeals, getAllCategories } from "../../api/index.js";
import OfferCard from "../offers/offer-card/offer-card";
import SelectCategorySlider from "../select-category-slider/select-category-slider";
// import DealsSlider from "../deals-slider copy/deals-slider";
import OffersSlider from "../offers-slider/offers-slider";
import DealsSlider from "../deals-slider/deals-slider";

export default function Coupons() {
  const [selectedCategory, setSelectedCategory] = useState("fashion");
  const [selectdCategoryOffers, setSelectedCategoryOffers] = useState([]);
  const [listOfItemsToShow, setListOfItemsToShow] = useState([]);
  const [deals, setDeals] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const allCategories = async () => {
    const response = await getAllCategories();
    console.log(response.data.data);
    setCategoriesData(response.data.data);
  };

  const allDealsData = async () => {
    const response = await getAllDeals();
    console.log(response.data.data);
    setDeals(response.data.data);
  };
  useEffect(() => {
    allCategories();
    allDealsData();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoriesData[0]?.name); // selected Category
    // setDeviceWidth(window.innerWidth); // to use in responsive carousel
  }, [categoriesData]);

  // useEffect(() => {
  //   if (deviceWidth < 500 && deviceWidth > 200) {
  //     handleResponsive({
  //       list: categoriesData,
  //       setList: setListOfItemsToShow,
  //       itemsPerSlide: 3,
  //     });
  //     handleResponsive({
  //       list: deals,
  //       setList: setSelectedCategoryOffers,
  //       itemsPerSlide: 1,
  //     });
  //   } else if (deviceWidth < 800 && deviceWidth > 500) {
  //     handleResponsive({
  //       list: categoriesData,
  //       setList: setListOfItemsToShow,
  //       itemsPerSlide: 5,
  //     });
  //     handleResponsive({
  //       list: deals,
  //       setList: setSelectedCategoryOffers,
  //       itemsPerSlide: 3,
  //     });
  //   } else if (deviceWidth > 1000 && deviceWidth < 1400) {
  //     handleResponsive({
  //       list: categoriesData,
  //       setList: setListOfItemsToShow,
  //       itemsPerSlide: 7,
  //     });
  //     handleResponsive({
  //       list: deals,
  //       setList: setSelectedCategoryOffers,
  //       itemsPerSlide: 3,
  //     });
  //   } else if (deviceWidth > 1400) {
  //     handleResponsive({
  //       list: categoriesData,
  //       setList: setListOfItemsToShow,
  //       itemsPerSlide: 9,
  //     });
  //     handleResponsive({
  //       list: deals,
  //       setList: setSelectedCategoryOffers,
  //       itemsPerSlide: 4,
  //     });
  //   }
  // }, [deviceWidth]);

  return (
    <section className="coupons-section" id="coupons">
      <div className="container">
        <h2 className="_title">Coupon By Categories</h2>
        <div className="container">
          <div className="menu-carousel-container">
            <SelectCategorySlider
              categories={categoriesData}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="coupons-carousel-container">
            <DealsSlider deals={deals} forCoupons />
          </div>
        </div>
      </div>
    </section>
  );
}
