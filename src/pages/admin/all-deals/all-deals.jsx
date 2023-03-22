import "./all-deals.styles.scss";

import React, { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import FilterList from "../../../components/filter-list/filter-list";
import dealList from "./dealsList";
import AddDealPopup from "../../../components/add-deal-popup/add-deal-popup";
import { getAllDeals, deleteDeal } from "../../../api/index";

export default function AllDeals() {
  const [deals, setDeals] = useState([]);
  const [showAddDealPopup, setShowAddDealPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dealToUpdate, setDealToUpdate] = useState(null);

  async function fetchDeals() {
    try {
      const formData = new FormData();
      if (selectedCategory) formData.append("categoryId", selectedCategory._id);
      const response = await getAllDeals(formData);
      console.log({ response });
      setDeals(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDeals();
  }, [selectedCategory]);

  async function deleteDealHandler(_id) {
    try {
      const response = await deleteDeal(_id);
      console.log(response);
      fetchDeals();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {showAddDealPopup && (
        <AddDealPopup
          dealToUpdate={dealToUpdate}
          setShowPopup={setShowAddDealPopup}
          fetchDeals={fetchDeals}
        />
      )}
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
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="deals-container">
            {deals.reverse()?.map((dealItem, index) => (
              <div className="deal" key={index}>
                <img
                  className="deal-img"
                  src={`http://localhost:8001/${dealItem.image}`}
                  alt="deal banner"
                />
                <div className="deal-info">
                  <p>
                    {dealItem.description
                      ? dealItem.description
                      : "unavailable"}
                  </p>
                  <div className="icons">
                    <img
                      src="/edit.png"
                      alt="edit deal"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setDealToUpdate(dealItem);
                        setShowAddDealPopup(true);
                      }}
                    />
                    <img
                      src="/delete.png"
                      alt="delete deal"
                      onClick={() => {
                        deleteDealHandler(dealItem._id);
                      }}
                    />
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
