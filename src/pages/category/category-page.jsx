import "./category-page.style.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import entertainmentCoupons from "./entertainment-coupons";
import DealCard from "../../components/deals/deal-card/deal-card";
import FilterList from "../../components/filter-list/filter-list";
import { getAllDeals } from "../../api";

export default function CategoryPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { category } = useParams();
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

  console.log({ selectedCategories });
  useEffect(() => {
    setSelectedCategories([category]);
  }, []);

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
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="category-container">
          <div className="category-heading-container">
            <h4>Coupons</h4>
            <p>showing 1 -20 results</p>
          </div>
          <div className="category-cards-container">
            {deals.map(({ _id, name, cashbackPercent, image }) => (
              <DealCard

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
