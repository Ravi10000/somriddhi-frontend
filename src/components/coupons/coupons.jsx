import "./coupons.styles.scss";

// packages
import { useState, useEffect } from "react";

// utils
import { getAllDeals, getAllCategories } from "../../api/index.js";
import SelectCategorySlider from "../select-category-slider/select-category-slider";
import DealsSlider from "../deals-slider/deals-slider";

export default function Coupons() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log({ selectedCategory, categories, deals });

  const fetchCategories = async () => {
    const response = await getAllCategories();
    console.log({ response });
    setCategories(response.data.data);
    setSelectedCategory(response.data.data[0]);
  };

  const fetchDeals = async () => {
    try {
      const categoryId = selectedCategory?._id || null;
      const response = await getAllDeals(categoryId);
      console.log({ response });
      setDeals(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchDeals();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const categoryId = selectedCategory?._id || null;
        const response = await getAllDeals(categoryId);
        console.log({ response });
        setDeals(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selectedCategory]);

  return (
    <section className="coupons-section" id="coupons">
      <div className="container">
        <h2 className="_title">Coupon By Categories</h2>
        <div className="container">
          <div className="menu-carousel-container">
            <SelectCategorySlider
              categories={categories}
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
