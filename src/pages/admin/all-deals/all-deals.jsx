import styles from "./all-deals.module.scss";

// react hooks
import { useState, useEffect } from "react";

// packages
import { connect } from "react-redux";

// components
import TitleSection from "../title-section/title-section";
import FilterList from "../../../components/filter-list/filter-list";
import AddDealPopup from "../../../components/add-deal-popup/add-deal-popup";
import DealCard from "./deal-card/deal-card";

// api calls
import { getAllDeals, deleteDeal } from "../../../api/index";

// redux actions
import { setFlash } from "../../../redux/flash/flash.actions";

function AllDeals({ setFlash }) {
  const [deals, setDeals] = useState([]);
  const [showAddDealPopup, setShowAddDealPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dealToUpdate, setDealToUpdate] = useState(null);

  async function fetchDeals() {
    try {
      const categoryId = selectedCategory?._id || null;
      const response = await getAllDeals(categoryId);
      console.log({ response });
      setDeals(response.data.data);
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
      response.data.status === "success" &&
        setFlash({ message: "Deal deleted successfully", type: "success" });

      await fetchDeals();
      setIsDeleting(false);
    } catch (error) {
      setFlash({
        message: "Something went wrong, please try again",
        type: "error",
      });
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
          {deals?.length ? (
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
          ) : (
            <p className={styles["no-deals"]}>
              We have no {selectedCategory?.name} coupons for now!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(AllDeals);
