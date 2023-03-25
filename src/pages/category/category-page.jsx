import "./category-page.style.scss";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

// components
import FilterList from "../../components/filter-list/filter-list";
import { getAllDeals } from "../../api/index.js";
import OfferCard from "../../components/offers/offer-card/offer-card";

export default function CategoryPage() {
  const { state } = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deals, setDeals] = useState([]);

  const allDealsData = async () => {
    try {
      const categoryId = selectedCategory?._id || null;
      const response = await getAllDeals(categoryId);
      console.log({ response });
      setDeals(response.data.data);
      console.log({ state });
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ selectedCategory });
  useEffect(() => {
    if (state) {
      setSelectedCategory(state?.category);
    }
  }, []);

  useEffect(() => {
    allDealsData();
  }, [selectedCategory]);

  return (
    <div className="category-page">
      <div className="heading">
        <h1>{selectedCategory?.name || "Coupons"}</h1>
        <p>
          Home / <span>{selectedCategory?.name || "All"}</span>
        </p>
      </div>
      <section className="category-section">
        <div className="filter-container">
          <FilterList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="category-container">
          <div className="category-heading-container">
            <h4>{selectedCategory?.name || "All"} Coupons</h4>
            <p>showing {deals?.length || 0} results</p>
          </div>
          {deals?.length > 0 ? (
            <div className="category-cards-container">
              {deals.map((offer) => (
                <OfferCard key={offer?._id} offer={offer} />
              ))}
            </div>
          ) : (
            <p className="no-deals">
              We have no {selectedCategory?.name} coupons for now
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
