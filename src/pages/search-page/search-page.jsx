import styles from "./search-page.module.scss";
import Search from "../../components/search/search";
import { searchCoupons } from "../../api";
import { useSearch } from "../../context/search.context";
import { useEffect, useState, useDeferredValue } from "react";
import OfferCard from "../../components/offers/offer-card/offer-card";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();
  const search = useSearch();
  const searchTerm = useDeferredValue(search.searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  const [coupons, setCoupons] = useState([]);
  const [categories, setCategories] = useState([]);

  async function handleSearchCoupons() {
    if (!searchTerm) return;
    setIsSearching(true);
    setCategories([]);
    setCoupons([]);
    try {
      const response = await searchCoupons(searchTerm);
      if (response?.data?.status === "success") {
        setCoupons(response?.data?.deals);
        setCategories(response?.data?.categories);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSearching(false);
    }
  }
  useEffect(() => {
    handleSearchCoupons();
  }, [searchTerm]);

  return (
    <>
      {search?.searchTerm?.length === 0 ? (
        <p className={styles.notFound}>
          Type on the search box to search coupons / categories
        </p>
      ) : (
        <section className={styles["search-page"]}>
          <div className={styles.title}>
            <p>
              showing results for <span>{search?.searchTerm}</span>
            </p>
          </div>
          <h4 className={styles.containerTitle}>Coupons</h4>
          {coupons?.length > 0 ? (
            <section className={styles.dealsContainer}>
              {coupons?.map((coupon) => (
                <OfferCard offer={coupon} key={coupon?._id} />
              ))}
            </section>
          ) : (
            <p className={styles.notFound}>
              {isSearching ? "Searching..." : "No coupons found"}
            </p>
          )}

          <h4 className={styles.containerTitle}>Categories</h4>

          {categories?.length > 0 ? (
            <section className={styles.categoriesContainer}>
              {categories?.map((category) => (
                <div
                  className={styles.categoryCard}
                  onClick={() => {
                    navigate(`/category/${category?.name}`, {
                      state: { category },
                    });
                  }}
                >
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                      category?.icon
                    }`}
                    onError={(e) => {
                      e && (e.target.src = "/image-broke.png");
                    }}
                    alt="category"
                  />
                  <p>{category?.name}</p>
                </div>
              ))}
            </section>
          ) : (
            <p className={styles.notFound}>
              {isSearching ? "Searching..." : "No Categories found"}{" "}
            </p>
          )}
        </section>
      )}
    </>
  );
}

export default SearchPage;
