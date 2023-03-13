import "./category.styles.scss";
import React from "react";
import entertainmentCoupons from "./entertainment-coupons";
import DealCard from "../../components/deals/deal-card/deal-card";
import FilterList from "../../components/filter-list/filter-list";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();
  console.log({ category });

  // const history = useHistory();
  console.log(history);
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
          <FilterList category={category} />
        </div>
        <div className="category-container">
          <div className="category-heading-container">
            <h4>Entertainment Coupons</h4>
            <p>showing 1 -20 results</p>
          </div>
          <div className="category-cards-container">
            {entertainmentCoupons.map(({ imgUrl, title, details, id }) => (
              <DealCard
                key={id}
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
