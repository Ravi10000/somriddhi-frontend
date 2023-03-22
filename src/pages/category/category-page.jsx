import "./category-page.style.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import entertainmentCoupons from "./entertainment-coupons";
import DealCard from "../../components/deals/deal-card/deal-card";
import FilterList from "../../components/filter-list/filter-list";
import { getAllDeals } from "../../api/index.js";
// import { OfferCard } from '../../components/offers/offer-card'
import OfferCard from "../../components/offers/offer-card/offer-card";

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deals, setDeals] = useState([]);
  const { category } = useParams();
  // console.log({ category });

  const allDealsData = async () => {
    try {
      const formData = new FormData();
      if (selectedCategory) formData.append("categoryId", selectedCategory._id);
      const response = await getAllDeals(formData);
      console.log({ response });
      setDeals(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allDealsData();
  }, [selectedCategory]);
  return (
    <div className="category-page">
      <div className="heading">
        <h1>{category}</h1>
        <p>
          Home / <span>{category}</span>
        </p>
      </div>
      <section className="category-section">
        <div className="filter-container">
          <FilterList
            // category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="category-container">
          <div className="category-heading-container">
            <h4>Coupons</h4>
            <p>showing 1 -20 results</p>
          </div>
          <div className="category-cards-container">
            {deals &&
              deals.map(({ _id, name, cashbackPercent, image }) => (
                <OfferCard
                  key={_id}
                  _id={_id}
                  name={name}
                  cashbackPercent={cashbackPercent}
                  image={image}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
