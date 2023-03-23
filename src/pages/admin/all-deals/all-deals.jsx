import styles from "./all-deals.module.scss";

import React, { useState, useEffect } from "react";
import TitleSection from "../title-section/title-section";
import FilterList from "../../../components/filter-list/filter-list";
import dealList from "./dealsList";
import AddDealPopup from "../../../components/add-deal-popup/add-deal-popup";
import { getAllDeals, deleteDeal } from "../../../api/index";
import DealCard from "./deal-card/deal-card";

export default function AllDeals() {
  const [deals, setDeals] = useState([]);
  const [showAddDealPopup, setShowAddDealPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dealToUpdate, setDealToUpdate] = useState(null);

  async function fetchDeals() {
    try {
      // const formData = new FormData();
      // if (selectedCategory) formData.append("categoryId", selectedCategory._id);
      const categoryId = selectedCategory?._id || null;
      const response = await getAllDeals(categoryId);
      console.log({ response });
      setDeals(response.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    return () => {
      setDeals([]);
      setDealToUpdate(null);
    };
  }, []);
  useEffect(() => {
    fetchDeals();
  }, [selectedCategory]);

  async function deleteDealHandler(id, setIsDeleting) {
    setIsDeleting(true);
    try {
      const response = await deleteDeal(id);
      console.log(response);
      await fetchDeals();
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {showAddDealPopup && (
        <AddDealPopup
          setDealToUpdate={setDealToUpdate}
          dealToUpdate={dealToUpdate}
          setShowPopup={setShowAddDealPopup}
          fetchDeals={fetchDeals}
        />
      )}
      <div className={styles["all-deals"]}>
        <TitleSection
          title={`${selectedCategory ? selectedCategory?.name : "All"} Deals`}
          addFunction={() => {
            setShowAddDealPopup(true);
          }}
        />
        <div className={styles["main-content"]}>
          <div className={styles["filter-container"]}>
            <FilterList
              showAll
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className={styles["deals-container"]}>
            {deals?.map((deal) => (
              <DealCard
                key={deal?._id}
                deal={deal}
                deleteDealHandler={deleteDealHandler}
                setDealToUpdate={setDealToUpdate}
                setShowAddDealPopup={setShowAddDealPopup}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
