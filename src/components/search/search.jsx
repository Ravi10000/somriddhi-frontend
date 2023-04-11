import styles from "./search.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
// import { useSearch } from "../../context/search.context";
import { useEffect, useDeferredValue, useState } from "react";
import { searchCoupons, sendCouponAnalytics } from "../../api";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const navigate = useNavigate();

  const deferredSearchTerm = useDeferredValue(searchTerm);

  async function handleSearchCoupons() {
    setIsSearching(true);
    setIsResultsVisible(false);
    setCategories([]);
    setCoupons([]);
    if (!deferredSearchTerm) return;
    try {
      const response = await searchCoupons(deferredSearchTerm);
      if (response?.data?.status === "success") {
        console.log({ response });
        setIsResultsVisible(true);
        setCoupons(response?.data?.deals);
        setCategories(response?.data?.categories);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSearching(false);
    }
  }

  async function closeSearch() {
    setIsResultsVisible(false);
    setSearchTerm("");
  }

  async function sendAnalytics(id) {
    if (!id) return;
    const formData = new FormData();
    formData.append("couponId", id);
    formData.append("deviceType", "Web");
    formData.append("couponType", "Coupon");
    formData.append("startDateTime", new Date(Date.now()).toString());

    for (let entry of formData.entries()) {
      console.log(entry);
    }
    try {
      const response = await sendCouponAnalytics(formData);

      console.log({ response });
      if (response.data.status === "success") {
        const analyticId = response.data.analyticId;
        navigate(`/coupon/${analyticId}`, {
          state: { couponId: id, couponType: "Coupon" },
        });
      }
      console.log({ response });
    } catch (error) {
      console.log(error);
    } finally {
      closeSearch();
    }
  }

  useEffect(() => {
    handleSearchCoupons();
  }, [deferredSearchTerm]);

  return (
    <div className={styles["search"]}>
      <div
        className={`${styles.searchResults} ${
          isResultsVisible ? styles.show : ""
        }`}
      >
        <div className={styles.head} onClick={closeSearch}>
          <img src="/close.png" alt="" />
        </div>
        {isSearching ? (
          <p className={styles.message}>searching...</p>
        ) : (
          <>
            {coupons?.length < 1 ? (
              <p className={styles.message}>no coupons found</p>
            ) : (
              <div className={styles.couponsContainer}>
                {coupons?.map((coupon) => {
                  return (
                    <div
                      key={coupon?._id}
                      className={styles.coupon + " " + styles.card}
                      onClick={() => sendAnalytics(coupon?._id)}
                    >
                      <p>{coupon?.name}</p>
                      <p className={styles.percent}>
                        {coupon?.cashbackPercent} % off
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
            {categories?.length > 0 && (
              <div className={styles.categoriesContainer}>
                {categories?.map((category) => {
                  return (
                    <div
                      key={category?._id}
                      className={styles.category + " " + styles.card}
                      onClick={() => {
                        closeSearch();
                        navigate(`/category/${category?.name}`, {
                          state: { category },
                        });
                      }}
                    >
                      <p>{category?.name}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <img src="/search.png" alt="search" />
      <input
        type="search"
        placeholder="Search For brand, category, coupon"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
}
