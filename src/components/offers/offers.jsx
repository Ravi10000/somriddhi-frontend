import "./offers.styles.scss";

// packgages
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// components
// import OfferCard from "./offer-card/offer-card";
import Category from "./category/category";
// import OffersSlider from "../offers-slider/offers-slider";

// utils
// import offerList from "./offers-list";
// import handleResponsive from "../../utils/handle-responsive";
import { getAllDeals } from "../../api/index";
import OffersSlider from "../offers-slider/offers-slider";

export default function Offers() {
  const categories = [
    {
      name: "popular coupons",
      img: "/popular.png",
    },
    // {
    //   name: "ending soon",
    //   img: "/ending.png",
    // },
    // {
    //   name: "latest coupons",
    //   img: "/latest.png",
    // },
  ];

  const [deals, setDeals] = useState([]);

  const fetchAllDeals = async () => {
    try {
      const response = await getAllDeals();
      console.log({ response });
      setDeals(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllDeals();
  }, []);

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
      <div className="offer-carousel">
        <OffersSlider offers={deals} />
      </div>
    </section>
  );
}
