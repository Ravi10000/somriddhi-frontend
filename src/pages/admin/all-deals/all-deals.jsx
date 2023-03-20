import "./all-deals.styles.scss";

import React, { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import FilterList from "../../../components/filter-list/filter-list";
import dealList from "./dealsList";
import AddDealPopup from "../../../components/add-deal-popup/add-deal-popup";
import { getAllDeals } from "../../../api/index";

export default function AllDeals() {
  const [deals, setDeals] = useState([]);
  const [showAddDealPopup, setShowAddDealPopup] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  async function fetchDeals() {
    const response = await getAllDeals();
    setDeals(response.data.data);
    console.log({ response });
  }
  useEffect(() => {
    fetchDeals();
  }, []);
  return (
    <>
      {showAddDealPopup && <AddDealPopup setShowPopup={setShowAddDealPopup} fetchDeals={fetchDeals}/>}
      <div className="all-deals">
        <TitleSection
          title="all deals"
          addFunction={() => {
            setShowAddDealPopup(true);
          }}
        />
        <div className="main-content">
          <div className="filter-container">
            <FilterList
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="deals-container">
            {deals.reverse()?.map(({ description, image }, index) => (
              <div className="deal" key={index}>
                <img
                  className="deal-img"
                  src={`http://localhost:8001/${image}`}
                  alt="deal banner"
                />
                <div className="deal-info">
                  <p>{description ? description : "unavailable"}</p>
                  <div className="icons">
                    <img src="/edit.png" alt="edit deal" />
                    <img src="/delete.png" alt="delete deal" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
