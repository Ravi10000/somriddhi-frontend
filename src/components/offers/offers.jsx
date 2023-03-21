import "./offers.styles.scss";

// packgages
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// components
// import OfferCard from "./offer-card/offer-card";
import Category from "./category/category";
// import OffersSlider from "../offers-slider/offers-slider";

// utils
import offerList from "./offers-list";
import handleResponsive from "../../utils/handle-responsive";
import { getAllDeals } from "../../api/index";
import OffersSlider from "../offers-slider/offers-slider";

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
  const [modifiedOfferList, setModifiedOfferList] = useState([]);
  // const history = useHistory();
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

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, []);

  // useEffect(() => {
  //   if (deviceWidth < 800 && deviceWidth > 500) {
  //     handleResponsive({
  //       list: deals,
  //       setList: setModifiedOfferList,
  //       itemsPerSlide: 2,
  //     });
  //   } else if (deviceWidth > 800 && deviceWidth < 1400) {
  //     handleResponsive({
  //       list: deals,
  //       setList: setModifiedOfferList,
  //       itemsPerSlide: 3,
  //     });
  //   } else if (deviceWidth > 1400) {
  //     handleResponsive({
  //       list: deals,
  //       setList: setModifiedOfferList,
  //       itemsPerSlide: 8,
  //     });
  //   }
  // }, [deviceWidth]);

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
        <OffersSlider offers={deals} />
      </div>
    </section>
  );
}
