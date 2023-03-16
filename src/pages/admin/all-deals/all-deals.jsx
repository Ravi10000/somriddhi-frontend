import "./all-deals.styles.scss";

import React, { useState } from "react";
import TitleSection from "../title-section/title-section";
import FilterList from "../../../components/filter-list/filter-list";
import dealList from "./dealsList";
import AddDealPopup from "../../../components/add-deal-popup/add-deal-popup";

export default function AllDeals() {
  const [showAddDealPopup, setShowAddDealPopup] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  return (
    <>
      {showAddDealPopup && <AddDealPopup setShowPopup={setShowAddDealPopup} />}
      <div className="all-deals">
        <TitleSection
          title="all deals"
          addFunction={() => {
            setShowAddDealPopup(true);
          }}
        />
        <div className="main-content">
          {/* <div className="filter-container"> */}
          <div className="filter-container">
            <FilterList
              // category={"entertainment"}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="deals-container">
            {dealList?.map(({ desc, dealImg }, index) => (
              <div className="deal" key={index}>
                <img className="deal-img" src={dealImg} alt="deal banner" />
                <div className="deal-info">
                  <p>{desc}</p>
                  <div className="icons">
                    <img src="/edit.png" alt="edit deal" />
                    <img src="/delete.png" alt="delete deal" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
