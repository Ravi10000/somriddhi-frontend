import styles from "./category-page.styles.module.scss";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// components
import FilterList from "../../components/filter-list/filter-list";
import { getAllDeals } from "../../api/index.js";
import OfferCard from "../../components/offers/offer-card/offer-card";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

function CategoryPage({ currentUser }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [analyticId, setAnalyticId] = useState(null);

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

  // console.log({ selectedCategory });
  async function sendAnalytics() {
    // console.log({ selectedCategory });
    if (selectedCategory) {
      const formData = new FormData();
      formData.append("categoryId", selectedCategory?._id);
      // currentUser && formData.append("userId", currentUser?._id);
      formData.append("deviceType", "Web");
      formData.append("clickedOn", new Date(Date.now()).toString());

      console.log(localStorage.getItem("token"));
      try {
        // const { data } = await axios.get("https://api64.ipify.org?format=json");
        // formData.append("ipAddress", data.ip);

        for (let entry of formData.entries()) {
          console.log(entry);
        }

        const response = await axios.post("/analytic/category", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        console.log({ response });
        if (response.data.status === "success") {
          setAnalyticId(response.data.analyticId);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updateVisitedOn(id) {
    // console.log({ analyticId });
    if (analyticId) {
      try {
        const response = await axios.patch(
          `/analytic/category`,
          {
            analyticId,
            visitedOn: new Date(Date.now()).toString(),
          },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    }
    navigate(`/coupon/${id}`);
  }

  useEffect(() => {
    if (state) {
      setSelectedCategory(state?.category);
    }
  }, []);

  useEffect(() => {
    sendAnalytics();
    allDealsData();
  }, [selectedCategory]);

  return (
    <div className={styles["category-page"]}>
      <div className={styles["heading"]}>
        <h1>{selectedCategory?.name || "Coupons"}</h1>
        <p>
          Home / <span>{selectedCategory?.name || "All"}</span>
        </p>
      </div>
      <section className={styles["category-section"]}>
        <div className={styles["filter-container"]}>
          <FilterList
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className={styles["category-container"]}>
          <div className={styles["category-heading-container"]}>
            <h4>{selectedCategory?.name || "All"} Coupons</h4>
            <p>showing {deals?.length || 0} results</p>
          </div>
          {deals?.length > 0 ? (
            <div className={styles["category-cards-container"]}>
              {deals.map((offer) => (
                <div
                  key={offer?._id}
                  onClick={() => {
                    updateVisitedOn(offer._id);
                  }}
                >
                  <OfferCard offer={offer} noVisit />
                </div>
              ))}
            </div>
          ) : (
            <p className={["no-deals"]}>
              We have no {selectedCategory?.name} coupons for now
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CategoryPage);
