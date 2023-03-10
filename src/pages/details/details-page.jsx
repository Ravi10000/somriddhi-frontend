import "./details.styles.scss";
import React from "react";
import entertainmentCoupons from "./entertainment-coupons";
import DealCard from "../../components/deals/deal-card/deal-card";
import FilterList from "../../components/filter-list/filter-list";

export default function DetailsPage() {
  return (
    <div className="details-page">
      <div className="heading">
        <h1>Entertainment</h1>
        <p>
          Home / <span>Entertainment</span>
        </p>
      </div>
      <section className="details-section">
        <div className="filter-container">
          <FilterList />
        </div>
        <div className="details-container">
          <div className="details-heading-container">
            <h4>Entertainment Coupons</h4>
            <p>showing 1 -20 results</p>
          </div>
          <div className="details-cards-container">
            {entertainmentCoupons.map(({ imgUrl, title, details }, index) => (
              <DealCard
                key={index}
                customStyles={{ background: "#F8F8F8", border: "none" }}
                imgUrl={imgUrl}
                title={title}
                details={details}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
