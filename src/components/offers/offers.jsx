import styles from "./offers.module.scss";

// react hooks
import { useEffect, useState } from "react";

// components
import Category from "./category/category";
import OffersSlider from "../offers-slider/offers-slider";

// api calls
import { getAllDeals } from "../../api/index";
import DealsSlider from "../deals-slider/deals-slider";

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
      // console.log({ response });
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
    <section className={styles["offers-section"]}>
      <div className={styles["categories"]}>
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
      <div className={styles["offer-carousel"]}>
        <OffersSlider offers={deals} />
      </div>
    </section>
  );
}
